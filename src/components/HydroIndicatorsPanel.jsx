import { listHydroIndicators } from "../utils/riskLogic";
import { useLanguage } from "../i18n/LanguageContext";

export default function HydroIndicatorsPanel() {
  const { t } = useLanguage();
  const indicators = listHydroIndicators();

  const STATUS_LABEL = {
    "statis-siap": t("hydroPanel.statusReady"),
    estimasi: t("hydroPanel.statusEstimate"),
    "tidak-tersedia": t("hydroPanel.statusUnavailable"),
  };

  return (
    <div className="hydro-panel">
      <div className="hydro-panel-head">
        <h3>{t("hydroPanel.title")}</h3>
        <span className="hydro-panel-sub">{t("hydroPanel.subtitle")}</span>
      </div>

      <div className="hydro-table">
        <div className="hydro-table-row hydro-table-row--head">
          <span>{t("hydroPanel.colIndicator")}</span>
          <span>{t("hydroPanel.colStatus")}</span>
          <span>{t("hydroPanel.colConfidence")}</span>
          <span>{t("hydroPanel.colIdealSource")}</span>
        </div>
        {indicators.map((ind) => (
          <div className="hydro-table-row" key={ind.key}>
            <span className="hydro-table-label">
              {ind.label}
              <span className="hydro-table-unit"> ({ind.satuan})</span>
            </span>
            <span className={`hydro-status hydro-status--${ind.status}`}>
              {STATUS_LABEL[ind.status]}
            </span>
            <span
              className={`confidence-pill confidence-pill--${ind.level.toLowerCase()}`}
            >
              <span className="confidence-pill-dot" />
              {t(`riskLevels.${ind.level}`)}
            </span>
            <span className="hydro-table-source">{ind.sumberIdeal}</span>
          </div>
        ))}
      </div>

      <p className="hydro-panel-disclaimer">{t("hydroPanel.disclaimer")}</p>
    </div>
  );
}
