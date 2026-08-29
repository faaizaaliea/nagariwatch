import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { KECAMATAN_LIST } from "../data/kecamatanList";
import { useLanguage } from "../i18n/LanguageContext";

const MAP_CENTER = { lat: 3.33, lng: 97.77 };

export default function DistrictSelectPage({ onSelect }) {
  const { t } = useLanguage();
  return (
    <div className="district-select">
      <div className="district-select-intro">
        <span className="eyebrow">{t("districtSelect.eyebrow")}</span>
        <h1>{t("districtSelect.title")}</h1>
        <p>
          {(() => {
            const [before, after] = t("districtSelect.intro").split(
              "{{highlight}}",
            );
            return (
              <>
                {before}
                <strong>{t("districtSelect.introHighlight")}</strong>
                {after}
              </>
            );
          })()}
        </p>
      </div>

      <div className="district-select-map">
        <MapContainer
          center={[MAP_CENTER.lat, MAP_CENTER.lng]}
          zoom={9}
          scrollWheelZoom={true}
          style={{ height: "380px", width: "100%", borderRadius: "16px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {KECAMATAN_LIST.map((k) => (
            <CircleMarker
              key={k.id}
              center={[k.lat, k.lng]}
              radius={k.hasData ? 14 : 9}
              pathOptions={{
                color: "#ffffff",
                weight: 2,
                fillColor: k.hasData ? "#2f6fed" : "#a4b1cc",
                fillOpacity: k.hasData ? 0.95 : 0.55,
              }}
              eventHandlers={{ click: () => onSelect(k) }}
            >
              <Tooltip direction="top" offset={[0, -6]} permanent>
                {k.nama}
                {!k.hasData && t("districtSelect.noDataTag")}
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="district-select-list">
        {KECAMATAN_LIST.map((k) => (
          <button
            key={k.id}
            className={`district-card ${
              k.hasData ? "district-card--active" : "district-card--muted"
            }`}
            onClick={() => onSelect(k)}
          >
            <span className="district-card-name">
              <span className="district-card-title">
                <img className="icon-inline--sm" src="/location.png" alt="" />
                {k.nama}
              </span>
              <span className="district-card-sub">
                {t("districtSelect.kabPrefix")} {k.kabupaten}, {k.provinsi}
              </span>
            </span>
            <span
              className={`badge ${k.hasData ? "badge--tinggi" : "badge--muted"}`}
            >
              {k.hasData
                ? t("districtSelect.dataAvailable")
                : t("districtSelect.noDataAvailable")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
