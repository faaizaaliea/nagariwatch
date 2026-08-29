import { summarizeRisk, getHotspotAlerts } from "../utils/riskLogic";
import { useLanguage } from "../i18n/LanguageContext";

export default function SummaryCards({ desaList }) {
  const { t } = useLanguage();
  const summary = summarizeRisk(desaList);
  const total = desaList.length;
  const hotspotCount = getHotspotAlerts(desaList).length;

  const cards = [
    { key: "totalDesa", value: total, tone: "neutral" },
    { key: "highRisk", value: summary.Tinggi, tone: "tinggi" },
    { key: "mediumRisk", value: summary.Sedang, tone: "sedang" },
    { key: "lowRisk", value: summary.Rendah, tone: "rendah" },
    { key: "highHotspotDesa", value: hotspotCount, tone: "tinggi" },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`summary-card summary-card--${card.tone}`}
        >
          <span className="summary-value">{card.value}</span>
          <span className="summary-label">{t(`summaryCards.${card.key}`)}</span>
        </div>
      ))}
    </div>
  );
}
