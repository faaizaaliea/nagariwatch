import { useLanguage } from "../i18n/LanguageContext";

export default function NoDataPage({ kecamatan, onBack }) {
  const { t } = useLanguage();
  return (
    <div className="page-block">
      <button className="peta-back-btn" onClick={onBack}>
        {t("noData.back")}
      </button>

      <div className="monthly-empty">
        <img className="monthly-empty-icon" src="/warning.png" alt="" />
        <p>
          {t("noData.message", {
            name: kecamatan.nama,
            kab: kecamatan.kabupaten,
          })}
        </p>
        <p className="peta-search-empty">{t("noData.note")}</p>
      </div>
    </div>
  );
}
