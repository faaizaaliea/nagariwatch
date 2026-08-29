import { RIVER_BBOX, OVERPASS_ENDPOINT } from "../config/riverConfig";

const FETCH_TIMEOUT_MS = 20000;

async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function buildQuery() {
  const { south, west, north, east } = RIVER_BBOX;
  return `[out:json][timeout:20];
(
  way["waterway"~"^(river|stream)$"](${south},${west},${north},${east});
);
out geom;`;
}

export async function fetchRiverLines() {
  const res = await fetchWithTimeout(OVERPASS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: buildQuery(),
  });

  if (!res.ok) {
    throw new Error(`Overpass API merespons status ${res.status}`);
  }

  const json = await res.json();
  const elements = json.elements ?? [];

  return elements
    .filter((el) => el.type === "way" && Array.isArray(el.geometry))
    .map((el) => el.geometry.map((pt) => ({ lat: pt.lat, lng: pt.lon })));
}
