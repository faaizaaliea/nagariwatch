import { useLanguage } from "../i18n/LanguageContext";

const FILTER_VALUES = ["Semua", "Tinggi", "Sedang", "Rendah"];
const FILTER_KEY = { Semua: "all", Tinggi: "high", Sedang: "medium", Rendah: "low" };

export default function FilterBar({ activeFilter, onChange, counts }) {
  const { t } = useLanguage();
  return (
    <div className="filter-bar">
      <span className="filter-bar-label">{t("filterBar.label")}</span>
      <div className="filter-bar-options">
        {FILTER_VALUES.map((value) => (
          <button
            key={value}
            className={`filter-chip filter-chip--${value.toLowerCase()} ${
              activeFilter === value ? "is-active" : ""
            }`}
            onClick={() => onChange(value)}
          >
            {t(`filterBar.${FILTER_KEY[value]}`)}
            <span className="filter-chip-count">
              {value === "Semua" ? counts.total : (counts[value] ?? 0)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
