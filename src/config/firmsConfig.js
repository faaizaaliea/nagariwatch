export const DEFAULT_MAP_KEY = "";
export const FIRMS_SOURCE = "VIIRS_SNPP_NRT";

export const FIRMS_DAY_RANGE = 5;
export const FIRMS_BBOX = {
  west: 97.45,
  south: 3.45,
  east: 97.85,
  north: 3.85,
};
export const HOTSPOT_MATCH_RADIUS_M = 5000;

export const FIRMS_PROXY_ENDPOINT =
  "https://nagari-watch-firms-proxy.faaizalilaaliea.workers.dev";

const STORAGE_KEY = "nagariwatch_firms_map_key";

export function getStoredMapKey() {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_MAP_KEY;
  } catch {
    return DEFAULT_MAP_KEY;
  }
}

export function setStoredMapKey(key) {
  try {
    if (key) localStorage.setItem(STORAGE_KEY, key.trim());
    else localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
