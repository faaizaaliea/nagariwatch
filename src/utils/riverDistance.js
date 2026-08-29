function pointToSegmentDistanceM(p, a, b) {
  const latRef = (a.lat + b.lat) / 2;
  const mPerDegLat = 111320;
  const mPerDegLng = 111320 * Math.cos((latRef * Math.PI) / 180);

  const toXY = (pt) => ({
    x: (pt.lng - a.lng) * mPerDegLng,
    y: (pt.lat - a.lat) * mPerDegLat,
  });

  const A = { x: 0, y: 0 };
  const B = toXY(b);
  const P = toXY(p);

  const abx = B.x - A.x;
  const aby = B.y - A.y;
  const lenSq = abx * abx + aby * aby;

  let t = lenSq === 0 ? 0 : ((P.x - A.x) * abx + (P.y - A.y) * aby) / lenSq;
  t = Math.max(0, Math.min(1, t));

  const closestX = A.x + t * abx;
  const closestY = A.y + t * aby;
  const dx = P.x - closestX;
  const dy = P.y - closestY;
  return Math.sqrt(dx * dx + dy * dy);
}

function nearestDistanceToLines(point, lines) {
  let min = Infinity;
  for (const line of lines) {
    for (let i = 0; i < line.length - 1; i++) {
      const d = pointToSegmentDistanceM(point, line[i], line[i + 1]);
      if (d < min) min = d;
    }
  }
  return Number.isFinite(min) ? min : null;
}

export function computeRiverDistances(desaList, lines) {
  return desaList.map((desa) => ({
    id: desa.id,
    distanceM: nearestDistanceToLines({ lat: desa.lat, lng: desa.lng }, lines),
  }));
}
