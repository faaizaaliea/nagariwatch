import { useState } from "react";
import {
  summarizeRisk,
  getHeavyRainAlerts,
  getHotspotAlerts,
} from "../utils/riskLogic";
import { getOverallRiskLevel, ACTION_GUIDE_KEY } from "../utils/actionGuide";
import ActionGuideCard from "./ActionGuideCard";
import ShareWarningButton from "./ShareWarningButton";
import { useLanguage } from "../i18n/LanguageContext";

export default function TodayStatusCard({ desaList, kecamatanName }) {
  const { t, locale } = useLanguage();
  const [showWhy, setShowWhy] = useState(false);

  const level = getOverallRiskLevel(desaList);
  const key = ACTION_GUIDE_KEY[level] ?? "rendah";
  const summary = summarizeRisk(desaList);
  const total = desaList.length;
  const alertCount = summary.Tinggi + summary.Sedang;

  const totalRain = desaList.reduce((s, d) => s + (d.curah_hujan_mm ?? 0), 0);
  const avgRainfall = total ? Math.round(totalRain / total) : 0;
  const hotspotAlertCount = getHotspotAlerts(desaList).length;
  const rainAlertCount = getHeavyRainAlerts(desaList).length;

  const shareText = t("shareWarning.textOverall", {
    level: t(`actionGuide.${key}.title`),
    count: alertCount,
    kec: kecamatanName ?? "",
    time: new Date().toLocaleString(locale),
  });

  return (
    <div className={`today-status today-status--${key}`}>
      <div className="today-status-head">
        <span className={`today-status-badge today-status-badge--${key}`}>
          {t(`todayStatus.badgeIcon.${key}`)}{" "}
          {t(`todayStatus.badgeLabel.${key}`)}
        </span>
        <ShareWarningButton title={t("shareWarning.titlePrefix")} text={shareText} />
      </div>

      <p className="today-status-headline">{t(`actionGuide.${key}.headline`)}</p>

      <div className="today-status-stats">
        <div className="today-status-stat">
          <span className="today-status-stat-label">
            {t("todayStatus.rainfallLabel")}
          </span>
          <span className="today-status-stat-value">
            {avgRainfall} {t("todayStatus.mmUnit")}
          </span>
        </div>
        <div className="today-status-stat">
          <span className="today-status-stat-label">
            {t("todayStatus.hotspotLabel")}
          </span>
          <span className="today-status-stat-value">
            +{hotspotAlertCount} {t("todayStatus.villagesUnit")}
          </span>
        </div>
        <div className="today-status-stat">
          <span className="today-status-stat-label">
            {t("todayStatus.floodRiskLabel")}
          </span>
          <span className="today-status-stat-value">
            {t(`riskLevels.${level}`)}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="today-status-why-toggle"
        onClick={() => setShowWhy((v) => !v)}
      >
        {showWhy ? t("todayStatus.whyToggleHide") : t("todayStatus.whyToggleShow")}
      </button>

      {showWhy && (
        <p className="today-status-why-detail">
          {t("todayStatus.villagesOnAlert", { count: alertCount, total })}
          {rainAlertCount > 0 &&
            " " + t("todayStatus.rainAlertNote", { count: rainAlertCount })}
        </p>
      )}

      <ActionGuideCard level={level} />
    </div>
  );
}
