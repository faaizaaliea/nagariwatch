import { useLanguage } from "../i18n/LanguageContext";

const FIRMS_LIVE_SOURCES = ["firms-direct", "firms-own-proxy", "firms-proxy"];

export default function SimulatedDataBanner({
  firmsSource = "dummy",
  meteoSource = "dummy",
  riverSource = "dummy",
  onOpenMetodologi,
}) {
  const { t } = useLanguage();

  const items = [
    { label: t("simBanner.itemHotspot"), live: FIRMS_LIVE_SOURCES.includes(firmsSource) },
    { label: t("simBanner.itemRainfall"), live: meteoSource === "open-meteo" },
    { label: t("simBanner.itemRiver"), live: riverSource === "osm" },
  ];

  return (
    <div className="sim-data-banner" role="note">
      <span className="sim-data-banner-icon" src="/warning.png"></span>
      <div>
        <strong>{t("simBanner.label")}</strong> {t("simBanner.intro")}{" "}
        {items.map((item, i) => (
          <span key={item.label}>
            {item.label}:{" "}
            <strong>
              {item.live ? t("simBanner.live") : t("simBanner.dummyLabel")}
            </strong>
            {i < items.length - 1 ? ", " : "; "}
          </span>
        ))}
        {t("simBanner.itemHousehold")}:{" "}
        <strong>{t("simBanner.dummyLabel")}</strong> (
        {t("simBanner.householdNote")}). {t("simBanner.warning")}{" "}
        {onOpenMetodologi && (
          <button
            type="button"
            className="sim-data-banner-link"
            onClick={onOpenMetodologi}
          >
            {t("simBanner.linkText")}
          </button>
        )}
      </div>
    </div>
  );
}
