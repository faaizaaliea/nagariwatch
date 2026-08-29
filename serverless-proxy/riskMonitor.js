import {
  getRiskLevel,
  getAlertReasons,
  RISK_LEVELS,
} from "../src/utils/riskLogic.js";
import { computeRiverDistances } from "../src/utils/riverDistance.js";
import { fetchRainfallAndElevation } from "../src/utils/openMeteo.js";
import { fetchRiverLines } from "../src/utils/overpass.js";
import {
  FIRMS_SOURCE,
  FIRMS_DAY_RANGE,
  FIRMS_BBOX,
  HOTSPOT_MATCH_RADIUS_M,
} from "../src/config/firmsConfig.js";
import desaSeed from "../src/data/desaKetambe.json";
import userProfile from "../src/data/userProfile.js";

function toRad(deg) {
  return (deg * Math.PI) / 180;
}
function distanceMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function fetchFirmsHotspotsDirect(mapKey) {
  const { west, south, east, north } = FIRMS_BBOX;
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${mapKey}/${FIRMS_SOURCE}/${west},${south},${east},${north}/${FIRMS_DAY_RANGE}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`FIRMS merespons status ${res.status}`);
  const text = await res.text();
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  const latIdx = headers.indexOf("latitude");
  const lngIdx = headers.indexOf("longitude");
  if (latIdx === -1 || lngIdx === -1) return [];
  return lines
    .slice(1)
    .filter(Boolean)
    .map((line) => {
      const cols = line.split(",");
      return { lat: parseFloat(cols[latIdx]), lng: parseFloat(cols[lngIdx]) };
    })
    .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng));
}

function mergeHotspotsIntoDesa(desaList, hotspotPoints) {
  return desaList.map((desa) => {
    const count = hotspotPoints.filter(
      (p) =>
        distanceMeters(desa.lat, desa.lng, p.lat, p.lng) <=
        HOTSPOT_MATCH_RADIUS_M,
    ).length;
    return { ...desa, titik_panas_5hari: count };
  });
}

export async function buildLiveDesaList(env) {
  let desaList = desaSeed.desa;

  const [weatherResults, riverLines] = await Promise.all([
    fetchRainfallAndElevation(desaList),
    fetchRiverLines(),
  ]);

  const weatherById = new Map(weatherResults.map((r) => [r.id, r]));
  desaList = desaList.map((desa) => {
    const w = weatherById.get(desa.id);
    return w
      ? {
          ...desa,
          curah_hujan_mm: w.rainfallMm ?? desa.curah_hujan_mm,
          elevasi_mdpl: w.elevation ?? desa.elevasi_mdpl,
        }
      : desa;
  });

  const riverResults = computeRiverDistances(desaList, riverLines);
  const riverById = new Map(riverResults.map((r) => [r.id, r.distanceM]));
  desaList = desaList.map((desa) => {
    const d = riverById.get(desa.id);
    return d != null ? { ...desa, jarak_sungai_m: Math.round(d) } : desa;
  });

  if (env.FIRMS_MAP_KEY) {
    try {
      const points = await fetchFirmsHotspotsDirect(env.FIRMS_MAP_KEY);
      desaList = mergeHotspotsIntoDesa(desaList, points);
    } catch (err) {
      console.warn(
        "[risk-monitor] FIRMS fetch failed, using 0 hotspots:",
        err.message,
      );
      desaList = desaList.map((d) => ({ ...d, titik_panas_5hari: 0 }));
    }
  } else {
    desaList = desaList.map((d) => ({ ...d, titik_panas_5hari: 0 }));
  }

  return desaList;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildAlertEmail({
  desa,
  level,
  reasons,
  appUrl,
  homeDesa,
  radiusKm,
}) {
  const reasonItems = reasons
    .map(
      (r) =>
        `<li><strong>${escapeHtml(r.label)}</strong> ${escapeHtml(r.detail)}</li>`,
    )
    .join("");

  const subject = `[Nagari Watch] Risiko ${level} di ${desa.nama}`;
  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #1c2a27;">
      <h2 style="color: #1c5a4e;">⚠️ Risiko ${escapeHtml(level)} ${escapeHtml(desa.nama)}</h2>
      <p>Sistem Nagari Watch mendeteksi kenaikan risiko banjir/lingkungan di desa <strong>${escapeHtml(desa.nama)}</strong> (dalam radius ${escapeHtml(String(radiusKm))} km dari ${escapeHtml(homeDesa)}) berdasarkan data terkini:</p>
      <ul>${reasonItems}</ul>
      <p>Silakan pantau kondisi sekitar dan ikuti arahan resmi dari perangkat desa/BPBD setempat. Notifikasi ini otomatis berdasarkan ambang batas indikator.</p>
      <p><a href="${appUrl}" style="color: #1c5a4e;">Buka Nagari Watch →</a></p>
    </div>
  `.trim();

  return { subject, html };
}

export async function sendEmail(env, { to, subject, html }) {
  const from = env.ALERT_FROM_EMAIL || "onboarding@resend.dev";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend API error ${res.status}: ${text}`);
  }
}

export { RISK_LEVELS, getRiskLevel, getAlertReasons, userProfile };

export function findNearbyDesa(desaList) {
  const home = desaList.find((d) => d.nama === userProfile.homeDesa);
  if (!home) {
    console.warn(
      `[risk-monitor] homeDesa "${userProfile.homeDesa}" not found in desa list.`,
    );
    return [];
  }
  const radiusM = userProfile.radiusKm * 1000;
  return desaList.filter(
    (d) => distanceMeters(home.lat, home.lng, d.lat, d.lng) <= radiusM,
  );
}
