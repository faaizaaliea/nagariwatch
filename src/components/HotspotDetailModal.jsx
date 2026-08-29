import { useLanguage } from "../i18n/LanguageContext";

export default function HotspotDetailModal({ desa, onClose }) {
  const { t } = useLanguage();
  if (!desa) return null;

  const points = desa.titik_panas_detail ?? [];

  function formatWaktu(acqDate, acqTime) {
    if (!acqDate) return "-";
    const jam = acqTime
      ? `${String(acqTime).padStart(4, "0").slice(0, 2)}:${String(acqTime)
          .padStart(4, "0")
          .slice(2)}`
      : null;
    return jam ? `${acqDate} · ${jam} UTC` : acqDate;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-card-body">
        <div className="modal-header">
          <h3>{t("hotspotModal.title", { name: desa.nama })}</h3>
          <button className="modal-close" onClick={onClose} aria-label={t("hotspotModal.close")}>
            ✕
          </button>
        </div>

        <p className="modal-subtitle">
          {points.length > 0
            ? t("hotspotModal.subtitleWithPoints", {
                count: points.length,
                radius: (
                  points.reduce((max, p) => Math.max(max, p.jarak_m), 0) / 1000
                ).toFixed(1),
              })
            : t("hotspotModal.subtitleEmpty")}
        </p>

        {points.length > 0 && (
          <div className="table-scroll">
            <table className="modal-table">
              <thead>
                <tr>
                  <th>{t("hotspotModal.colDateTime")}</th>
                  <th>{t("hotspotModal.colDistance")}</th>
                  <th>{t("hotspotModal.colConfidence")}</th>
                  <th>{t("hotspotModal.colFrp")}</th>
                </tr>
              </thead>
              <tbody>
                {points.map((p, i) => (
                  <tr key={`${p.lat}-${p.lng}-${i}`}>
                    <td>{formatWaktu(p.acqDate, p.acqTime)}</td>
                    <td>{(p.jarak_m / 1000).toFixed(1)} km</td>
                    <td>{p.confidence ?? "-"}</td>
                    <td>{Number.isFinite(p.frp) ? p.frp.toFixed(1) : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="modal-note">{t("hotspotModal.sourceNote")}</p>
        </div>
      </div>
    </div>
  );
}
