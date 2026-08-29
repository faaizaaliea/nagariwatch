import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Popup,
  LayersControl,
} from "react-leaflet";
import { getRiskLevel, getRiskColor } from "../utils/riskLogic";
import MapLegend from "./MapLegend";
import { useLanguage } from "../i18n/LanguageContext";

const LEUSER_GEOJSON_URL =
  "https://services2.arcgis.com/g8WusZB13b9OegfU/arcgis/rest/services/Indonesia_Leuser_Ecosystem/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

const leuserBoundaryStyle = {
  color: "#1e40af",
  weight: 1.5,
  fillColor: "#3b82f6",
  fillOpacity: 0.06,
  dashArray: "4 3",
};

export default function MapView({
  desaList,
  center,
  filter = "Semua",
  hotspotPoints = [],
}) {
  const { t } = useLanguage();
  const [leuserBoundary, setLeuserBoundary] = useState(null);
  const [boundaryError, setBoundaryError] = useState(null);

  const filteredDesa =
    filter === "Semua"
      ? desaList
      : desaList.filter((desa) => getRiskLevel(desa) === filter);

  useEffect(() => {
    let cancelled = false;
    fetch(LEUSER_GEOJSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setLeuserBoundary(data);
      })
      .catch((err) => {
        if (!cancelled) setBoundaryError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", borderRadius: "16px" }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name={t("mapLegend.layerBase")}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name={t("mapLegend.layerSatellite")}>
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>

          {leuserBoundary && (
            <LayersControl.Overlay checked name={t("mapLegend.layerBoundary")}>
              <GeoJSON data={leuserBoundary} style={leuserBoundaryStyle} />
            </LayersControl.Overlay>
          )}
        </LayersControl>

        {filteredDesa.map((desa) => {
          const risk = getRiskLevel(desa);
          return (
            <CircleMarker
              key={desa.id}
              center={[desa.lat, desa.lng]}
              radius={9}
              pathOptions={{
                color: "#ffffff",
                weight: 1.5,
                fillColor: getRiskColor(risk),
                fillOpacity: 0.9,
              }}
            >
              <Popup>
                <strong>{desa.nama}</strong>
                <br />
                {t("mapPopup.floodRisk")}: <strong>{t(`riskLevels.${risk}`)}</strong>
                <br />
                {t("mapPopup.rainfall")}: {desa.curah_hujan_mm} mm/hari
                <br />
                {t("mapPopup.riverDistance")}: {desa.jarak_sungai_m} m
                <br />
                {t("mapPopup.elevation")}: {desa.elevasi_mdpl} mdpl
              </Popup>
            </CircleMarker>
          );
        })}

        {hotspotPoints.map((p, i) => (
          <CircleMarker
            key={`hotspot-${p.lat}-${p.lng}-${i}`}
            center={[p.lat, p.lng]}
            radius={6}
            pathOptions={{
              color: "#7c2d12",
              weight: 1,
              fillColor: "#f97316",
              fillOpacity: 0.85,
            }}
          >
            <Popup>
              <strong>{t("mapPopup.hotspotTitle")}</strong>
              <br />
              {t("mapPopup.detected")}: {p.acqDate}
              {p.acqTime ? ` ${String(p.acqTime).padStart(4, "0")} UTC` : ""}
              <br />
              {t("mapPopup.confidence")}: {p.confidence ?? "-"}
              <br />
              FRP: {Number.isFinite(p.frp) ? `${p.frp.toFixed(1)} MW` : "-"}
            </Popup>
          </CircleMarker>
        ))}

        {boundaryError && (
          <div className="map-error-note">
            {t("mapLegend.boundaryError", { error: boundaryError })}
          </div>
        )}
      </MapContainer>
      <MapLegend />
    </>
  );
}
