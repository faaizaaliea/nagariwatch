export const REPORT_CATEGORIES = [
  "flood",
  "fire",
  "landslide",
  "landClearing",
  "roadCut",
  "other",
];

export const REPORT_STATUS = {
  PENDING: "pending",
  VERIFIED: "verified",
  RESOLVED: "resolved",
};

export const REPORT_STATUS_ORDER = [
  REPORT_STATUS.PENDING,
  REPORT_STATUS.VERIFIED,
  REPORT_STATUS.RESOLVED,
];

export const REPORT_CATEGORY_LABEL_EN = {
  flood: "Flood",
  fire: "Fire",
  landslide: "Landslide",
  landClearing: "Land clearing",
  roadCut: "Road cut off",
  other: "Other",
};

export function getNextReportStatus(status) {
  const idx = REPORT_STATUS_ORDER.indexOf(status);
  if (idx === -1 || idx === REPORT_STATUS_ORDER.length - 1) return null;
  return REPORT_STATUS_ORDER[idx + 1];
}

export function summarizeReportStatus(reports = []) {
  const summary = {
    total: reports.length,
    pending: 0,
    verified: 0,
    resolved: 0,
  };
  reports.forEach((r) => {
    const status = r.status ?? REPORT_STATUS.PENDING;
    if (status === REPORT_STATUS.VERIFIED) summary.verified += 1;
    else if (status === REPORT_STATUS.RESOLVED) summary.resolved += 1;
    else summary.pending += 1;
  });
  return summary;
}
