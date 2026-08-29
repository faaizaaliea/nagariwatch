function buildCorsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env?.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

const SYSTEM_INSTRUCTION = `You are the situation-summary layer of Nagari Watch.

Your job is to summarize provided environmental monitoring data
and community observations into clear, concise situational information.

IMPORTANT RULES:
1. Never determine or modify the risk level.
2. Never invent measurements, events, locations, or reports.
3. Use only the supplied data.
4. Distinguish environmental measurements from community-reported observations.
5. Do not claim that a flood, fire, or other emergency is occurring unless
   the supplied data explicitly supports that statement.
6. Do not provide medical or emergency-response instructions.
7. Do not replace official emergency authorities.
8. If information is insufficient, explicitly state that.
9. The request will specify a "language" field: "id" (Bahasa Indonesia) or
   "en" (English). Write the "title", "summary", "observations", and
   "limitations" VALUES entirely in that language. The JSON keys themselves
   always stay in English exactly as specified below.

Respond with ONLY a JSON object matching this exact shape, nothing else:
{
  "title": string,
  "summary": string,
  "observations": string[],
  "limitations": string
}`;

const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    title: { type: "STRING" },
    summary: { type: "STRING" },
    observations: { type: "ARRAY", items: { type: "STRING" } },
    limitations: { type: "STRING" },
  },
  required: ["title", "summary", "observations", "limitations"],
};

const GEMINI_MODEL = "gemini-3.6-flash";

function formatReportLine(report, index) {
  const n = index + 1;
  if (typeof report === "string") {
    return `${n}. "${report}"`;
  }
  const tags = [report?.category, report?.timestamp]
    .filter(Boolean)
    .map((t) => `[${t}]`)
    .join(" ");
  const description = report?.description ?? "";
  return `${n}. ${tags ? `${tags} ` : ""}"${description}"`;
}

function buildUserContent(payload) {
  const languageLabel =
    payload.language === "id" ? "Bahasa Indonesia" : "English";

  return `Village: ${payload.village}

Risk level determined by Nagari Watch (rule-based, not set by you):
${payload.riskLevel}

Response language: ${payload.language ?? "en"} (${languageLabel})

Environmental indicators:
- Rainfall: ${payload.environmentalIndicators.rainfall.value} ${payload.environmentalIndicators.rainfall.unit}
- Rainfall threshold exceeded: ${payload.environmentalIndicators.rainfall.thresholdExceeded ? "yes" : "no"}
- River distance: ${payload.environmentalIndicators.riverProximity.distance} ${payload.environmentalIndicators.riverProximity.unit}
- River proximity threshold exceeded: ${payload.environmentalIndicators.riverProximity.thresholdExceeded ? "yes" : "no"}
- Elevation: ${payload.environmentalIndicators.elevation.value} ${payload.environmentalIndicators.elevation.unit}
- Elevation threshold exceeded: ${payload.environmentalIndicators.elevation.thresholdExceeded ? "yes" : "no"}
- FIRMS hotspots (${payload.environmentalIndicators.firmsHotspot.windowDays}-day window): ${payload.environmentalIndicators.firmsHotspot.count}
- Hotspot threshold exceeded: ${payload.environmentalIndicators.firmsHotspot.thresholdExceeded ? "yes" : "no"}

Community reports (${payload.communityReports.count} total, each tagged [category] [reported at] where available):
${
  payload.communityReports.recentReports.length > 0
    ? payload.communityReports.recentReports.map(formatReportLine).join("\n")
    : "(none submitted)"
}

Generate a concise situation summary.`;
}

function isPlainObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

function validatePayload(payload) {
  if (!isPlainObject(payload)) return "Body must be a JSON object.";
  if (typeof payload.village !== "string" || !payload.village.trim())
    return "village is required.";
  if (typeof payload.riskLevel !== "string") return "riskLevel is required.";
  const ei = payload.environmentalIndicators;
  if (
    !isPlainObject(ei) ||
    !isPlainObject(ei.rainfall) ||
    !isPlainObject(ei.riverProximity) ||
    !isPlainObject(ei.elevation) ||
    !isPlainObject(ei.firmsHotspot)
  ) {
    return "environmentalIndicators is missing required fields.";
  }
  const cr = payload.communityReports;
  if (!isPlainObject(cr) || !Array.isArray(cr.recentReports)) {
    return "communityReports is missing required fields.";
  }
  return null;
}

async function callGemini(payload, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const body = {
    systemInstruction: {
      role: "system",
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: buildUserContent(payload) }],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0.2,
    },
  };

  const upstream = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await upstream.text();
  if (!upstream.ok) {
    throw new Error(`Gemini API error ${upstream.status}: ${text}`);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Gemini API returned non-JSON response.");
  }

  const modelText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!modelText) {
    throw new Error("Gemini API response had no text content.");
  }

  let structured;
  try {
    structured = JSON.parse(modelText);
  } catch {
    throw new Error("Gemini did not return valid structured JSON.");
  }

  return structured;
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
};
