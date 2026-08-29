import { RISK_LEVELS, summarizeRisk } from "./riskLogic";

export const ACTION_GUIDE_KEY = {
  [RISK_LEVELS.TINGGI]: "tinggi",
  [RISK_LEVELS.SEDANG]: "sedang",
  [RISK_LEVELS.RENDAH]: "rendah",
};

export function getOverallRiskLevel(desaList = []) {
  const summary = summarizeRisk(desaList);
  if (summary.Tinggi > 0) return RISK_LEVELS.TINGGI;
  if (summary.Sedang > 0) return RISK_LEVELS.SEDANG;
  return RISK_LEVELS.RENDAH;
}
