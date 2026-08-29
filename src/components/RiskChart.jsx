import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { getRiskLevel, getRiskColor, summarizeRisk } from "../utils/riskLogic";
import { useLanguage } from "../i18n/LanguageContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);
ChartJS.defaults.font.family = "'Comfortaa', sans-serif";

export default function RiskChart({ desaList }) {
  const { t } = useLanguage();
  const sorted = [...desaList].sort(
    (a, b) => b.curah_hujan_mm - a.curah_hujan_mm,
  );

  const barData = {
    labels: sorted.map((d) => d.nama),
    datasets: [
      {
        label: t("riskChart.rainDatasetLabel"),
        data: sorted.map((d) => d.curah_hujan_mm),
        backgroundColor: sorted.map((d) => getRiskColor(getRiskLevel(d))),
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        ticks: { autoSkip: false, maxRotation: 70, minRotation: 70 },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: t("riskChart.yAxisLabel") },
        grid: { color: "#eaf2ff" },
      },
    },
  };

  const summary = summarizeRisk(desaList);
  const doughnutData = {
    labels: [
      t("riskLevels.Tinggi"),
      t("riskLevels.Sedang"),
      t("riskLevels.Rendah"),
    ],
    datasets: [
      {
        data: [summary.Tinggi, summary.Sedang, summary.Rendah],
        backgroundColor: ["#1e40af", "#3b82f6", "#93c5fd"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="chart-grid">
      <div className="chart-card">
        <h3>{t("riskChart.rainPerVillage")}</h3>
        <div className="chart-canvas-wrap chart-canvas-wrap--tall">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <div className="chart-card">
        <h3>{t("riskChart.riskDistribution")}</h3>
        <div className="chart-canvas-wrap">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}
