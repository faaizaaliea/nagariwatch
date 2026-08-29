import SummaryCards from "../components/SummaryCards";
import EvidenceDashboard from "../components/EvidenceDashboard";
import TodayStatusCard from "../components/TodayStatusCard";
import { getHotspotAlerts } from "../utils/riskLogic";
import { summarizeReportStatus } from "../utils/reportLogic";
import { useLanguage } from "../i18n/LanguageContext";

export default function DashboardPage({
  desaList,
  firmsSource,
  reports = [],
  kecamatan,
}) {
  const { t } = useLanguage();
  const hotspotAlertCount = getHotspotAlerts(desaList).length;
  const reportSummary = summarizeReportStatus(reports);

  return (
    <div className="page-block">
      <div className="page-heading">
        <h2>
          <img className="icon-inline--lg" src="/chart.png" alt="" />
          {t("dashboardPage.title")}
        </h2>
        <p>{t("dashboardPage.subtitle")}</p>
      </div>

      <TodayStatusCard desaList={desaList} kecamatanName={kecamatan?.nama} />

      <SummaryCards desaList={desaList} />

      <div className="evidence-source-grid">
        <div className="evidence-source-card">
          <span className="evidence-source-label">{t("dashboardPage.rainfallAnomaly")}</span>
          <span className="evidence-source-value">
            {hotspotAlertCount > 0 ? t("dashboardPage.monitored") : t("dashboardPage.normal")}
          </span>
          <span className="evidence-source-sub">{t("dashboardPage.fromRainData")}</span>
        </div>
        <div className="evidence-source-card">
          <span className="evidence-source-label">{t("dashboardPage.hotspotPressure")}</span>
          <span className="evidence-source-value">
            {hotspotAlertCount} {t("dashboardPage.desaUnit")}
          </span>
          <span className="evidence-source-sub">{t("dashboardPage.hotspotSub")}</span>
        </div>
        <div className="evidence-source-card">
          <span className="evidence-source-label">{t("dashboardPage.citizenReports")}</span>
          <span className="evidence-source-value">{reports.length}</span>
          <span className="evidence-source-sub">{t("dashboardPage.reportsThisSession")}</span>
        </div>
      </div>

      <EvidenceDashboard firmsSource={firmsSource} />

      <div className="report-status-card">
        <div className="report-status-head">
          <h3>{t("dashboardPage.verificationTitle")}</h3>
          <span className="prototype-pill">{t("dashboardPage.prototypeBadge")}</span>
        </div>
        <p className="evidence-dashboard-sub">{t("dashboardPage.verificationSub")}</p>
        <div className="report-status-grid">
          <div className="report-status-stat report-status-stat--total">
            <span className="report-status-value">{reportSummary.total}</span>
            <span className="report-status-label">{t("dashboardPage.reportsLabel")}</span>
          </div>
          <div className="report-status-stat report-status-stat--verified">
            <span className="report-status-value">
              {reportSummary.verified}
            </span>
            <span className="report-status-label">{t("reportStatus.verified")}</span>
          </div>
          <div className="report-status-stat report-status-stat--pending">
            <span className="report-status-value">{reportSummary.pending}</span>
            <span className="report-status-label">{t("reportStatus.pending")}</span>
          </div>
          <div className="report-status-stat report-status-stat--resolved">
            <span className="report-status-value">
              {reportSummary.resolved}
            </span>
            <span className="report-status-label">{t("reportStatus.resolved")}</span>
          </div>
        </div>
      </div>

      {reports.length > 0 && (
        <div className="evidence-reports-card">
          <h3>{t("dashboardPage.latestReportsTitle")}</h3>
          <div className="evidence-reports-list">
            {reports.slice(0, 4).map((r) => (
              <div className="evidence-report-item" key={r.id}>
                {r.mediaData && r.mediaType === "image" && (
                  <img
                    src={r.mediaData}
                    alt=""
                    className="evidence-report-thumb"
                  />
                )}
                {r.mediaData && r.mediaType === "video" && (
                  <video
                    src={r.mediaData}
                    className="evidence-report-thumb"
                    muted
                  />
                )}
                <div className="evidence-report-text">
                  <div className="evidence-report-head">
                    <strong>{r.location}</strong>
                    <span
                      className={`status-badge status-badge--${
                        r.status ?? "pending"
                      }`}
                    >
                      {t(`reportStatus.${r.status ?? "pending"}`)}
                    </span>
                  </div>
                  {r.category && (
                    <span className="report-feed-category">
                      {t(`communityReport.categories.${r.category}`)}
                    </span>
                  )}
                  <span>{r.description}</span>
                  <span className="evidence-report-meta">
                    {r.timestamp}
                    {r.gps &&
                      ` · ${r.gps.lat.toFixed(4)}, ${r.gps.lng.toFixed(4)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
