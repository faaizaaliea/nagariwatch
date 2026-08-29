import { generateMonthlyBrief } from "../utils/riskLogic";
import { useLanguage } from "../i18n/LanguageContext";

export default function MonthlyBrief({ desaList }) {
  const { t, locale } = useLanguage();
  const brief = generateMonthlyBrief(desaList, t, locale);

  return (
    <div className="brief-card">
      <span className="brief-card-title">
        {t("monthlyBrief.title", { month: brief.month })}
      </span>

      <div className="brief-row">
        <span className="brief-row-label">{t("monthlyBrief.highRisk")}</span>
        <span className="brief-row-value brief-row-value--tinggi">
          {brief.highRiskCount}
        </span>
      </div>
      <div className="brief-row">
        <span className="brief-row-label">{t("monthlyBrief.avgRainfall")}</span>
        <span className="brief-row-value">{brief.avgRainfall} mm</span>
      </div>
      <div className="brief-row">
        <span className="brief-row-label">{t("monthlyBrief.hotspotTrend")}</span>
        <span className="brief-row-value">
          {t("monthlyBrief.hotspotPoints", {
            points: brief.avgHotspot,
            count: brief.hotspotVillageCount,
          })}
        </span>
      </div>
      <div className="brief-row">
        <span className="brief-row-label">{t("monthlyBrief.hotspotPressure")}</span>
        <span className="brief-row-value">{brief.hotspotPressureIndex}%</span>
      </div>
      <div className="brief-recommendation">
        <span className="brief-recommendation-label">
          {t("monthlyBrief.recommendation")}
        </span>
        <p>{brief.recommendation}</p>
      </div>
    </div>
  );
}
