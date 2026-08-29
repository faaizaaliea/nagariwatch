import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MONTHLY_HISTORY } from "../data/monthlyHistory";
import { getMonthOverMonthChange, getDataConfidence } from "../utils/riskLogic";
import { useLanguage } from "../i18n/LanguageContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);
ChartJS.defaults.font.family = "'Comfortaa', sans-serif";

function ChangeCard({ label, change, unit = "" }) {
  const { t } = useLanguage();
  if (!change) return null;
  const naik = change.arah === "naik";
  const tetap = change.arah === "tetap";
  const tone = tetap ? "neutral" : naik ? "up" : "down";

  return (
    <div className={`evidence-change-card evidence-change-card--${tone}`}>
      <span className="evidence-change-label">{label}</span>
      <div className="evidence-change-value">
        <span className="evidence-change-arrow">
          {tetap ? "→" : naik ? "▲" : "▼"}
        </span>
        {Math.abs(change.diff)}
        {unit}
        <span className="evidence-change-pct">
          ({change.pct > 0 ? "+" : ""}
          {change.pct}%)
        </span>
      </div>
      <span className="evidence-change-sub">
        {t("evidenceDashboard.vsLastMonth", {
          month: change.bulanLaluLabel
            ? t(`months.${change.bulanLaluLabel}`)
            : t("evidenceDashboard.lastMonthFallback"),
        })}
      </span>
    </div>
  );
}

export default function EvidenceDashboard({ firmsSource = "dummy" }) {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();
  const history = (MONTHLY_HISTORY[year] ?? []).slice(-6);
  const change = getMonthOverMonthChange(MONTHLY_HISTORY[year] ?? []);
  const confidence = getDataConfidence(firmsSource, t);

  const lineData = {
    labels: history.map((m) => t(`months.${m.month}`)),
    datasets: [
      {
        label: t("evidenceDashboard.rainfallDatasetLabel"),
        data: history.map((m) => m.avgRainfall),
        borderColor: "#2f6fed",
        backgroundColor: "rgba(47,111,237,0.12)",
        yAxisID: "y",
        tension: 0.35,
        fill: true,
        pointRadius: 3,
      },
      {
        label: t("evidenceDashboard.hotspotDatasetLabel"),
        data: history.map((m) => m.hotspotAvg),
        borderColor: "#d9607a",
        backgroundColor: "rgba(217,96,122,0.12)",
        yAxisID: "y1",
        tension: 0.35,
        fill: true,
        pointRadius: 3,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: { legend: { position: "bottom", labels: { boxWidth: 10 } } },
    scales: {
      y: {
        position: "left",
        title: { display: true, text: t("evidenceDashboard.yLeft") },
        grid: { color: "#eaf2ff" },
      },
      y1: {
        position: "right",
        title: { display: true, text: t("evidenceDashboard.yRight") },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="evidence-dashboard">
      <div className="evidence-dashboard-head">
        <h3>{t("evidenceDashboard.title")}</h3>
        <div
          className={`confidence-pill confidence-pill--${confidence.level.toLowerCase()}`}
        >
          <span className="confidence-pill-dot" />
          {t("evidenceDashboard.confidenceLabel")}{" "}
          <strong>{t(`riskLevels.${confidence.level}`)}</strong> ({confidence.pct}
          %)
        </div>
      </div>
      <p className="evidence-dashboard-sub">{t("evidenceDashboard.subtitle")}</p>
      <p className="confidence-reason">{confidence.alasan}</p>

      <div className="evidence-dashboard-grid">
        <div className="chart-card evidence-trend-card">
          <h3>{t("evidenceDashboard.trendTitle")}</h3>
          <div className="chart-canvas-wrap chart-canvas-wrap--tall">
            {history.length > 0 ? (
              <Line data={lineData} options={lineOptions} />
            ) : (
              <p className="data-note">{t("evidenceDashboard.noHistory")}</p>
            )}
          </div>
        </div>

        {change && (
          <div className="evidence-change-grid">
            <ChangeCard
              label={t("evidenceDashboard.changeRainfall")}
              change={{
                ...change.curahHujan,
                bulanLaluLabel: change.bulanLalu,
              }}
              unit={t("evidenceDashboard.unitMm")}
            />
            <ChangeCard
              label={t("evidenceDashboard.changeHotspot")}
              change={{ ...change.hotspot, bulanLaluLabel: change.bulanLalu }}
              unit={t("evidenceDashboard.unitPoints")}
            />
            <ChangeCard
              label={t("evidenceDashboard.changeHighRisk")}
              change={{
                ...change.desaTinggi,
                bulanLaluLabel: change.bulanLalu,
              }}
              unit={t("evidenceDashboard.unitDesa")}
            />
            <ChangeCard
              label={t("evidenceDashboard.changeHotspotPressure")}
              change={{
                ...change.hotspotPressure,
                bulanLaluLabel: change.bulanLalu,
              }}
              unit={t("evidenceDashboard.unitPct")}
              invertGood
            />
          </div>
        )}
      </div>
    </div>
  );
}
