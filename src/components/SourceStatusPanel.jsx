import { useLanguage } from "../i18n/LanguageContext";

export default function SourceStatusPanel({
  status,
  source,
  error,
  lastUpdated,
  onRetry,
  sourceLabels,
  prefixKey,
  fetchingKey,
  updatedKey,
  errorFallbackKey,
  retryKey,
}) {
  const { t, locale } = useLanguage();
  const label = sourceLabels[source] ?? sourceLabels.dummy;

  return (
    <div className="firms-panel">
      <div className="firms-panel-status">
        <span className={`firms-dot firms-dot--${label.tone}`} />
        <div className="firms-panel-text">
          <span className="firms-panel-title">
            {t(prefixKey)}
            <strong>{t(label.textKey)}</strong>
          </span>
          {status === "loading" && (
            <span className="firms-panel-sub">{t(fetchingKey)}</span>
          )}
          {status === "success" && lastUpdated && (
            <span className="firms-panel-sub">
              {t(updatedKey, { time: lastUpdated.toLocaleTimeString(locale) })}
            </span>
          )}
          {status === "error" && (
            <span className="firms-panel-sub firms-panel-sub--error">
              {error || t(errorFallbackKey)}
            </span>
          )}
        </div>
        {status === "error" && (
          <button
            type="button"
            className="firms-panel-toggle"
            onClick={onRetry}
            disabled={status === "loading"}
          >
            {t(retryKey)}
          </button>
        )}
      </div>
    </div>
  );
}
