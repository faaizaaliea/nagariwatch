import CommunityReport from "../components/CommunityReport";
import { useLanguage } from "../i18n/LanguageContext";

export default function CommunityReportPage({
  desaList,
  reports,
  onAddReport,
  onUpdateStatus,
}) {
  const { t } = useLanguage();
  return (
    <div className="page-block">
      <div className="page-heading">
        <h2>
          <img className="icon-inline--lg" src="/megaphone.png" alt="" />
          {t("communityReportPage.title")}
        </h2>
        <p>{t("communityReportPage.subtitle")}</p>
      </div>
      <CommunityReport
        desaList={desaList}
        reports={reports}
        onAddReport={onAddReport}
        onUpdateStatus={onUpdateStatus}
      />
    </div>
  );
}
