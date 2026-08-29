import { validatePayload, callGemini } from "./situationSummaryPrompt.js";
import {
  RISK_LEVELS,
  getRiskLevel,
  getAlertReasons,
  buildLiveDesaList,
  buildAlertEmail,
  sendEmail,
  findNearbyDesa,
  userProfile,
} from "./riskMonitor.js";

function buildCorsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env?.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

async function handleFirmsProxy(request, env) {
  const incomingUrl = new URL(request.url);
  const targetUrl = incomingUrl.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Parameter ?url= wajib diisi", { status: 400 });
  }

  if (!targetUrl.startsWith("https://firms.modaps.eosdis.nasa.gov/")) {
    return new Response("Hanya boleh proxy ke firms.modaps.eosdis.nasa.gov", {
      status: 403,
    });
  }

  try {
    const upstream = await fetch(targetUrl);
    const body = await upstream.text();

    return new Response(body, {
      status: upstream.status,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Access-Control-Allow-Origin": env?.ALLOWED_ORIGIN || "*",
      },
    });
  } catch (err) {
    return new Response(`Gagal fetch FIRMS: ${err.message}`, { status: 502 });
  }
}

async function handleSituationSummary(request, env) {
  const CORS_HEADERS = buildCorsHeaders(env);

  if (request.method !== "POST") {
    return new Response("Method not allowed, use POST.", {
      status: 405,
      headers: CORS_HEADERS,
    });
  }

  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "GEMINI_API_KEY is not configured on the worker.",
      }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      },
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return new Response(JSON.stringify({ error: validationError }), {
      status: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  try {
    const summary = await callGemini(payload, apiKey);
    return new Response(JSON.stringify(summary), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Gagal memanggil Gemini: ${err.message}` }),
      {
        status: 502,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      },
    );
  }
}

async function runRiskMonitor(env) {
  if (!env.DB) {
    console.warn("[risk-monitor] D1 not configured, skipping run.");
    return;
  }
  if (!env.RESIDENT_EMAIL) {
    console.warn("[risk-monitor] RESIDENT_EMAIL not set, skipping run.");
    return;
  }

  const desaList = await buildLiveDesaList(env);
  const nearby = findNearbyDesa(desaList);
  const nearbyNames = new Set(nearby.map((d) => d.nama));
  const now = new Date().toISOString();

  for (const desa of desaList) {
    const level = getRiskLevel(desa);

    const prior = await env.DB.prepare(
      "SELECT last_level FROM village_risk_state WHERE desa = ?",
    )
      .bind(desa.nama)
      .first();
    const priorLevel = prior?.last_level ?? null;
    const isNewTinggi =
      level === RISK_LEVELS.TINGGI && priorLevel !== RISK_LEVELS.TINGGI;

    if (isNewTinggi && nearbyNames.has(desa.nama)) {
      try {
        const reasons = getAlertReasons(desa);
        const { subject, html } = buildAlertEmail({
          desa,
          level,
          reasons,
          appUrl: env.APP_URL || "",
          radiusKm: userProfile.radiusKm,
          homeDesa: userProfile.homeDesa,
        });
        await sendEmail(env, { to: env.RESIDENT_EMAIL, subject, html });
      } catch (err) {
        console.error(
          `[risk-monitor] Gagal kirim notifikasi ${desa.nama}:`,
          err.message,
        );
      }
    }

    if (isNewTinggi) {
      await env.DB.prepare(
        `INSERT INTO village_risk_state (desa, last_level, last_checked_at, last_notified_at)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(desa) DO UPDATE SET last_level = ?, last_checked_at = ?, last_notified_at = ?`,
      )
        .bind(desa.nama, level, now, now, level, now, now)
        .run();
    } else {
      await env.DB.prepare(
        `INSERT INTO village_risk_state (desa, last_level, last_checked_at, last_notified_at)
         VALUES (?, ?, ?, NULL)
         ON CONFLICT(desa) DO UPDATE SET last_level = ?, last_checked_at = ?`,
      )
        .bind(desa.nama, level, now, level, now)
        .run();
    }
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: buildCorsHeaders(env),
      });
    }

    if (url.pathname === "/situation-summary") {
      return handleSituationSummary(request, env);
    }

    return handleFirmsProxy(request, env);
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(runRiskMonitor(env));
  },
};
