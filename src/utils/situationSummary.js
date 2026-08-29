import { RISK_LEVELS, RISK_THRESHOLDS, HOTSPOT_THRESHOLDS } from "./riskLogic";
import { REPORT_CATEGORY_LABEL_EN } from "./reportLogic";

const LEVEL_TO_EN = {
  [RISK_LEVELS.TINGGI]: "HIGH",
  [RISK_LEVELS.SEDANG]: "MEDIUM",
  [RISK_LEVELS.RENDAH]: "LOW",
};

const MAX_REPORTS_SENT = 6;

export function buildSituationSummaryPayload(
  desa,
  reports,
  level,
  language = "en",
) {
  const villageReports = (reports ?? [])
    .filter((r) => r.location === desa.nama)
    .slice(0, MAX_REPORTS_SENT);

  return {
    village: desa.nama,
    riskLevel: LEVEL_TO_EN[level] ?? "UNKNOWN",
    language,
    environmentalIndicators: {
      rainfall: {
        value: desa.curah_hujan_mm,
        unit: "mm/day",
        thresholdExceeded: desa.curah_hujan_mm > RISK_THRESHOLDS.hujanSedang,
      },
      riverProximity: {
        distance: desa.jarak_sungai_m,
        unit: "m",
        thresholdExceeded: desa.jarak_sungai_m < RISK_THRESHOLDS.sungaiSedang,
      },
      elevation: {
        value: desa.elevasi_mdpl,
        unit: "masl",
        thresholdExceeded: desa.elevasi_mdpl < RISK_THRESHOLDS.elevasiSedang,
      },
      firmsHotspot: {
        count: desa.titik_panas_5hari ?? 0,
        windowDays: 5,
        thresholdExceeded:
          (desa.titik_panas_5hari ?? 0) >= HOTSPOT_THRESHOLDS.sedang,
      },
    },
    communityReports: {
      count: villageReports.length,
      recentReports: villageReports.map((r) => ({
        category: REPORT_CATEGORY_LABEL_EN[r.category] ?? r.category ?? "Other",
        timestamp: r.timestamp ?? "",
        description: r.description,
      })),
    },
  };
}

export class SituationSummaryError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "SituationSummaryError";
    this.code = code;
  }
}

function isValidSummary(data) {
  return (
    data &&
    typeof data.title === "string" &&
    typeof data.summary === "string" &&
    Array.isArray(data.observations) &&
    data.observations.every((o) => typeof o === "string") &&
    typeof data.limitations === "string"
  );
}

export async function fetchSituationSummary(payload, endpoint) {
  if (!endpoint) {
    throw new SituationSummaryError(
      "Situation-summary endpoint is not configured.",
      "not_configured",
    );
  }

  let res;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    throw new SituationSummaryError(
      `Could not reach the situation-summary service: ${err.message}`,
      "network",
    );
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new SituationSummaryError(
      `Situation-summary service returned ${res.status}${
        text ? `: ${text}` : ""
      }`,
      "network",
    );
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new SituationSummaryError(
      "Situation-summary service returned an invalid response.",
      "bad_response",
    );
  }

  if (!isValidSummary(data)) {
    throw new SituationSummaryError(
      "Situation-summary service returned an unexpected shape.",
      "bad_response",
    );
  }

  return data;
}
