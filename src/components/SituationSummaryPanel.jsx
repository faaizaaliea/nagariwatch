import { useSituationSummary } from "../hooks/useSituationSummary";
import { useLanguage } from "../i18n/LanguageContext";

export default function SituationSummaryPanel({ desa, reports, level }) {
  const { t } = useLanguage();
  const { status, data, error, generate, isConfigured } = useSituationSummary(
    desa,
    reports,
    level,
  );

  return (
    <div className="situation-summary">
      <div className="situation-summary-badges">
        <span className="situation-summary-badge situation-summary-badge--rule">
          {t("situationSummary.badgeRiskLevel")}
        </span>
        <span className="situation-summary-badge situation-summary-badge--ai">
          {t("situationSummary.badgeAiAssisted")}
        </span>
      </div>

      <h4 className="situation-summary-title">
        {t("situationSummary.heading")}
      </h4>
      <p className="situation-summary-caption">
        {t("situationSummary.caption")}
      </p>

      {!isConfigured && (
        <p className="situation-summary-note situation-summary-note--warn">
          {t("situationSummary.notConfigured")}
        </p>
      )}

      {isConfigured && status === "idle" && (
        <button
          type="button"
          className="situation-summary-generate-btn"
          onClick={generate}
        >
          {t("situationSummary.generateButton")}
        </button>
      )}

      {status === "loading" && (
        <p className="situation-summary-note">
          {t("situationSummary.loading")}
        </p>
      )}

      {status === "error" && (
        <div className="situation-summary-note situation-summary-note--error">
          <p>{t("situationSummary.errorPrefix", { message: error?.message ?? "" })}</p>
          <button
            type="button"
            className="situation-summary-generate-btn situation-summary-generate-btn--retry"
            onClick={generate}
          >
            {t("situationSummary.retryButton")}
          </button>
        </div>
      )}

      {status === "success" && data && (
        <div className="situation-summary-result">
          <p className="situation-summary-summary">{data.summary}</p>

          {data.observations.length > 0 && (
            <ul className="situation-summary-observations">
              {data.observations.map((obs, i) => (
                <li key={i}>{obs}</li>
              ))}
            </ul>
          )}

          <p className="situation-summary-limitations">
            <strong>{t("situationSummary.limitationsLabel")}</strong>{" "}
            {data.limitations}
          </p>

          <button
            type="button"
            className="situation-summary-generate-btn situation-summary-generate-btn--regenerate"
            onClick={generate}
          >
            {t("situationSummary.regenerateButton")}
          </button>
        </div>
      )}
    </div>
  );
}
