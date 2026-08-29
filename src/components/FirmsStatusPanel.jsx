import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function FirmsStatusPanel({
  status,
  source,
  error,
  lastUpdated,
  mapKey,
  onSaveMapKey,
  onRetry,
}) {
  const { t, locale } = useLanguage();
  const [inputValue, setInputValue] = useState(mapKey || "");
  const [showInput, setShowInput] = useState(!mapKey);

  const SOURCE_LABEL = {
    "firms-direct": { text: t("firmsPanel.sourceDirect"), tone: "ok" },
    "firms-own-proxy": { text: t("firmsPanel.sourceOwnProxy"), tone: "ok" },
    "firms-proxy": { text: t("firmsPanel.sourceProxy"), tone: "ok" },
    dummy: { text: t("firmsPanel.sourceDummy"), tone: "muted" },
  };

  const label = SOURCE_LABEL[source] ?? SOURCE_LABEL.dummy;

  function handleSubmit(e) {
    e.preventDefault();
    onSaveMapKey(inputValue.trim());
    setShowInput(false);
  }

  return (
    <div className="firms-panel">
      <div className="firms-panel-status">
        <span className={`firms-dot firms-dot--${label.tone}`} />
        <div className="firms-panel-text">
          <span className="firms-panel-title">
            {t("firmsPanel.sourcePrefix")}
            <strong>{label.text}</strong>
          </span>
          {status === "loading" && (
            <span className="firms-panel-sub">{t("firmsPanel.fetching")}</span>
          )}
          {status === "success" && lastUpdated && (
            <span className="firms-panel-sub">
              {t("firmsPanel.updated", {
                time: lastUpdated.toLocaleTimeString(locale),
              })}
            </span>
          )}
          {status === "error" && (
            <span className="firms-panel-sub firms-panel-sub--error">
              {error || t("firmsPanel.errorFallback")}
            </span>
          )}
        </div>
        {status === "error" && mapKey && (
          <button
            type="button"
            className="firms-panel-toggle"
            onClick={onRetry}
            disabled={status === "loading"}
          >
            {t("firmsPanel.retry")}
          </button>
        )}
        <button
          type="button"
          className="firms-panel-toggle"
          onClick={() => setShowInput((v) => !v)}
        >
          {showInput
            ? t("firmsPanel.close")
            : mapKey
              ? t("firmsPanel.changeKey")
              : t("firmsPanel.connect")}
        </button>
      </div>

      {showInput && (
        <form className="firms-panel-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t("firmsPanel.placeholderKey")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">{t("firmsPanel.saveBtn")}</button>
          <a
            href="https://firms.modaps.eosdis.nasa.gov/api/map_key/"
            target="_blank"
            rel="noreferrer"
            className="firms-panel-link"
          >
            {t("firmsPanel.noKeyLink")}
          </a>
        </form>
      )}
    </div>
  );
}
