import { useCallback, useEffect, useState } from "react";
import { fetchRiverLines } from "../utils/overpass";
import { computeRiverDistances } from "../utils/riverDistance";

function mergeRiverIntoDesa(desaList, distanceById) {
  return desaList.map((desa) => {
    const d = distanceById.get(desa.id);
    if (d == null) return desa;
    return { ...desa, jarak_sungai_m: Math.round(d) };
  });
}

export function useRiverDistance(originalDesaList) {
  const [status, setStatus] = useState("idle");
  const [source, setSource] = useState("dummy");
  const [error, setError] = useState("");
  const [desaList, setDesaList] = useState(originalDesaList);
  const [lastUpdated, setLastUpdated] = useState(null);

  const refresh = useCallback(async () => {
    setStatus("loading");
    setError("");
    try {
      const lines = await fetchRiverLines();
      if (!lines.length) {
        throw new Error(
          "Tidak ada data sungai (waterway) ditemukan di OpenStreetMap untuk area ini.",
        );
      }
      const results = computeRiverDistances(originalDesaList, lines);
      const distanceById = new Map(results.map((r) => [r.id, r.distanceM]));
      setDesaList(mergeRiverIntoDesa(originalDesaList, distanceById));
      setSource("osm");
      setStatus("success");
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      setSource("dummy");
      setDesaList(originalDesaList);
      setStatus("error");
    }
  }, [originalDesaList]);

  useEffect(() => {
    refresh();
  }, []);

  return { desaList, status, source, error, lastUpdated, refresh };
}
