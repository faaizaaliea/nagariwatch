import { getRiskColor } from "../utils/riskLogic";
import { useLanguage } from "../i18n/LanguageContext";

const LEVELS = ["Tinggi", "Sedang", "Rendah"];

export default function MapLegend() {
  const { t } = useLanguage();
  return (
    <div className="map-legend">
      <span className="map-legend-title">{t("mapLegend.title")}</span>
      {LEVELS.map((level) => (
        <div className="map-legend-item" key={level}>
          <span
            className="map-legend-dot"
            style={{ background: getRiskColor(level) }}
          />
          <span>
            {t(`filterBar.${{ Tinggi: "high", Sedang: "medium", Rendah: "low" }[level]}`)} (
            {t(`riskLevels.${level}`)})
          </span>
        </div>
      ))}
      <div className="map-legend-item">
        <span className="map-legend-dot" style={{ background: "#f97316" }} />
        <span>{t("mapLegend.hotspot")}</span>
      </div>
    </div>
  );
}
