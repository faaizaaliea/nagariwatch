import { KECAMATAN_LIST } from "../data/kecamatanList";
import {
  getRiskLevel,
  explainRiskLevel,
  summarizeKecamatanRisk,
  getCrossBorderAlerts,
  RISK_THRESHOLDS,
  HOTSPOT_THRESHOLDS,
} from "../utils/riskLogic";
import { REPORT_STATUS } from "../utils/reportLogic";
import { useLanguage } from "../i18n/LanguageContext";
import {
  DEMO_DESA_ID,
  DEMO_RAIN_AFTER,
  DEMO_HOTSPOT_AFTER,
  DEMO_NEIGHBOR_KECAMATAN_ID,
  DEMO_STEPS,
} from "../demo/demoScenario";

export default function DemoScenarioModal({
  open,
  desaList,
  stepIndex,
  isFirstStep,
  isLastStep,
  onNext,
  onPrev,
  onClose,
}) {
  const { t } = useLanguage();
  if (!open) return null;

  const desaBefore = desaList.find((d) => d.id === DEMO_DESA_ID);
  if (!desaBefore) return null;

  const stepId = DEMO_STEPS[stepIndex];
  const desaAfterRain = { ...desaBefore, curah_hujan_mm: DEMO_RAIN_AFTER };
  const desaAfterHotspot = {
    ...desaAfterRain,
    titik_panas_5hari: DEMO_HOTSPOT_AFTER,
  };

  const levelBefore = getRiskLevel(desaBefore);
  const levelAfter = getRiskLevel(desaAfterRain);

  return (
    <div className="demo-modal-overlay" role="dialog" aria-modal="true">
      <div className="demo-modal-card">
        <div className="demo-modal-card-body">
        <div className="demo-modal-head">
          <span className="demo-modal-tag">{t("demoScenario.bannerLabel")}</span>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label={t("demoScenario.exitButton")}
          >
            ✕
          </button>
        </div>

        <p className="demo-modal-intro-note">
          {t("demoScenario.bannerText", { desa: desaBefore.nama })}
        </p>

        <div className="demo-modal-progress">
          {DEMO_STEPS.map((id, i) => (
            <span
              key={id}
              className={`demo-modal-dot ${i === stepIndex ? "is-active" : ""} ${
                i < stepIndex ? "is-done" : ""
              }`}
            />
          ))}
        </div>

        <span className="demo-overlay-counter">
          {t("demoScenario.stepCounter", {
            current: stepIndex + 1,
            total: DEMO_STEPS.length,
          })}
        </span>

        <h4 className="demo-modal-title">
          {t(`demoScenario.steps.${stepId}.title`, { desa: desaBefore.nama })}
        </h4>
        <p className="demo-modal-desc">
          {t(`demoScenario.steps.${stepId}.desc`, {
            desa: desaBefore.nama,
            before: desaBefore.curah_hujan_mm,
            after: DEMO_RAIN_AFTER,
            threshold: RISK_THRESHOLDS.hujanTinggi,
            hotspot: DEMO_HOTSPOT_AFTER,
          })}
        </p>

        <div className="demo-modal-scene">
          {stepId === "intro" && <IntroScene desa={desaBefore} level={levelBefore} t={t} />}
          {stepId === "rainUp" && (
            <RainUpScene before={desaBefore.curah_hujan_mm} after={DEMO_RAIN_AFTER} t={t} />
          )}
          {stepId === "riskTriggered" && (
            <ThresholdScene value={DEMO_RAIN_AFTER} threshold={RISK_THRESHOLDS.hujanTinggi} t={t} />
          )}
          {stepId === "villageHigh" && (
            <BadgeTransitionScene from={levelBefore} to={levelAfter} t={t} />
          )}
          {stepId === "explainWhy" && (
            <ExplainScene desa={desaAfterRain} t={t} showReportEvidence />
          )}
          {stepId === "hotspotUpstream" && (
            <HotspotScene
              before={desaBefore.titik_panas_5hari}
              after={DEMO_HOTSPOT_AFTER}
              threshold={HOTSPOT_THRESHOLDS.tinggi}
              t={t}
            />
          )}
          {stepId === "crossBorder" && (
            <CrossBorderScene desaList={desaList} desaAfter={desaAfterHotspot} t={t} />
          )}
          {stepId === "residentReport" && <ReportScene desaNama={desaBefore.nama} t={t} />}
          {stepId === "end" && <EndScene t={t} />}
        </div>

        <div className="demo-modal-footer">
          <button
            type="button"
            className="demo-overlay-btn"
            onClick={onPrev}
            disabled={isFirstStep}
          >
            {t("demoScenario.prevButton")}
          </button>
          {isLastStep ? (
            <button
              type="button"
              className="demo-overlay-btn demo-overlay-btn--primary"
              onClick={onClose}
            >
              {t("demoScenario.finishButton")}
            </button>
          ) : (
            <button
              type="button"
              className="demo-overlay-btn demo-overlay-btn--primary"
              onClick={onNext}
            >
              {t("demoScenario.nextButton")}
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

function IntroScene({ desa, level, t }) {
  return (
    <div className="demo-scene-intro">
      <div className="demo-scene-intro-head">
        <h5>{desa.nama}</h5>
        <span className={`badge badge--${level.toLowerCase()}`}>
          {t(`riskLevels.${level}`)}
        </span>
      </div>
      <div className="demo-scene-stat-grid">
        <div>
          <span className="peta-detail-label">{t("desaTable.colRain")}</span>
          <span className="peta-detail-value">{desa.curah_hujan_mm} mm</span>
        </div>
        <div>
          <span className="peta-detail-label">{t("desaTable.colRiver")}</span>
          <span className="peta-detail-value">{desa.jarak_sungai_m} m</span>
        </div>
        <div>
          <span className="peta-detail-label">{t("desaTable.colElevation")}</span>
          <span className="peta-detail-value">{desa.elevasi_mdpl} mdpl</span>
        </div>
        <div>
          <span className="peta-detail-label">{t("desaTable.colHotspot")}</span>
          <span className="peta-detail-value">{desa.titik_panas_5hari}</span>
        </div>
      </div>
    </div>
  );
}

function RainUpScene({ before, after, t }) {
  const max = Math.max(after, 100);
  return (
    <div className="demo-scene-compare">
      <div className="demo-scene-compare-row">
        <span className="demo-scene-compare-label">{t("demoScenario.beforeLabel")}</span>
        <div className="demo-scene-compare-track">
          <div
            className="demo-scene-compare-fill demo-scene-compare-fill--before"
            style={{ width: `${(before / max) * 100}%` }}
          />
        </div>
        <span className="demo-scene-compare-value">{before} mm</span>
      </div>
      <div className="demo-scene-compare-row">
        <span className="demo-scene-compare-label">{t("demoScenario.afterLabel")}</span>
        <div className="demo-scene-compare-track">
          <div
            className="demo-scene-compare-fill demo-scene-compare-fill--after"
            style={{ width: `${(after / max) * 100}%` }}
          />
        </div>
        <span className="demo-scene-compare-value">{after} mm</span>
      </div>
    </div>
  );
}

function ThresholdScene({ value, threshold, t }) {
  const max = Math.max(value, threshold) * 1.15;
  return (
    <div className="demo-scene-gauge">
      <div className="demo-scene-gauge-track">
        <div
          className="demo-scene-gauge-fill"
          style={{ width: `${(value / max) * 100}%` }}
        />
        <div
          className="demo-scene-gauge-threshold"
          style={{ left: `${(threshold / max) * 100}%` }}
        />
      </div>
      <div className="demo-scene-gauge-legend">
        <span>{t("demoScenario.thresholdLabel", { val: threshold })}</span>
        <span className="demo-scene-gauge-crossed">
          {t("demoScenario.crossedLabel", { val: value })}
        </span>
      </div>
    </div>
  );
}

function BadgeTransitionScene({ from, to, t }) {
  return (
    <div className="demo-scene-badge-transition">
      <span className={`badge badge--${from.toLowerCase()} demo-scene-badge--from`}>
        {t(`riskLevels.${from}`)}
      </span>
      <span className="demo-scene-badge-arrow">→</span>
      <span className={`badge badge--${to.toLowerCase()} demo-scene-badge--to`}>
        {t(`riskLevels.${to}`)}
      </span>
    </div>
  );
}

function ExplainScene({ desa, t, showReportEvidence }) {
  const { faktor } = explainRiskLevel(desa, t);
  return (
    <div className="demo-scene-explain-wrap">
      <div className="risk-explain-list demo-scene-explain">
        {faktor.map((f) => (
          <div
            key={f.nama}
            className={`risk-explain-item ${f.terpicu ? "risk-explain-item--terpicu" : ""}`}
          >
            <div className="risk-explain-item-head">
              <strong>{f.nama}</strong>
              <span className="risk-explain-weight">
                {t("riskExplainModal.weight", { pct: Math.round(f.bobot * 100) })}
              </span>
            </div>
            <div className="risk-explain-bar-track">
              <div className="risk-explain-bar-fill" style={{ width: `${f.skor}%` }} />
            </div>
          </div>
        ))}
      </div>
      {showReportEvidence && (
        <div className="demo-scene-report-evidence">
          <span className="demo-scene-report-evidence-label">
            {t("demoScenario.reportEvidenceLabel")}
          </span>
          <div className="report-feed-item demo-scene-report demo-scene-report--compact">
            <div className="report-feed-text">
              <div className="report-feed-meta">
                <span className="report-feed-category">
                  {t("communityReport.categories.flood")}
                </span>
              </div>
              <p>{t("demoScenario.demoReportDescription")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HotspotScene({ before, after, threshold, t }) {
  return (
    <div className="demo-scene-hotspot">
      <div className="demo-scene-hotspot-col">
        <span className="demo-scene-compare-label">{t("demoScenario.beforeLabel")}</span>
        <div className="demo-scene-hotspot-dots">
          {before === 0 && <span className="demo-scene-hotspot-empty">—</span>}
          {Array.from({ length: before }, (_, i) => (
            <span key={i} className="demo-scene-hotspot-dot" />
          ))}
        </div>
      </div>
      <span className="demo-scene-badge-arrow">→</span>
      <div className="demo-scene-hotspot-col">
        <span className="demo-scene-compare-label">{t("demoScenario.afterLabel")}</span>
        <div className="demo-scene-hotspot-dots">
          {Array.from({ length: after }, (_, i) => (
            <span
              key={i}
              className={`demo-scene-hotspot-dot ${after >= threshold ? "is-tinggi" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CrossBorderScene({ desaList, desaAfter, t }) {
  const desaListAfter = desaList.map((d) => (d.id === DEMO_DESA_ID ? desaAfter : d));
  const ketambeSummary = summarizeKecamatanRisk(desaListAfter);
  const neighbor = KECAMATAN_LIST.find((k) => k.id === DEMO_NEIGHBOR_KECAMATAN_ID);

  const stats = [
    {
      id: "ketambe",
      nama: "Ketambe",
      posisiDas: "Hulu",
      risiko: ketambeSummary.risiko,
      avgHotspot: ketambeSummary.avgHotspot,
    },
    {
      id: neighbor.id,
      nama: neighbor.nama,
      posisiDas: neighbor.posisiDas,
      risiko: neighbor.estimasi?.risiko ?? null,
      avgHotspot: neighbor.estimasi?.avgHotspot ?? null,
    },
  ];
  const alerts = getCrossBorderAlerts(stats, t);

  return (
    <div className="demo-scene-crossborder">
      <div className="das-flow demo-scene-das-flow">
        {stats.map((k, i) => (
          <div className="das-flow-item" key={k.id}>
            <div className="das-card">
              <div className="das-card-head">
                <span className="das-posisi-tag">
                  {t(`crossBorderPage.posisi.${k.posisiDas}`)}
                </span>
                {k.risiko && (
                  <span className={`badge badge--${k.risiko.toLowerCase()}`}>
                    {t(`riskLevels.${k.risiko}`)}
                  </span>
                )}
              </div>
              <h3>{k.nama}</h3>
            </div>
            {i < stats.length - 1 && <span className="das-flow-arrow">→</span>}
          </div>
        ))}
      </div>
      {alerts.length > 0 && (
        <div className="alert-banner demo-scene-alert" role="alert">
          <img className="alert-banner-icon" src="/warning.png" alt="" />
          <div className="alert-banner-body">
            {alerts.map((a, i) => (
              <p key={i} className="alert-banner-detail">
                {t("crossBorderPage.alertLine", { msg: a.pesan, list: a.ke.join(", ") })}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ReportScene({ desaNama, t }) {
  return (
    <div className="report-feed-item demo-scene-report">
      <div className="report-feed-text">
        <div className="report-feed-meta">
          <strong>{desaNama}</strong>
          <span>{t("demoScenario.sampleReportTag")}</span>
        </div>
        <span className="report-feed-category">
          {t("communityReport.categories.flood")}
        </span>
        <p>{t("demoScenario.demoReportDescription")}</p>
        <div className="report-feed-status-row">
          <span className={`status-badge status-badge--${REPORT_STATUS.PENDING}`}>
            {t(`reportStatus.${REPORT_STATUS.PENDING}`)}
          </span>
        </div>
      </div>
    </div>
  );
}

function EndScene({ t }) {
  const chain = [
    "rainUp",
    "riskTriggered",
    "villageHigh",
    "residentReport",
    "explainWhy",
    "hotspotUpstream",
    "crossBorder",
  ];
  return (
    <ol className="demo-scene-recap">
      {chain.map((id) => (
        <li key={id}>{t(`demoScenario.steps.${id}.title`)}</li>
      ))}
    </ol>
  );
}
