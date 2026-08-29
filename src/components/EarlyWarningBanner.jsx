import { useState } from "react";
import {
  getHeavyRainAlerts,
  getHotspotAlerts,
  getAlertReasons,
  getRiskLevel,
  RISK_LEVELS,
} from "../utils/riskLogic";
import ShareWarningButton from "./ShareWarningButton";
import { useLanguage } from "../i18n/LanguageContext";

export default function EarlyWarningBanner({ desaList, kecamatanName }) {
  const { t, locale } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  const rainAlerts = getHeavyRainAlerts(desaList);
  const hotspotAlerts = getHotspotAlerts(desaList);
  const alertDesaIds = new Set(
    [...rainAlerts, ...hotspotAlerts].map((d) => d.id),
  );
  const alertDesa = desaList.filter((d) => alertDesaIds.has(d.id));

  if (alertDesa.length === 0 || dismissed) return null;

  const overallLevel = alertDesa.some(
    (d) => getRiskLevel(d) === RISK_LEVELS.TINGGI,
  )
    ? RISK_LEVELS.TINGGI
    : RISK_LEVELS.SEDANG;

  const shareText = t("shareWarning.textOverall", {
    level: t(`riskLevels.${overallLevel}`),
    count: alertDesa.length,
    kec: kecamatanName ?? "",
    time: new Date().toLocaleString(locale),
  });

  return (
    <div className="alert-banner alert-banner--detailed" role="alert">
      <img className="alert-banner-icon" src="/warning.png" />
      <div className="alert-banner-body">
        <div className="alert-banner-head">
          <strong>{t("earlyWarning.title")}</strong>
          <ShareWarningButton
            title={t("shareWarning.titlePrefix")}
            text={shareText}
          />
        </div>
        <p>{t("earlyWarning.summary", { count: alertDesa.length })}</p>

        <div className="alert-reason-list">
          {alertDesa.slice(0, 4).map((desa) => {
            const reasons = getAlertReasons(desa, t);
            const level = getRiskLevel(desa);
            return (
              <div className="alert-reason-item" key={desa.id}>
                <div className="alert-reason-head">
                  <strong>{desa.nama}</strong>
                  <span className={`badge badge--${level.toLowerCase()}`}>
                    {t("earlyWarning.riskLevel", { level: t(`riskLevels.${level}`) })}
                  </span>
                </div>
                <ul className="alert-reason-details">
                  {reasons.map((r, i) => (
                    <li key={i}>
                      <span className="alert-reason-label">{r.label}</span>
                      <span className="alert-reason-detail">{r.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {alertDesa.length > 4 && (
            <p className="alert-banner-detail">
              {t("earlyWarning.more", { count: alertDesa.length - 4 })}
            </p>
          )}
        </div>
      </div>
      <button
        className="alert-banner-close"
        onClick={() => setDismissed(true)}
        aria-label={t("earlyWarning.close")}
      >
        ✕
      </button>
    </div>
  );
}
