import { explainRiskLevel } from "../utils/riskLogic";
import { useLanguage } from "../i18n/LanguageContext";
import SituationSummaryPanel from "./SituationSummaryPanel";

export default function RiskExplanationModal({ desa, reports, onClose }) {
  const { t } = useLanguage();
  if (!desa) return null;

  const { level, skorAkhir, faktor } = explainRiskLevel(desa, t);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-card-body">
        <div className="modal-header">
          <h3>
            {t("riskExplainModal.titleWhy", {
              level: t(`riskLevels.${level}`),
              name: desa.nama,
            })}
          </h3>
          <button className="modal-close" onClick={onClose} aria-label={t("riskExplainModal.close")}>
            ✕
          </button>
        </div>

        <div className="risk-level-vs-score">
          <div className="risk-level-vs-score-row">
            <span className="risk-level-vs-score-tag risk-level-vs-score-tag--level">
              {t("riskExplainModal.riskLevelTag")}
            </span>
            <span>
              <strong>{t(`riskLevels.${level}`)}</strong>
              {t("riskExplainModal.riskLevelDesc")}
            </span>
          </div>
          <div className="risk-level-vs-score-row">
            <span className="risk-level-vs-score-tag risk-level-vs-score-tag--score">
              {t("riskExplainModal.riskScoreTag")}
            </span>
            <span>
              <strong>{t("riskExplainModal.riskScoreDescPrefix", { score: skorAkhir })}</strong>
              {t("riskExplainModal.riskScoreDesc")}{" "}
              <u>{t("riskExplainModal.riskScoreDescBukan")}</u>{" "}
              {t("riskExplainModal.riskScoreDescSuffix")}
            </span>
          </div>
        </div>

        <p className="modal-subtitle">{t("riskExplainModal.breakdownIntro")}</p>

        <div className="risk-explain-list">
          {faktor.map((f) => (
            <div
              key={f.nama}
              className={`risk-explain-item ${
                f.terpicu ? "risk-explain-item--terpicu" : ""
              }`}
            >
              <div className="risk-explain-item-head">
                <strong>{f.nama}</strong>
                <span className="risk-explain-weight">
                  {t("riskExplainModal.weight", { pct: Math.round(f.bobot * 100) })}
                </span>
              </div>
              <div className="risk-explain-bar-track">
                <div
                  className="risk-explain-bar-fill"
                  style={{ width: `${f.skor}%` }}
                />
              </div>
              <div className="risk-explain-item-row">
                <span>{t("riskExplainModal.actualValue", { val: f.nilai })}</span>
                <span>{t("riskExplainModal.threshold", { val: f.ambang })}</span>
              </div>
              <p className="risk-explain-note">{f.penjelasan}</p>
            </div>
          ))}
        </div>

        <p className="modal-note">
          {t("riskExplainModal.footerNotePrefix")}{" "}
          <strong>{t("riskExplainModal.footerNoteLink")}</strong>{" "}
          {t("riskExplainModal.footerNoteSuffix")}
        </p>

        <SituationSummaryPanel desa={desa} reports={reports} level={level} />
        </div>
      </div>
    </div>
  );
}
