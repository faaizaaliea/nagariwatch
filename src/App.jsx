import { useState } from "react";
import rawDesaData from "./data/desaKetambe.json";
import Sidebar from "./components/Sidebar";
import MobileNavbar from "./components/MobileNavbar";
import PetaPage from "./pages/PetaPage";
import CommunityReportPage from "./pages/CommunityReportPage";
import MonthlyReportPage from "./pages/MonthlyReportPage";
import DistrictSelectPage from "./pages/DistrictSelectPage";
import NoDataPage from "./pages/NoDataPage";
import CrossBorderPage from "./pages/CrossBorderPage";
import DashboardPage from "./pages/DashboardPage";
import MetodologiPage from "./pages/MetodologiPage";
import EarlyWarningBanner from "./components/EarlyWarningBanner";
import LoggedOutScreen from "./components/LoggedOutScreen";
import FirmsStatusPanel from "./components/FirmsStatusPanel";
import SourceStatusPanel from "./components/SourceStatusPanel";
import SimulatedDataBanner from "./components/SimulatedDataBanner";
import DemoScenarioModal from "./components/DemoScenarioModal";
import { useFirmsHotspots } from "./hooks/useFirmsHotspots";
import { useOpenMeteo } from "./hooks/useOpenMeteo";
import { useRiverDistance } from "./hooks/useRiverDistance";
import { useDemoScenario } from "./hooks/useDemoScenario";
import { useLanguage } from "./i18n/LanguageContext";

export default function App() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(true);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);
  const [communityReports, setCommunityReports] = useState([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const demo = useDemoScenario();

  function handleAddCommunityReport(report) {
    setCommunityReports((prev) => [report, ...prev]);
  }

  function handleUpdateReportStatus(id, status) {
    setCommunityReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
  }

  function handleNavigate(tab) {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  }

  function handleLogout() {
    setLoggedIn(false);
    setMobileSidebarOpen(false);
  }

  function handleStartDemo() {
    demo.start();
    setMobileSidebarOpen(false);
  }

  const {
    desaList: liveDesaList,
    hotspotPoints,
    status: firmsStatus,
    source: firmsSource,
    error: firmsError,
    lastUpdated: firmsLastUpdated,
    mapKey: firmsMapKey,
    saveMapKey: saveFirmsMapKey,
    refresh: refreshFirms,
  } = useFirmsHotspots(rawDesaData.desa);

  const {
    status: meteoStatus,
    source: meteoSource,
    error: meteoError,
    lastUpdated: meteoLastUpdated,
    desaList: meteoDesaList,
    refresh: refreshMeteo,
  } = useOpenMeteo(rawDesaData.desa);

  const {
    status: riverStatus,
    source: riverSource,
    error: riverError,
    lastUpdated: riverLastUpdated,
    desaList: riverDesaList,
    refresh: refreshRiver,
  } = useRiverDistance(rawDesaData.desa);

  // Data ini SELALU data live/dummy asli — Demo Mode (lihat DemoScenarioModal)
  // tidak pernah menyentuh state ini sama sekali, sengaja dipisah biar jelas
  // beda antara "lagi lihat demo" vs "lagi lihat data sungguhan".
  const desaData = {
    ...rawDesaData,
    desa: rawDesaData.desa.map((raw, i) => ({
      ...raw,
      titik_panas_5hari: liveDesaList[i].titik_panas_5hari,
      titik_panas_detail: liveDesaList[i].titik_panas_detail,
      curah_hujan_mm: meteoDesaList[i].curah_hujan_mm,
      elevasi_mdpl: meteoDesaList[i].elevasi_mdpl,
      jarak_sungai_m: riverDesaList[i].jarak_sungai_m,
    })),
  };

  if (!loggedIn) {
    return (
      <div className="app-shell app-shell--centered">
        <LoggedOutScreen onLoginAgain={() => setLoggedIn(true)} />
      </div>
    );
  }

  if (!selectedKecamatan) {
    return (
      <div className="app-shell app-shell--centered app-shell--district">
        <DistrictSelectPage onSelect={setSelectedKecamatan} />
      </div>
    );
  }

  const hasData = selectedKecamatan.hasData;

  function handleChangeKecamatan() {
    setSelectedKecamatan(null);
    setActiveTab("dashboard");
    setMobileSidebarOpen(false);
  }

  return (
    <div className="app-shell app-shell--with-sidebar">
      <MobileNavbar onOpenSidebar={() => setMobileSidebarOpen(true)} />

      {mobileSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        desaList={hasData ? desaData.desa : []}
        onLogout={handleLogout}
        kecamatan={selectedKecamatan}
        onChangeKecamatan={handleChangeKecamatan}
        onStartDemo={hasData ? handleStartDemo : undefined}
        demoActive={demo.active}
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="app-content">
        <header className="app-header app-header--compact">
          <div className="app-header-text">
            <span className="eyebrow">
              {t("appShell.eyebrow", { name: selectedKecamatan.nama })}
              {hasData ? t("appShell.mvpTag") : t("appShell.comingSoonTag")}
            </span>
            <h1>{t(`appShell.pageTitles.${activeTab}`)}</h1>
            <p>
              {t("appShell.subtitle", {
                kab: selectedKecamatan.kabupaten,
                prov: selectedKecamatan.provinsi,
              })}
            </p>
          </div>
        </header>

        {hasData && activeTab !== "metodologi" && (
          <FirmsStatusPanel
            status={firmsStatus}
            source={firmsSource}
            error={firmsError}
            lastUpdated={firmsLastUpdated}
            mapKey={firmsMapKey}
            onSaveMapKey={saveFirmsMapKey}
            onRetry={() => refreshFirms()}
          />
        )}

        {hasData && activeTab !== "metodologi" && (
          <SourceStatusPanel
            status={meteoStatus}
            source={meteoSource}
            error={meteoError}
            lastUpdated={meteoLastUpdated}
            onRetry={() => refreshMeteo()}
            sourceLabels={{
              "open-meteo": { textKey: "meteoPanel.sourceLive", tone: "ok" },
              dummy: { textKey: "meteoPanel.sourceDummy", tone: "muted" },
            }}
            prefixKey="meteoPanel.sourcePrefix"
            fetchingKey="meteoPanel.fetching"
            updatedKey="meteoPanel.updated"
            errorFallbackKey="meteoPanel.errorFallback"
            retryKey="meteoPanel.retry"
          />
        )}

        {hasData && activeTab !== "metodologi" && (
          <SourceStatusPanel
            status={riverStatus}
            source={riverSource}
            error={riverError}
            lastUpdated={riverLastUpdated}
            onRetry={() => refreshRiver()}
            sourceLabels={{
              osm: { textKey: "riverPanel.sourceLive", tone: "ok" },
              dummy: { textKey: "riverPanel.sourceDummy", tone: "muted" },
            }}
            prefixKey="riverPanel.sourcePrefix"
            fetchingKey="riverPanel.fetching"
            updatedKey="riverPanel.updated"
            errorFallbackKey="riverPanel.errorFallback"
            retryKey="riverPanel.retry"
          />
        )}

        {hasData && activeTab !== "metodologi" && (
          <SimulatedDataBanner
            firmsSource={firmsSource}
            meteoSource={meteoSource}
            riverSource={riverSource}
            onOpenMetodologi={() => setActiveTab("metodologi")}
          />
        )}

        {hasData && activeTab !== "metodologi" && (
          <EarlyWarningBanner
            desaList={desaData.desa}
            kecamatanName={selectedKecamatan?.nama}
          />
        )}

        <main className="app-main app-main--full">
          {activeTab === "metodologi" ? (
            <MetodologiPage />
          ) : activeTab === "lintas" ? (
            <CrossBorderPage ketambeDesaList={desaData.desa} />
          ) : !hasData ? (
            <NoDataPage
              kecamatan={selectedKecamatan}
              onBack={handleChangeKecamatan}
            />
          ) : (
            <>
              {activeTab === "dashboard" && (
                <DashboardPage
                  desaList={desaData.desa}
                  firmsSource={firmsSource}
                  reports={communityReports}
                  kecamatan={selectedKecamatan}
                />
              )}
              {activeTab === "peta" && (
                <PetaPage
                  desaData={desaData}
                  hotspotPoints={hotspotPoints}
                  reports={communityReports}
                />
              )}
              {activeTab === "laporan" && (
                <CommunityReportPage
                  desaList={desaData.desa}
                  reports={communityReports}
                  onAddReport={handleAddCommunityReport}
                  onUpdateStatus={handleUpdateReportStatus}
                />
              )}
              {activeTab === "bulanan" && (
                <MonthlyReportPage
                  kecamatan={selectedKecamatan}
                  desaList={desaData.desa}
                />
              )}
            </>
          )}
        </main>
      </div>

      <DemoScenarioModal
        open={demo.active}
        desaList={desaData.desa}
        stepIndex={demo.stepIndex}
        isFirstStep={demo.isFirstStep}
        isLastStep={demo.isLastStep}
        onNext={demo.goNext}
        onPrev={demo.goPrev}
        onClose={demo.exit}
      />
    </div>
  );
}
