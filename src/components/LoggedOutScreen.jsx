import { useLanguage } from "../i18n/LanguageContext";

export default function LoggedOutScreen({ onLoginAgain }) {
  const { t } = useLanguage();
  return (
    <div className="logged-out-shell">
      <div className="logged-out-card">
        <img className="logged-out-icon" src="/bye.png"></img>
        <h2>{t("loggedOut.title")}</h2>
        <p>{t("loggedOut.subtitle")}</p>
        <button onClick={onLoginAgain}>{t("loggedOut.button")}</button>
      </div>
    </div>
  );
}
