import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageToggle({ className = "" }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`lang-toggle ${className}`} role="group" aria-label="Language">
      <button
        type="button"
        className={`lang-toggle-btn ${lang === "id" ? "is-active" : ""}`}
        onClick={() => setLang("id")}
      >
        ID
      </button>
      <button
        type="button"
        className={`lang-toggle-btn ${lang === "en" ? "is-active" : ""}`}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}
