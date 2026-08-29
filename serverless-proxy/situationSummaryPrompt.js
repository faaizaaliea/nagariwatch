// Shared between vercel-api-situation-summary.js and the /situation-summary
// route in cloudflare-worker.js, so the two deployment targets never drift
// out of sync on the one thing that actually matters here: what the model is
// and isn't allowed to do.

export const SYSTEM_INSTRUCTION = `You are the situation-summary layer of Nagari Watch.

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

// responseSchema for Gemini's structured-output mode.
export const RESPONSE_SCHEMA = {
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

// A community report can be a plain string (legacy shape) or an object with
// { category, timestamp, description } metadata. Handle both so an older
// frontend build talking to a newer proxy doesn't break.
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

export function buildUserContent(payload) {
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

// Minimal shape validation on the untrusted request body before it's ever
// interpolated into a prompt.
export function validatePayload(payload) {
  if (!isPlainObject(payload)) return "Body must be a JSON object.";
  if (typeof payload.village !== "string" || !payload.village.trim())
    return "village is required.";
  if (typeof payload.riskLevel !== "string")
    return "riskLevel is required.";
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

/**
 * Calls the Gemini API directly over REST (no SDK dependency needed for a
 * serverless function) and returns the parsed structured-output object.
 * Throws on any failure; callers are expected to map that to a 502.
 */
export async function callGemini(payload, apiKey) {
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
