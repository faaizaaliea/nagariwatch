import { useCallback, useEffect, useState } from "react";
import { fetchFirmsHotspots } from "../utils/firms";
import { distanceMeters } from "../utils/geo";
import {
  getStoredMapKey,
  setStoredMapKey,
  HOTSPOT_MATCH_RADIUS_M,
} from "../config/firmsConfig";

function mergeHotspotsIntoDesa(desaList, hotspotPoints) {
  return desaList.map((desa) => {
    const matched = hotspotPoints
      .map((p) => ({
        ...p,
        jarak_m: Math.round(distanceMeters(desa.lat, desa.lng, p.lat, p.lng)),
      }))
      .filter((p) => p.jarak_m <= HOTSPOT_MATCH_RADIUS_M)
      .sort((a, b) => a.jarak_m - b.jarak_m);

    return {
      ...desa,
      titik_panas_5hari: matched.length,
      titik_panas_detail: matched,
    };
  });
}

export function useFirmsHotspots(originalDesaList) {
  const [mapKey, setMapKey] = useState(() => getStoredMapKey());
  const [status, setStatus] = useState("idle");
  const [source, setSource] = useState("dummy");
  const [error, setError] = useState("");
  const [desaList, setDesaList] = useState(originalDesaList);
  const [hotspotPoints, setHotspotPoints] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const refresh = useCallback(
    async (keyOverride) => {
      const key = keyOverride ?? mapKey;
      if (!key) {
        setStatus("idle");
        setSource("dummy");
        setDesaList(originalDesaList);
        setHotspotPoints([]);
        return;
      }

      setStatus("loading");
      setError("");
      try {
        const { points, source: src } = await fetchFirmsHotspots(key);
        setDesaList(mergeHotspotsIntoDesa(originalDesaList, points));
        setHotspotPoints(points);
        setSource(src);
        setStatus("success");
        setLastUpdated(new Date());
      } catch (err) {
        setError(err.message);
        setSource("dummy");
        setDesaList(originalDesaList);
        setHotspotPoints([]);
        setStatus("error");
      }
    },
    [mapKey, originalDesaList],
  );

  useEffect(() => {
    refresh();
  }, []);

  function saveMapKey(newKey) {
    setMapKey(newKey);
    setStoredMapKey(newKey);
    refresh(newKey);
  }

  return {
    desaList,
    hotspotPoints,
    status,
    source,
    error,
    lastUpdated,
    mapKey,
    saveMapKey,
    refresh,
  };
}
