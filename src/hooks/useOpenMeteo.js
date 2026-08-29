import { useCallback, useEffect, useState } from "react";
import { fetchRainfallAndElevation } from "../utils/openMeteo";

function mergeWeatherIntoDesa(desaList, weatherById) {
  return desaList.map((desa) => {
    const w = weatherById.get(desa.id);
    if (!w) return desa;
    return {
      ...desa,
      curah_hujan_mm: w.rainfallMm ?? desa.curah_hujan_mm,
      elevasi_mdpl: w.elevation ?? desa.elevasi_mdpl,
    };
  });
}

export function useOpenMeteo(originalDesaList) {
  const [status, setStatus] = useState("idle");
  const [source, setSource] = useState("dummy");
  const [error, setError] = useState("");
  const [desaList, setDesaList] = useState(originalDesaList);
  const [lastUpdated, setLastUpdated] = useState(null);

  const refresh = useCallback(async () => {
    setStatus("loading");
    setError("");
    try {
      const results = await fetchRainfallAndElevation(originalDesaList);
      const weatherById = new Map(results.map((r) => [r.id, r]));
      setDesaList(mergeWeatherIntoDesa(originalDesaList, weatherById));
      setSource("open-meteo");
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
