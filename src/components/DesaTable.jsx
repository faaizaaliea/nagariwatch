import { useState } from "react";
import { getRiskLevel, getHotspotLevel } from "../utils/riskLogic";
import HotspotDetailModal from "./HotspotDetailModal";
import RiskExplanationModal from "./RiskExplanationModal";
import { useLanguage } from "../i18n/LanguageContext";

export default function DesaTable({ desaList, filter = "Semua", reports = [] }) {
  const { t } = useLanguage();
  const [detailDesa, setDetailDesa] = useState(null);
  const [riskDesa, setRiskDesa] = useState(null);

  const filtered =
    filter === "Semua"
      ? desaList
      : desaList.filter((desa) => getRiskLevel(desa) === filter);

  const sorted = [...filtered].sort((a, b) => {
    const order = { Tinggi: 0, Sedang: 1, Rendah: 2 };
    return order[getRiskLevel(a)] - order[getRiskLevel(b)];
  });

  return (
    <div className="table-card">
      <h3>
        {filter !== "Semua"
          ? t("desaTable.titleWithFilter", { filter: t(`riskLevels.${filter}`) })
          : t("desaTable.title")}
      </h3>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{t("desaTable.colDesa")}</th>
              <th>{t("desaTable.colRain")}</th>
              <th>{t("desaTable.colRiver")}</th>
              <th>{t("desaTable.colElevation")}</th>
              <th>{t("desaTable.colHotspot")}</th>
              <th>{t("desaTable.colRisk")}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="table-empty">
                  {t("desaTable.empty", { filter: t(`riskLevels.${filter}`) })}
                </td>
              </tr>
            )}
            {sorted.map((desa) => {
              const risk = getRiskLevel(desa);
              const hotspot = getHotspotLevel(desa);
              return (
                <tr key={desa.id}>
                  <td>{desa.nama}</td>
                  <td>{desa.curah_hujan_mm} mm</td>
                  <td>{desa.jarak_sungai_m} m</td>
                  <td>{desa.elevasi_mdpl} mdpl</td>
                  <td>
                    <button
                      type="button"
                      className={`badge badge--${hotspot.toLowerCase()} badge--clickable`}
                      data-tooltip={t("desaTable.hotspotTooltip")}
                      onClick={() => setDetailDesa(desa)}
                    >
                      {desa.titik_panas_5hari ?? 0} {t("desaTable.pointsUnit")}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`badge badge--${risk.toLowerCase()} badge--clickable`}
                      data-tooltip={t("desaTable.riskTooltip")}
                      onClick={() => setRiskDesa(desa)}
                    >
                      {t(`riskLevels.${risk}`)}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <HotspotDetailModal
        desa={detailDesa}
        onClose={() => setDetailDesa(null)}
      />
      <RiskExplanationModal
        desa={riskDesa}
        reports={reports}
        onClose={() => setRiskDesa(null)}
      />
    </div>
  );
}
