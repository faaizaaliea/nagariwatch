export const RISK_LEVELS = {
  TINGGI: "Tinggi",
  SEDANG: "Sedang",
  RENDAH: "Rendah",
};

export const RISK_THRESHOLDS = {
  hujanTinggi: 100, // mm/hari
  hujanSedang: 60, // mm/hari
  sungaiDekat: 200, // meter
  sungaiSedang: 500, // meter
  elevasiRendah: 50, // mdpl
  elevasiSedang: 100, // mdpl
};

export const HOTSPOT_THRESHOLDS = {
  tinggi: 3, // hotspot
  sedang: 1,
};

export function getHotspotLevel(desa) {
  const jumlah = desa.titik_panas_5hari ?? 0;
  if (jumlah >= HOTSPOT_THRESHOLDS.tinggi) return RISK_LEVELS.TINGGI;
  if (jumlah >= HOTSPOT_THRESHOLDS.sedang) return RISK_LEVELS.SEDANG;
  return RISK_LEVELS.RENDAH;
}

export function getRiskLevel(desa) {
  const { curah_hujan_mm, jarak_sungai_m, elevasi_mdpl } = desa;
  const {
    hujanTinggi,
    hujanSedang,
    sungaiDekat,
    sungaiSedang,
    elevasiRendah,
    elevasiSedang,
  } = RISK_THRESHOLDS;

  const hujanEkstrem = curah_hujan_mm > hujanTinggi;
  const dekatSungaiDanRendah =
    jarak_sungai_m < sungaiDekat && elevasi_mdpl < elevasiRendah;

  if (hujanEkstrem || dekatSungaiDanRendah) {
    return RISK_LEVELS.TINGGI;
  }

  const hujanCukupTinggi = curah_hujan_mm > hujanSedang;
  const cukupDekatSungai = jarak_sungai_m < sungaiSedang;
  const elevasiCukupRendah = elevasi_mdpl < elevasiSedang;

  if (hujanCukupTinggi || cukupDekatSungai || elevasiCukupRendah) {
    return RISK_LEVELS.SEDANG;
  }

  return RISK_LEVELS.RENDAH;
}

export function getRiskColor(level) {
  switch (level) {
    case RISK_LEVELS.TINGGI:
      return "#1e40af"; // risiko tinggi
    case RISK_LEVELS.SEDANG:
      return "#3b82f6"; // risiko sedang
    default:
      return "#93c5fd"; // risiko rendah
  }
}

export function summarizeRisk(desaList) {
  const summary = { Tinggi: 0, Sedang: 0, Rendah: 0 };
  desaList.forEach((desa) => {
    const level = getRiskLevel(desa);
    summary[level] += 1;
  });
  return summary;
}

export function getAlertReasons(desa, t) {
  const tr = t ?? ((key, vars) => defaultText(key, vars));
  const reasons = [];
  if (desa.curah_hujan_mm > RISK_THRESHOLDS.hujanTinggi) {
    reasons.push({
      label: tr("alertReasons.heavyRain"),
      detail: tr("alertReasons.heavyRainDetail", {
        val: desa.curah_hujan_mm,
        threshold: RISK_THRESHOLDS.hujanTinggi,
      }),
    });
  }
  if (
    desa.jarak_sungai_m < RISK_THRESHOLDS.sungaiDekat &&
    desa.elevasi_mdpl < RISK_THRESHOLDS.elevasiRendah
  ) {
    reasons.push({
      label: tr("alertReasons.nearRiverLowElev"),
      detail: tr("alertReasons.nearRiverLowElevDetail", {
        river: desa.jarak_sungai_m,
        elev: desa.elevasi_mdpl,
        riverThreshold: RISK_THRESHOLDS.sungaiDekat,
        elevThreshold: RISK_THRESHOLDS.elevasiRendah,
      }),
    });
  }
  const hotspot = desa.titik_panas_5hari ?? 0;
  if (hotspot >= HOTSPOT_THRESHOLDS.tinggi) {
    reasons.push({
      label: tr("alertReasons.highHotspot"),
      detail: tr("alertReasons.highHotspotDetail", {
        val: hotspot,
        threshold: HOTSPOT_THRESHOLDS.tinggi,
      }),
    });
  }
  return reasons;
}

function defaultText(key, vars = {}) {
  const templates = {
    "alertReasons.heavyRain": "Curah hujan ekstrem",
    "alertReasons.heavyRainDetail": `${vars.val} mm/hari (ambang >${vars.threshold} mm)`,
    "alertReasons.nearRiverLowElev": "Dekat sungai & elevasi rendah",
    "alertReasons.nearRiverLowElevDetail": `${vars.river} m dari sungai, ${vars.elev} mdpl (ambang <${vars.riverThreshold} m & <${vars.elevThreshold} mdpl)`,
    "alertReasons.highHotspot": "Titik panas tinggi",
    "alertReasons.highHotspotDetail": `${vars.val} titik panas dalam 5 hari (ambang ≥${vars.threshold})`,
  };
  return templates[key] ?? key;
}

export const RISK_WEIGHTS = {
  curahHujan: 0.4,
  jarakSungaiElevasi: 0.4,
  titikPanas: 0.2,
};

function scoreFromThresholds(value, sedang, tinggi) {
  if (tinggi === sedang) return value >= tinggi ? 100 : 0;
  const pct = ((value - sedang) / (tinggi - sedang)) * 50 + 50;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

export function explainRiskLevel(desa, t) {
  const tr = t ?? ((key, vars) => explainDefaultText(key, vars));
  const { curah_hujan_mm, jarak_sungai_m, elevasi_mdpl } = desa;
  const hotspot = desa.titik_panas_5hari ?? 0;
  const {
    hujanTinggi,
    hujanSedang,
    sungaiDekat,
    sungaiSedang,
    elevasiRendah,
    elevasiSedang,
  } = RISK_THRESHOLDS;

  const hujanScore = scoreFromThresholds(
    curah_hujan_mm,
    hujanSedang,
    hujanTinggi,
  );
  const sungaiScore = scoreFromThresholds(
    sungaiSedang - jarak_sungai_m,
    sungaiSedang - sungaiDekat,
    0,
  );
  const elevasiScore = scoreFromThresholds(
    elevasiSedang - elevasi_mdpl,
    elevasiSedang - elevasiRendah,
    0,
  );
  const gabunganJarakElevasi = Math.round((sungaiScore + elevasiScore) / 2);
  const hotspotScore = scoreFromThresholds(
    hotspot,
    HOTSPOT_THRESHOLDS.sedang,
    HOTSPOT_THRESHOLDS.tinggi,
  );

  const skorAkhir = Math.round(
    hujanScore * RISK_WEIGHTS.curahHujan +
      gabunganJarakElevasi * RISK_WEIGHTS.jarakSungaiElevasi +
      hotspotScore * RISK_WEIGHTS.titikPanas,
  );

  const level = getRiskLevel(desa);

  const faktor = [
    {
      nama: tr("riskFactors.rainfall"),
      nilai: tr("riskFactors.rainfallValue", { val: curah_hujan_mm }),
      ambang: tr("riskFactors.rainfallThreshold", {
        sedang: hujanSedang,
        tinggi: hujanTinggi,
      }),
      skor: hujanScore,
      bobot: RISK_WEIGHTS.curahHujan,
      terpicu: curah_hujan_mm > hujanSedang,
      penjelasan:
        curah_hujan_mm > hujanTinggi
          ? tr("riskFactors.rainfallExplainHigh")
          : curah_hujan_mm > hujanSedang
            ? tr("riskFactors.rainfallExplainMed")
            : tr("riskFactors.rainfallExplainLow"),
    },
    {
      nama: tr("riskFactors.riverElevation"),
      nilai: tr("riskFactors.riverElevationValue", {
        river: jarak_sungai_m,
        elev: elevasi_mdpl,
      }),
      ambang: tr("riskFactors.riverElevationThreshold", {
        river: sungaiDekat,
        elev: elevasiRendah,
      }),
      skor: gabunganJarakElevasi,
      bobot: RISK_WEIGHTS.jarakSungaiElevasi,
      terpicu:
        (jarak_sungai_m < sungaiDekat && elevasi_mdpl < elevasiRendah) ||
        jarak_sungai_m < sungaiSedang ||
        elevasi_mdpl < elevasiSedang,
      penjelasan:
        jarak_sungai_m < sungaiDekat && elevasi_mdpl < elevasiRendah
          ? tr("riskFactors.riverElevationExplainHigh")
          : jarak_sungai_m < sungaiSedang || elevasi_mdpl < elevasiSedang
            ? tr("riskFactors.riverElevationExplainMed")
            : tr("riskFactors.riverElevationExplainLow"),
    },
    {
      nama: tr("riskFactors.hotspot"),
      nilai: tr("riskFactors.hotspotValue", { val: hotspot }),
      ambang: tr("riskFactors.hotspotThreshold", {
        sedang: HOTSPOT_THRESHOLDS.sedang,
        tinggi: HOTSPOT_THRESHOLDS.tinggi,
      }),
      skor: hotspotScore,
      bobot: RISK_WEIGHTS.titikPanas,
      terpicu: hotspot >= HOTSPOT_THRESHOLDS.sedang,
      penjelasan: tr("riskFactors.hotspotExplain"),
    },
  ];

  return {
    level,
    levelSource: "threshold",
    skorAkhir,
    skorRole: "supplementary",
    faktor,
  };
}

function explainDefaultText(key) {
  return key;
}

export function getHeavyRainAlerts(desaList) {
  return desaList.filter(
    (desa) => desa.curah_hujan_mm > RISK_THRESHOLDS.hujanTinggi,
  );
}

export function getHotspotAlerts(desaList) {
  return desaList.filter(
    (desa) => (desa.titik_panas_5hari ?? 0) >= HOTSPOT_THRESHOLDS.tinggi,
  );
}

export function generateMonthlyBrief(desaList, t, locale = "id-ID") {
  const tr = t ?? ((key) => key);
  const summary = summarizeRisk(desaList);
  const total = desaList.length;
  const totalHujan = desaList.reduce((sum, d) => sum + d.curah_hujan_mm, 0);
  const avgRainfall = total ? Math.round(totalHujan / total) : 0;

  const totalHotspot = desaList.reduce(
    (sum, d) => sum + (d.titik_panas_5hari ?? 0),
    0,
  );
  const avgHotspot = total ? Math.round((totalHotspot / total) * 10) / 10 : 0;
  const hotspotVillageCount = getHotspotAlerts(desaList).length;

  const hotspotPressureIndex = Math.round(avgHotspot * 0.4 * 10) / 10;

  const monthName = new Date().toLocaleString(locale, { month: "long" });

  let recommendation = tr("monthlyRecommendation.stable");
  if (summary.Tinggi >= 5 || avgRainfall > 90) {
    recommendation = tr("monthlyRecommendation.high");
  } else if (summary.Tinggi >= 2 || avgRainfall > 70) {
    recommendation = tr("monthlyRecommendation.medium");
  }
  if (hotspotVillageCount >= 3) {
    recommendation += tr("monthlyRecommendation.hotspotAddon");
  }

  return {
    month: monthName,
    highRiskCount: summary.Tinggi,
    mediumRiskCount: summary.Sedang,
    lowRiskCount: summary.Rendah,
    avgRainfall,
    avgHotspot,
    hotspotVillageCount,
    hotspotPressureIndex,
    recommendation,
  };
}

export function summarizeKecamatanRisk(desaList) {
  const total = desaList.length;
  const summary = summarizeRisk(desaList);
  const avgRainfall = total
    ? Math.round(desaList.reduce((s, d) => s + d.curah_hujan_mm, 0) / total)
    : 0;
  const avgHotspot = total
    ? Math.round(
        (desaList.reduce((s, d) => s + (d.titik_panas_5hari ?? 0), 0) / total) *
          10,
      ) / 10
    : 0;

  let risiko = RISK_LEVELS.RENDAH;
  if (summary.Tinggi >= Math.ceil(total * 0.2) || avgRainfall > 90) {
    risiko = RISK_LEVELS.TINGGI;
  } else if (summary.Tinggi > 0 || avgRainfall > 70 || avgHotspot >= 2) {
    risiko = RISK_LEVELS.SEDANG;
  }

  return { avgRainfall, avgHotspot, risiko, ...summary, total };
}

export function getMonthOverMonthChange(monthlyList) {
  if (!monthlyList || monthlyList.length < 2) return null;
  const curr = monthlyList[monthlyList.length - 1];
  const prev = monthlyList[monthlyList.length - 2];

  function delta(currVal, prevVal) {
    const diff = Math.round((currVal - prevVal) * 10) / 10;
    const pct = prevVal ? Math.round((diff / prevVal) * 1000) / 10 : 0;
    return {
      diff,
      pct,
      arah: diff > 0 ? "naik" : diff < 0 ? "turun" : "tetap",
    };
  }

  return {
    bulanIni: curr.month,
    bulanLalu: prev.month,
    curahHujan: delta(curr.avgRainfall, prev.avgRainfall),
    hotspot: delta(curr.hotspotAvg, prev.hotspotAvg),
    desaTinggi: delta(curr.highRisk, prev.highRisk),
    hotspotPressure: delta(
      curr.hotspotPressureIndex,
      prev.hotspotPressureIndex,
    ),
  };
}

export function getDataConfidence(source, t) {
  const tr = t ?? ((key) => key);
  if (source === "firms-direct" || source === "firms-own-proxy") {
    return {
      level: "Tinggi",
      pct: 92,
      alasan: tr("dataConfidence.highReason"),
    };
  }
  if (source === "firms-proxy") {
    return {
      level: "Sedang",
      pct: 75,
      alasan: tr("dataConfidence.mediumReason"),
    };
  }
  return {
    level: "Rendah",
    pct: 35,
    alasan: tr("dataConfidence.lowReason"),
  };
}

export function getCrossBorderAlerts(kecamatanStats, t) {
  const tr = t ?? ((key, vars) => `${vars?.name ?? ""}`);
  const hulu = kecamatanStats.filter(
    (k) =>
      k.posisiDas === "Hulu" &&
      (k.risiko === RISK_LEVELS.TINGGI || k.avgHotspot >= 2),
  );
  const hilir = kecamatanStats.filter((k) => k.posisiDas === "Hilir");

  if (hulu.length === 0 || hilir.length === 0) return [];

  return hulu.map((h) => ({
    dari: h.nama,
    ke: hilir.map((d) => d.nama),
    pesan: tr(
      h.risiko === RISK_LEVELS.TINGGI
        ? "crossBorderAlert.messageHighRisk"
        : "crossBorderAlert.messageHotspot",
      { name: h.nama },
    ),
  }));
}
