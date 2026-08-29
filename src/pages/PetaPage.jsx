import { useMemo, useState } from "react";
import MapView from "../components/MapView";
import SummaryCards from "../components/SummaryCards";
import RiskChart from "../components/RiskChart";
import DesaTable from "../components/DesaTable";
import FilterBar from "../components/FilterBar";
import { searchDesaByName } from "../utils/geo";
import { getRiskLevel, summarizeRisk } from "../utils/riskLogic";
import { useLanguage } from "../i18n/LanguageContext";

export default function PetaPage({ desaData, hotspotPoints = [], reports = [] }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedDesa, setSelectedDesa] = useState(null);
  const [searched, setSearched] = useState(false);
  const [filter, setFilter] = useState("Semua");

  const desaList = desaData.desa;

  const suggestions = useMemo(
    () => (query.trim().length >= 1 ? searchDesaByName(query, desaList) : []),
    [query, desaList],
  );

  const riskCounts = useMemo(() => {
    const summary = summarizeRisk(desaList);
    return { ...summary, total: desaList.length };
  }, [desaList]);

  function handleSelectDesa(desa) {
    setSelectedDesa(desa);
    setQuery(desa.nama);
    setSearched(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelectDesa(suggestions[0]);
    }
  }

  function resetSearch() {
    setSearched(false);
    setSelectedDesa(null);
    setQuery("");
  }

  if (!searched) {
    return (
      <div className="peta-search-gate">
        <div className="peta-search-card">
          <img className="peta-search-icon" src="/search.png" />
          <h2>{t("petaPage.searchTitle")}</h2>
          <p>{t("petaPage.searchIntro", { kec: desaData.kecamatan })}</p>

          <form onSubmit={handleSubmit} className="peta-search-form">
            <input
              type="text"
              placeholder={t("petaPage.searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" disabled={suggestions.length === 0}>
              {t("petaPage.searchButton")}
            </button>
          </form>

          {query.trim() && (
            <div className="peta-search-suggestions">
              {suggestions.length === 0 && (
                <p className="peta-search-empty">
                  {t("petaPage.notFound", { query })}
                </p>
              )}
              {suggestions.slice(0, 6).map((desa) => (
                <button
                  key={desa.id}
                  className="peta-search-suggestion"
                  onClick={() => handleSelectDesa(desa)}
                >
                  <span>{desa.nama}</span>
                  <span
                    className={`badge badge--${getRiskLevel(
                      desa,
                    ).toLowerCase()}`}
                  >
                    {t(`riskLevels.${getRiskLevel(desa)}`)}
                  </span>
                </button>
              ))}
            </div>
          )}

          <button
            className="peta-search-skip"
            onClick={() => setSearched(true)}
          >
            {t("petaPage.viewAll")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="peta-page">
      <div className="peta-page-toolbar">
        <button className="peta-back-btn" onClick={resetSearch}>
          {t("petaPage.changeLocation")}
        </button>
        {selectedDesa && (
          <div className="peta-selected-chip">
            <img className="icon-inline--sm" src="/location.png" alt="" />
            {selectedDesa.nama}
            <span
              className={`badge badge--${getRiskLevel(
                selectedDesa,
              ).toLowerCase()}`}
            >
              {t(`riskLevels.${getRiskLevel(selectedDesa)}`)}
            </span>
          </div>
        )}
      </div>

      {selectedDesa && (
        <div className="peta-detail-card">
          <div>
            <span className="peta-detail-label">{t("petaPage.rainLabel")}</span>
            <span className="peta-detail-value">
              {selectedDesa.curah_hujan_mm} {t("petaPage.rainUnit")}
            </span>
          </div>
          <div>
            <span className="peta-detail-label">{t("petaPage.riverLabel")}</span>
            <span className="peta-detail-value">
              {selectedDesa.jarak_sungai_m} {t("petaPage.riverUnit")}
            </span>
          </div>
          <div>
            <span className="peta-detail-label">{t("petaPage.elevationLabel")}</span>
            <span className="peta-detail-value">
              {selectedDesa.elevasi_mdpl} {t("petaPage.elevationUnit")}
            </span>
          </div>
          <div>
            <span className="peta-detail-label">{t("petaPage.householdLabel")}</span>
            <span className="peta-detail-value">
              {selectedDesa.jumlah_rumah_tangga}
            </span>
          </div>
        </div>
      )}

      <SummaryCards desaList={desaList} />

      <FilterBar
        activeFilter={filter}
        onChange={setFilter}
        counts={riskCounts}
      />

      <section className="map-section">
        <MapView
          desaList={desaList}
          center={selectedDesa ?? desaData.pusat_koordinat}
          filter={filter}
          hotspotPoints={hotspotPoints}
        />
      </section>

      <RiskChart desaList={desaList} />

      <DesaTable desaList={desaList} filter={filter} reports={reports} />

      <p className="data-note">{t("petaPage.dataNote")}</p>
    </div>
  );
}
