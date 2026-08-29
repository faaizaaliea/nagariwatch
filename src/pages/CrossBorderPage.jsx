import { useMemo } from "react";
import { KECAMATAN_LIST } from "../data/kecamatanList";
import {
  summarizeKecamatanRisk,
  getCrossBorderAlerts,
} from "../utils/riskLogic";
import { useLanguage } from "../i18n/LanguageContext";

const DAS_ORDER = { Hulu: 0, Tengah: 1, Hilir: 2 };

export default function CrossBorderPage({ ketambeDesaList }) {
  const { t } = useLanguage();

  const stats = useMemo(() => {
    const list = KECAMATAN_LIST.map((k) => {
      if (k.id === "ketambe") {
        const s = summarizeKecamatanRisk(ketambeDesaList);
        return {
          id: k.id,
          nama: k.nama,
          kabupaten: k.kabupaten,
          provinsi: k.provinsi,
          posisiDas: k.posisiDas,
          hasData: true,
          avgRainfall: s.avgRainfall,
          avgHotspot: s.avgHotspot,
          risiko: s.risiko,
          catatan: t("crossBorderPage.mvpDataNote"),
        };
      }
      const e = k.estimasi ?? {};
      return {
        id: k.id,
        nama: k.nama,
        kabupaten: k.kabupaten,
        provinsi: k.provinsi,
        posisiDas: k.posisiDas,
        hasData: false,
        avgRainfall: e.avgRainfall ?? null,
        avgHotspot: e.avgHotspot ?? null,
        risiko: e.risiko ?? null,
        catatan: t(`crossBorderPage.kecamatanNotes.${k.id}`),
      };
    });
    return list.sort((a, b) => DAS_ORDER[a.posisiDas] - DAS_ORDER[b.posisiDas]);
  }, [ketambeDesaList, t]);

  const alerts = useMemo(() => getCrossBorderAlerts(stats, t), [stats, t]);

  return (
    <div className="page-block">
      <div className="page-heading">
        <h2>
          <img className="icon-inline--lg" src="/folder.png" alt="" />
          {t("crossBorderPage.title")}
        </h2>
        <p>{t("crossBorderPage.subtitle")}</p>
      </div>

      {alerts.length > 0 && (
        <div className="alert-banner" role="alert">
          <img className="alert-banner-icon" src="/warning.png" alt="" />
          <div className="alert-banner-body">
            <strong>{t("crossBorderPage.alertTitle")}</strong>
            {alerts.map((a, i) => (
              <p key={i} className="alert-banner-detail">
                {t("crossBorderPage.alertLine", {
                  msg: a.pesan,
                  list: a.ke.join(", "),
                })}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="das-flow">
        {stats.map((k, i) => (
          <div className="das-flow-item" key={k.id}>
            <div
              className={`das-card ${!k.hasData ? "das-card--estimasi" : ""}`}
            >
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
              <p className="das-card-sub">
                {k.kabupaten}, {k.provinsi}
              </p>

              <div className="das-card-stats">
                <div>
                  <span className="peta-detail-label">
                    {t("crossBorderPage.rainLabel")}
                  </span>
                  <span className="peta-detail-value">
                    {k.avgRainfall != null ? `${k.avgRainfall} mm` : "-"}
                  </span>
                </div>
                <div>
                  <span className="peta-detail-label">
                    {t("crossBorderPage.hotspotLabel")}
                  </span>
                  <span className="peta-detail-value">
                    {k.avgHotspot != null
                      ? `${k.avgHotspot}${t("crossBorderPage.perDesa")}`
                      : "-"}
                  </span>
                </div>
              </div>

              <p className="das-card-note">
                {!k.hasData && (
                  <span className="badge badge--muted das-estimasi-badge">
                    {t("crossBorderPage.estimasiBadge")}
                  </span>
                )}{" "}
                {k.catatan}
              </p>
            </div>

            {i < stats.length - 1 && <span className="das-flow-arrow">→</span>}
          </div>
        ))}
      </div>

      <p className="data-note">{t("crossBorderPage.footerNote")}</p>
    </div>
  );
}
