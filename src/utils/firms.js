import {
  FIRMS_SOURCE,
  FIRMS_DAY_RANGE,
  FIRMS_BBOX,
  FIRMS_PROXY_ENDPOINT,
} from "../config/firmsConfig";

function buildAreaUrl(mapKey) {
  const { west, south, east, north } = FIRMS_BBOX;
  const coords = `${west},${south},${east},${north}`;
  return `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${mapKey}/${FIRMS_SOURCE}/${coords}/${FIRMS_DAY_RANGE}`;
}

const CORS_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

const FETCH_TIMEOUT_MS = 12000;

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function parseFirmsCsv(csvText) {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim());
  const latIdx = headers.indexOf("latitude");
  const lngIdx = headers.indexOf("longitude");
  const dateIdx = headers.indexOf("acq_date");
  const timeIdx = headers.indexOf("acq_time");
  const confIdx = headers.indexOf("confidence");
  const frpIdx = headers.indexOf("frp");

  if (latIdx === -1 || lngIdx === -1) {
    throw new Error(csvText.slice(0, 200) || "Format CSV FIRMS tidak dikenali");
  }

  return lines
    .slice(1)
    .filter(Boolean)
    .map((line) => {
      const cols = line.split(",");
      return {
        lat: parseFloat(cols[latIdx]),
        lng: parseFloat(cols[lngIdx]),
        acqDate: dateIdx !== -1 ? cols[dateIdx] : null,
        acqTime: timeIdx !== -1 ? cols[timeIdx] : null,
        confidence: confIdx !== -1 ? cols[confIdx] : null,
        frp: frpIdx !== -1 ? parseFloat(cols[frpIdx]) : null,
      };
    })
    .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng));
}

export async function fetchFirmsHotspots(mapKey) {
  if (!mapKey) {
    throw new Error(
      "MAP_KEY kosong, daftar dulu di firms.modaps.eosdis.nasa.gov/api/map_key/",
    );
  }

  const directUrl = buildAreaUrl(mapKey);

  try {
    const res = await fetchWithTimeout(directUrl);
    if (!res.ok) throw new Error(`FIRMS merespons status ${res.status}`);
    const text = await res.text();
    return { points: parseFirmsCsv(text), source: "firms-direct" };
  } catch (directErr) {
    console.warn(
      "[FIRMS] Fetch langsung gagal, mencoba lewat proxy CORS:",
      directErr.message,
    );
  }

  if (FIRMS_PROXY_ENDPOINT) {
    try {
      const url = `${FIRMS_PROXY_ENDPOINT}?url=${encodeURIComponent(directUrl)}`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) throw new Error(`status ${res.status}`);
      const text = await res.text();
      return { points: parseFirmsCsv(text), source: "firms-own-proxy" };
    } catch (ownProxyErr) {
      console.warn(
        "[FIRMS] Proxy sendiri gagal, lanjut coba proxy publik:",
        ownProxyErr.message,
      );
    }
  }

  const proxyErrors = [];
  for (const buildProxyUrl of CORS_PROXIES) {
    try {
      const res = await fetchWithTimeout(buildProxyUrl(directUrl));
      if (!res.ok) throw new Error(`status ${res.status}`);
      const text = await res.text();
      const points = parseFirmsCsv(text);
      return { points, source: "firms-proxy" };
    } catch (proxyErr) {
      const reason =
        proxyErr.name === "AbortError" ? "timeout" : proxyErr.message;
      proxyErrors.push(reason);
    }
  }

  throw new Error(
    `Gagal mengambil data FIRMS lewat semua jalur (langsung & ${CORS_PROXIES.length} proxy). ` +
      `Detail: ${proxyErrors.join("; ")}. Coba  beberapa saat lagi, atau cek MAP_KEY-nya.`,
  );
}
