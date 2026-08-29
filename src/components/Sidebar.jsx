import { useEffect, useState } from "react";
import userProfile, { maskNik } from "../data/userProfile";
import { findNearestDesa } from "../utils/geo";
import CustomSelect from "./CustomSelect";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../i18n/LanguageContext";

const COVERAGE_RADIUS_M = 50000; // 50 km

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <rect x="3" y="12" width="4" height="8" />
      <rect x="10" y="7" width="4" height="13" />
      <rect x="17" y="3" width="4" height="17" />
    </svg>
  );
}

const NAV_ITEMS = [
  { key: "dashboard", icon: "/chart.png" },
  { key: "peta", icon: "/map.png" },
  { key: "laporan", icon: "/megaphone.png" },
  { key: "bulanan", icon: "/calendar.png" },
  { key: "lintas", icon: "/folder.png" },
  { key: "metodologi", icon: "/methods.png" },
];

function initialsOf(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Sidebar({
  activeTab,
  onNavigate,
  desaList,
  onLogout,
  kecamatan,
  onChangeKecamatan,
  onStartDemo,
  demoActive = false,
  open = false,
  onClose,
}) {
  const { t } = useLanguage();
  const [role, setRole] = useState(userProfile.roleDefault);
  const [locationState, setLocationState] = useState({
    status: "idle",
    label: "",
  });

  function detectLocation() {
    if (!navigator.geolocation) {
      setLocationState({
        status: "unsupported",
        label: t("sidebar.notSupported"),
      });
      return;
    }
    setLocationState({ status: "loading", label: "" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const nearest = findNearestDesa(latitude, longitude, desaList);
        if (nearest && nearest.distanceM <= COVERAGE_RADIUS_M) {
          const km = (nearest.distanceM / 1000).toFixed(1);
          setLocationState({
            status: "done",
            label: t("sidebar.nearLabel", { name: nearest.desa.nama, km }),
          });
        } else if (nearest) {
          const km = Math.round(nearest.distanceM / 1000);
          setLocationState({
            status: "outOfCoverage",
            label: t("sidebar.outOfCoverage", { km }),
          });
        } else {
          setLocationState({ status: "done", label: t("sidebar.detected") });
        }
      },
      () => setLocationState({ status: "denied", label: "" }),
      { timeout: 8000 },
    );
  }

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <button
        type="button"
        className="sidebar-close"
        onClick={onClose}
        aria-label={t("sidebar.closeMenu")}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </svg>
      </button>

      <div className="sidebar-profile-card">
        <div className="sidebar-avatar">{initialsOf(userProfile.nama)}</div>
        <span className="sidebar-name">{userProfile.nama}</span>
        <span className="sidebar-nik">NIK: {maskNik(userProfile.nik)}</span>

        <div className="sidebar-info-list">
          <div className="sidebar-info-row">
            <span className="sidebar-info-label">
              <img className="icon-inline--sm" src="/location.png" alt="" />
              {t("sidebar.kecamatanLabel")}
            </span>
            <span className="sidebar-info-value">{kecamatan?.nama ?? "-"}</span>
          </div>

          <div className="sidebar-info-row">
            <span className="sidebar-info-label">
              <img className="icon-inline--sm" src="/radar.png" alt="" />
              {t("sidebar.currentLocation")}
            </span>
            <span className="sidebar-info-value">
              {locationState.status === "loading" && t("sidebar.locating")}
              {locationState.status === "done" && locationState.label}
              {locationState.status === "outOfCoverage" && (
                <span
                  className="sidebar-info-value--muted"
                  title={t("sidebar.outOfCoverageHint")}
                >
                  {locationState.label}
                </span>
              )}
              {locationState.status === "denied" && (
                <button className="sidebar-retry" onClick={detectLocation}>
                  {t("sidebar.permissionDeniedRetry")}
                </button>
              )}
              {locationState.status === "unsupported" &&
                t("sidebar.notSupported")}
              {locationState.status === "idle" && t("sidebar.idle")}
            </span>
          </div>

          <div className="sidebar-info-row">
            <span className="sidebar-info-label">
              <img className="icon-inline--sm" src="/radar.png" alt="" />
              {t("sidebar.alertRadiusLabel")}
            </span>
            <span
              className="sidebar-info-value"
              title={t("sidebar.alertRadiusHint")}
            >
              {t("sidebar.alertRadiusValue", {
                km: userProfile.radiusKm,
                desa: userProfile.homeDesa,
              })}
            </span>
          </div>

          <div className="sidebar-info-row sidebar-info-row--role">
            <span className="sidebar-info-label">
              <img className="icon-inline--sm" src="/people.png" alt="" />
              {t("sidebar.role")}
            </span>
            <CustomSelect
              inline
              value={role}
              onChange={setRole}
              options={userProfile.roleOptions.map((opt) => ({
                value: opt,
                label: t(`sidebar.roleOptions.${opt}`),
              }))}
            />
          </div>
        </div>
      </div>

      <button className="sidebar-change-district" onClick={onChangeKecamatan}>
        <img className="btn-icon" src="/switch.png" alt="" />
        {t("sidebar.changeDistrict")}
      </button>

      {onStartDemo && (
        <button
          className="sidebar-demo-btn"
          onClick={onStartDemo}
          disabled={demoActive}
        >
          {t("sidebar.demoButton")}
        </button>
      )}

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`sidebar-nav-item ${
              activeTab === item.key ? "is-active" : ""
            }`}
            onClick={() => onNavigate(item.key)}
          >
            <span className="sidebar-nav-icon">
              {item.icon ? <img src={item.icon} alt="" /> : <DashboardIcon />}
            </span>
            {t(`sidebar.nav.${item.key}`)}
          </button>
        ))}
      </nav>

      <div className="sidebar-lang-row">
        <LanguageToggle />
      </div>

      <button className="sidebar-logout" onClick={onLogout}>
        <img className="btn-icon" src="/logout.png" alt="" />
        {t("sidebar.logout")}
      </button>
    </aside>
  );
}
