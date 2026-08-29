import {
  RISK_THRESHOLDS,
  HOTSPOT_THRESHOLDS,
  RISK_WEIGHTS,
} from "../utils/riskLogic";
import { useLanguage } from "../i18n/LanguageContext";

const TONE_EMOJI = { dummy: "🟠", mixed: "🟡", real: "🟢", future: "⚪" };

export default function MetodologiPage() {
  const { t } = useLanguage();
  const statusLegend = t("metodologi.statusLegend");
  const sumberData = t("metodologi.sumberData");
  const toneText = t("metodologi.toneText");
  const limitations = t("metodologi.limitations");

  return (
    <div className="page-block">
      <div className="page-heading">
        <h2>
          <img className="icon-inline--lg" src="/methods.png" alt="" />
          {t("metodologi.title")}
        </h2>
        <p>{t("metodologi.subtitle")}</p>
      </div>

      <div className="table-card">
        <h3>{t("metodologi.statusLegendTitle")}</h3>
        <p>{t("metodologi.statusLegendIntro")}</p>
        <div className="evidence-source-grid">
          {statusLegend.map((s) => (
            <div className="evidence-source-card" key={s.label}>
              <span className="evidence-source-label">
                {s.emoji} {s.label}
              </span>
              <span className="evidence-source-sub">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="table-card">
        <h3>{t("metodologi.sourceTableTitle")}</h3>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>{t("metodologi.colIndicator")}</th>
                <th>{t("metodologi.colCurrentStatus")}</th>
                <th>{t("metodologi.colPlan")}</th>
                <th>{t("metodologi.colNote")}</th>
              </tr>
            </thead>
            <tbody>
              {sumberData.map((row) => (
                <tr key={row.indikator}>
                  <td>{row.indikator}</td>
                  <td>
                    <span
                      className={`badge ${
                        row.statusTone === "dummy"
                          ? "badge--muted"
                          : row.statusTone === "future"
                            ? "badge--muted"
                            : "badge--sedang"
                      }`}
                    >
                      {TONE_EMOJI[row.statusTone]} {toneText[row.statusTone]}
                    </span>{" "}
                    {row.statusSaatIni}
                  </td>
                  <td>{row.rencana}</td>
                  <td className="modal-note" style={{ margin: 0 }}>
                    {row.catatan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="table-card">
        <h3>{t("metodologi.scoreTitle")}</h3>
        <p>
          {t("metodologi.scoreIntroPrefix")}{" "}
          <strong>{t("metodologi.scoreIntroBold")}</strong>{" "}
          {t("metodologi.scoreIntroSuffix")}
        </p>

        <div className="risk-level-vs-score">
          <div className="risk-level-vs-score-row">
            <span className="risk-level-vs-score-tag risk-level-vs-score-tag--level">
              {t("metodologi.riskLevelTag")}
            </span>
            <span>
              <strong>{t("metodologi.riskLevelAuthoritative")}</strong>{" "}
              {t("metodologi.riskLevelDesc")}{" "}
              <code>
                {t("metodologi.riskLevelFormula", {
                  hujan: RISK_THRESHOLDS.hujanTinggi,
                  sungai: RISK_THRESHOLDS.sungaiDekat,
                  elevasi: RISK_THRESHOLDS.elevasiRendah,
                })}
              </code>
              . {t("metodologi.riskLevelFooter")}
            </span>
          </div>
          <div className="risk-level-vs-score-row">
            <span className="risk-level-vs-score-tag risk-level-vs-score-tag--score">
              {t("metodologi.riskScoreTag")}
            </span>
            <span>
              <strong>{t("metodologi.riskScoreSupplementary")}</strong>{" "}
              {t("metodologi.riskScoreDesc")}{" "}
              <u>{t("metodologi.riskScoreDescNot")}</u>{" "}
              {t("metodologi.riskScoreDescSuffix")}
            </span>
          </div>
        </div>

        <div className="why-thresholds-box">
          <h4>{t("metodologi.whyThresholdsTitle")}</h4>
          <div className="why-thresholds-item">
            <p className="why-thresholds-q">
              {t("metodologi.whyThresholdsRainQ")}
            </p>
            <p className="why-thresholds-a">
              {t("metodologi.whyThresholdsRainA")}
            </p>
          </div>
          <div className="why-thresholds-item">
            <p className="why-thresholds-q">
              {t("metodologi.whyThresholdsRiverQ")}
            </p>
            <p className="why-thresholds-a">
              {t("metodologi.whyThresholdsRiverA")}
            </p>
          </div>
          <ul className="why-thresholds-points">
            {t("metodologi.whyThresholdsPoints").map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>

        <p>{t("metodologi.weightsIntro")}</p>

        <div className="evidence-source-grid">
          <div className="evidence-source-card">
            <span className="evidence-source-label">{t("metodologi.weightRain")}</span>
            <span className="evidence-source-value">
              {Math.round(RISK_WEIGHTS.curahHujan * 100)}%
            </span>
            <span className="evidence-source-sub">
              {t("metodologi.weightRainSub", { val: RISK_THRESHOLDS.hujanTinggi })}
            </span>
          </div>
          <div className="evidence-source-card">
            <span className="evidence-source-label">{t("metodologi.weightRiver")}</span>
            <span className="evidence-source-value">
              {Math.round(RISK_WEIGHTS.jarakSungaiElevasi * 100)}%
            </span>
            <span className="evidence-source-sub">
              {t("metodologi.weightRiverSub", {
                sungai: RISK_THRESHOLDS.sungaiDekat,
                elevasi: RISK_THRESHOLDS.elevasiRendah,
              })}
            </span>
          </div>
          <div className="evidence-source-card">
            <span className="evidence-source-label">{t("metodologi.weightHotspot")}</span>
            <span className="evidence-source-value">
              {Math.round(RISK_WEIGHTS.titikPanas * 100)}%
            </span>
            <span className="evidence-source-sub">
              {t("metodologi.weightHotspotSub", { val: HOTSPOT_THRESHOLDS.tinggi })}
            </span>
          </div>
        </div>

        <p className="data-note" style={{ marginTop: 14 }}>
          {t("metodologi.scoreFooterNote")}
        </p>
      </div>

      <div className="table-card">
        <h3>{t("metodologi.limitationsTitle")}</h3>
        <ul className="risk-explain-note" style={{ paddingLeft: 18 }}>
          {limitations.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
