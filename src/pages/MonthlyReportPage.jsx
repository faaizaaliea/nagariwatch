import { useState } from "react";
import { MONTHLY_HISTORY, AVAILABLE_YEARS } from "../data/monthlyHistory";
import MonthlyBrief from "../components/MonthlyBrief";
import { useLanguage } from "../i18n/LanguageContext";

const CURRENT_YEAR = new Date().getFullYear();

export default function MonthlyReportPage({ kecamatan, desaList = [] }) {
  const { t, locale } = useLanguage();
  const [year, setYear] = useState(CURRENT_YEAR);
  const [briefGenerated, setBriefGenerated] = useState(false);
  const months = MONTHLY_HISTORY[year] ?? [];
  const kecamatanNama = kecamatan?.nama ?? "Ketambe";
  const currentMonthLabelId = new Date().toLocaleString("id-ID", {
    month: "long",
  });

  function handleDownloadPdf() {
    if (!briefGenerated) {
      setBriefGenerated(true);
      requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
    } else {
      window.print();
    }
  }

  return (
    <div className="page-block">
      <div className="page-heading page-heading--with-actions">
        <div>
          <h2>
            <img className="icon-inline--lg" src="/calendar.png" alt="" />
            {t("monthlyReportPage.title")}
          </h2>
          <p>{t("monthlyReportPage.subtitle", { name: kecamatanNama })}</p>
        </div>
        <div className="page-heading-actions no-print">
          <button
            className="report-action-btn"
            onClick={() => setBriefGenerated(true)}
          >
            {t("monthlyReportPage.generateReport")}
          </button>
          <button
            className="report-action-btn report-action-btn--primary"
            onClick={handleDownloadPdf}
          >
            {t("monthlyReportPage.downloadPdf")}
          </button>
        </div>
      </div>

      {briefGenerated && (
        <div className="print-only-report">
          <div className="print-only-report-head">
            <strong>{t("monthlyReportPage.printedHead")}</strong>
            <span>
              {t("monthlyReportPage.printedOn", {
                name: kecamatanNama,
                date: new Date().toLocaleDateString(locale),
              })}
            </span>
          </div>
          <MonthlyBrief desaList={desaList} />
          <p className="print-only-report-note">
            {t("monthlyReportPage.printNote")}
          </p>
        </div>
      )}

      {briefGenerated && (
        <div className="monthly-generated-brief no-print">
          <MonthlyBrief desaList={desaList} />
        </div>
      )}

      <div className="year-tabs no-print">
        {AVAILABLE_YEARS.map((y) => (
          <button
            key={y}
            className={`year-tab ${year === y ? "is-active" : ""}`}
            onClick={() => setYear(y)}
          >
            {y}
          </button>
        ))}
      </div>

      {months.length === 0 ? (
        <div className="monthly-empty no-print">
          <img className="monthly-empty-icon" src="/warning.png" alt="" />
          <p>{t("monthlyReportPage.noDataForYear", { year })}</p>
        </div>
      ) : (
        <div className="monthly-grid no-print">
          {months.map((m) => {
            const isCurrent =
              year === CURRENT_YEAR && m.month === currentMonthLabelId;
            return (
              <div
                key={m.month}
                className={`monthly-card ${
                  isCurrent ? "monthly-card--current" : ""
                }`}
              >
                <div className="monthly-card-head">
                  <span>{t(`months.${m.month}`)}</span>
                  {isCurrent && (
                    <span className="monthly-card-tag">
                      {t("monthlyReportPage.thisMonth")}
                    </span>
                  )}
                </div>
                <div className="monthly-card-row">
                  <span>{t("monthlyReportPage.highRiskVillage")}</span>
                  <strong className="tone-tinggi">{m.highRisk}</strong>
                </div>
                <div className="monthly-card-row">
                  <span>{t("monthlyReportPage.mediumRiskVillage")}</span>
                  <strong className="tone-sedang">{m.mediumRisk}</strong>
                </div>
                <div className="monthly-card-row">
                  <span>{t("monthlyReportPage.lowRiskVillage")}</span>
                  <strong className="tone-rendah">{m.lowRisk}</strong>
                </div>
                <div className="monthly-card-row">
                  <span>{t("monthlyReportPage.avgRainfall")}</span>
                  <strong>{m.avgRainfall} mm</strong>
                </div>
                <div className="monthly-card-row">
                  <span>{t("monthlyReportPage.hotspotTrend")}</span>
                  <strong>
                    {m.hotspotAvg} {t("monthlyReportPage.pointsPerDesa")}
                  </strong>
                </div>
                <div className="monthly-card-row">
                  <span>{t("monthlyReportPage.hotspotPressureIndicator")}</span>
                  <strong>{m.hotspotPressureIndex}%</strong>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="data-note no-print">
        {t("monthlyReportPage.footerNote", { name: kecamatanNama })}
      </p>
    </div>
  );
}
