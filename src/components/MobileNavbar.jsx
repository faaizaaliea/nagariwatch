import { useLanguage } from "../i18n/LanguageContext";

export default function MobileNavbar({ onOpenSidebar }) {
  const { t } = useLanguage();

  return (
    <header className="mobile-navbar">
      <button
        type="button"
        className="mobile-navbar-hamburger"
        onClick={onOpenSidebar}
        aria-label={t("sidebar.openMenu")}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>
      <span className="mobile-navbar-brand">Nagari Watch</span>
    </header>
  );
}
