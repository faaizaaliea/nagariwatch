const FETCH_TIMEOUT_MS = 15000;

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchRainfallAndElevation(desaList) {
  const lats = desaList.map((d) => d.lat).join(",");
  const lngs = desaList.map((d) => d.lng).join(",");

  const elevationUrl = `https://api.open-meteo.com/v1/elevation?latitude=${lats}&longitude=${lngs}`;
  const rainfallUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}` +
    `&daily=precipitation_sum&past_days=1&forecast_days=1&timezone=auto`;

  const [elevRes, rainRes] = await Promise.all([
    fetchWithTimeout(elevationUrl),
    fetchWithTimeout(rainfallUrl),
  ]);

  if (!elevRes.ok) {
    throw new Error(`Open-Meteo elevation merespons status ${elevRes.status}`);
  }
  if (!rainRes.ok) {
    throw new Error(`Open-Meteo forecast merespons status ${rainRes.status}`);
  }

  const elevJson = await elevRes.json();
  const rainJson = await rainRes.json();

  const elevations = elevJson.elevation ?? [];
  const rainEntries = Array.isArray(rainJson) ? rainJson : [rainJson];

  return desaList.map((desa, i) => {
    const elevation = Number.isFinite(elevations[i])
      ? Math.round(elevations[i])
      : null;
    const dailyPrecip = rainEntries[i]?.daily?.precipitation_sum ?? [];

    const rainfallMm = Number.isFinite(dailyPrecip[0])
      ? Math.round(dailyPrecip[0])
      : null;
    return { id: desa.id, elevation, rainfallMm };
  });
}
