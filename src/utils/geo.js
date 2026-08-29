function toRad(deg) {
  return (deg * Math.PI) / 180;
}

export function distanceMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function findNearestDesa(lat, lng, desaList) {
  if (!desaList?.length) return null;
  let nearest = null;
  let nearestDist = Infinity;
  for (const desa of desaList) {
    const d = distanceMeters(lat, lng, desa.lat, desa.lng);
    if (d < nearestDist) {
      nearestDist = d;
      nearest = desa;
    }
  }
  return nearest ? { desa: nearest, distanceM: nearestDist } : null;
}

export function searchDesaByName(query, desaList) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return desaList.filter((desa) => desa.nama.toLowerCase().includes(q));
}
