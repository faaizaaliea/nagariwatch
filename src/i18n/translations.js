export const TRANSLATIONS = {
  id: {
    common: {
      close: "Tutup",
      cancel: "Batal",
      save: "Simpan",
      dash: "-",
      village: "desa",
      points: "titik",
    },
    months: {
      Januari: "Januari",
      Februari: "Februari",
      Maret: "Maret",
      April: "April",
      Mei: "Mei",
      Juni: "Juni",
      Juli: "Juli",
      Agustus: "Agustus",
      September: "September",
      Oktober: "Oktober",
      November: "November",
      Desember: "Desember",
    },
    langToggle: {
      label: "Bahasa",
    },
    customSelect: {
      placeholder: "Pilih…",
      empty: "Tidak ada opsi",
    },
    riskLevels: {
      Tinggi: "Tinggi",
      Sedang: "Sedang",
      Rendah: "Rendah",
    },
    alertReasons: {
      heavyRain: "Hujan ekstrem",
      heavyRainDetail: "{{val}} mm/hari (ambang >{{threshold}} mm)",
      nearRiverLowElev: "Dekat sungai, elevasi rendah",
      nearRiverLowElevDetail:
        "{{river}} m dari sungai, {{elev}} mdpl (ambang <{{riverThreshold}} m & <{{elevThreshold}} mdpl)",
      highHotspot: "Banyak titik panas",
      highHotspotDetail:
        "{{val}} titik panas dalam 5 hari (ambang ≥{{threshold}})",
    },
    riskFactors: {
      rainfall: "Curah Hujan",
      rainfallValue: "{{val}} mm/hari",
      rainfallThreshold: "Sedang >{{sedang}} mm · Tinggi >{{tinggi}} mm",
      rainfallExplainHigh:
        "Sudah melewati ambang TINGGI, sehingga desa masuk Risiko Tinggi.",
      rainfallExplainMed:
        "Berada di atas ambang sedang dan menambah skor risiko.",
      rainfallExplainLow:
        "Masih di bawah ambang sedang, jadi tidak menambah risiko.",
      riverElevation: "Jarak Sungai & Elevasi",
      riverElevationValue: "{{river}} m dari sungai, {{elev}} mdpl",
      riverElevationThreshold: "Tinggi jika <{{river}} m DAN <{{elev}} mdpl",
      riverElevationExplainHigh:
        "Jarak ke sungai dan elevasinya sama-sama masuk ambang tinggi, sehingga statusnya otomatis Risiko Tinggi.",
      riverElevationExplainMed:
        "Salah satu indikator jarak sungai atau elevasi sudah masuk kategori rawan.",
      riverElevationExplainLow:
        "Jarak dari sungai dan elevasinya masih dalam batas yang digunakan sistem.",
      hotspot: "Titik Panas (5 hari)",
      hotspotValue: "{{val}} titik",
      hotspotThreshold: "Sedang ≥{{sedang}} · Tinggi ≥{{tinggi}}",
      hotspotExplain:
        "Indikator sederhana untuk melihat aktivitas panas/kebakaran di area hulu. Tidak menentukan level risiko banjir, tetapi ikut menambah skor dan ditampilkan sebagai Hotspot Pressure Indicator.",
    },
    monthlyRecommendation: {
      stable:
        "Kondisi relatif stabil. Tetap pantau curah hujan dan kondisi sungai secara rutin.",
      high: "Tingkatkan kesiapsiagaan di desa berisiko tinggi dan pastikan jalur evakuasi siap digunakan.",
      medium:
        "Perhatikan desa berisiko tinggi di dekat sungai dan siapkan komunikasi awal dengan warga.",
      hotspotAddon:
        " Titik panas meningkat di beberapa desa hulu. Koordinasikan pemantauan lapangan dengan Damkarhut/BPBD.",
    },
    dataConfidence: {
      highLevel: "Tinggi",
      highReason:
        "Titik panas berasal langsung dari data satelit NASA FIRMS dan diperbarui mendekati real-time.",
      mediumLevel: "Sedang",
      mediumReason:
        "Titik panas dari NASA FIRMS via proxy demo, bisa delay/terbatas kuota.",
      lowLevel: "Rendah",
      lowReason:
        "Menggunakan data contoh untuk pengembangan tampilan, bukan data satelit aktual.",
    },
    crossBorderAlert: {
      messageHighRisk:
        "{{name}} (hulu) menunjukkan risiko banjir tinggi. Aliran air atau sedimen berpotensi berdampak ke wilayah hilir dalam 24–48 jam.",
      messageHotspot:
        "{{name}} (hulu) menunjukkan kenaikan titik panas. Aliran air atau sedimen berpotensi berdampak ke wilayah hilir dalam 24–48 jam.",
    },
    appShell: {
      eyebrow: "Nagari Watch · Kecamatan {{name}}",
      mvpTag: " (MVP)",
      comingSoonTag: " (segera hadir)",
      subtitle:
        "Kabupaten {{kab}}, Provinsi {{prov}} · Kawasan Ekosistem Leuser",
      pageTitles: {
        dashboard: "Evidence Dashboard",
        peta: "Peta Risiko",
        laporan: "Community Report",
        bulanan: "Monthly Report",
        lintas: "Cross-Border Risk",
        metodologi: "Metodologi & Sumber Data",
      },
    },
    sidebar: {
      kecamatanLabel: "Kecamatan",
      currentLocation: "Lokasi Terkini",
      alertRadiusLabel: "Notifikasi Risiko",
      alertRadiusValue: "Radius {{km}} km dari {{desa}}",
      alertRadiusHint:
        "Email otomatis dikirim jika risiko desa dalam radius ini naik menjadi Tinggi. Pengaturan ada di src/data/userProfile.js.",
      role: "Role",
      roleOptions: {
        Warga: "Warga",
        Relawan: "Relawan",
        "Petugas BPBD": "Petugas BPBD",
      },
      locating: "Mencari…",
      permissionDeniedRetry: "Izin ditolak · coba lagi",
      notSupported: "Tidak didukung",
      idle: "-",
      nearLabel: "Dekat {{name}} (~{{km}} km)",
      outOfCoverage: "Di luar cakupan (~{{km}} km dari Ketambe)",
      outOfCoverageHint:
        "Lokasi Anda berada di luar Kecamatan Ketambe, satu-satunya wilayah yang memiliki data desa pada MVP ini.",
      detected: "Lokasi terdeteksi",
      changeDistrict: "Ganti Kecamatan",
      logout: "Logout",
      nav: {
        dashboard: "Evidence Dashboard",
        peta: "Peta",
        laporan: "Community Report",
        bulanan: "Monthly Report",
        lintas: "Cross-Border Risk",
        metodologi: "Metodologi & Sumber Data",
      },
      demoButton: "▶ Jalankan Demo Skenario",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
    },
    demoScenario: {
      bannerLabel: "MODE DEMO",
      bannerText: "Popup ini menampilkan simulasi skenario di Desa {{desa}}",
      stepCounter: "Langkah {{current}} dari {{total}}",
      prevButton: "Sebelumnya",
      nextButton: "Lanjut",
      exitButton: "Keluar Demo",
      finishButton: "Selesai, tutup demo",
      beforeLabel: "Sebelum",
      afterLabel: "Sesudah",
      thresholdLabel: "Ambang: {{val}} mm/hari",
      crossedLabel: "Nilai skenario: {{val}} mm/hari",
      sampleReportTag: "Contoh laporan",
      steps: {
        intro: {
          title: "Skenario: Hujan Ekstrem di Desa {{desa}}",
          desc: "Skenario dimulai dengan kondisi desa pada level Sedang.",
        },
        rainUp: {
          title: "Curah hujan naik",
          desc: "Curah hujan {{desa}} naik dari {{before}} mm/hari menjadi {{after}} mm/hari.",
        },
        riskTriggered: {
          title: "Indikator risiko terpicu",
          desc: "Curah hujan sudah melewati ambang ekstrem (>{{threshold}} mm/hari). riskLogic.js lalu menghitung ulang status desa ini.",
        },
        villageHigh: {
          title: "Desa berstatus TINGGI",
          desc: "Status risiko {{desa}} berubah dari Sedang menjadi Tinggi.",
        },
        residentReport: {
          title: "Warga mengirim laporan",
          desc: "Contoh laporan warga ini menunjukkan bagaimana laporan lapangan dapat melengkapi data sensor.",
        },
        explainWhy: {
          title: "Sistem menjelaskan kenapa",
          desc: "Rincian skor di bawah menunjukkan curah hujan sebagai faktor utama yang membuat status menjadi Tinggi.",
        },
        hotspotUpstream: {
          title: "Titik panas di hulu terdeteksi",
          desc: "{{hotspot}} titik panas (proxy NASA FIRMS) terdeteksi di sekitar {{desa}}, menambah tekanan risiko di wilayah hulu DAS.",
        },
        crossBorder: {
          title: "Peringatan lintas kecamatan",
          desc: "Kecamatan Ketambe (Hulu) sudah berada pada kategori risiko tinggi karena kondisi beberapa desa. Dalam skenario ini, {{desa}} ikut memperkuat kondisi tersebut, sehingga sistem memicu peringatan untuk wilayah hilir. Peringatan lintas kecamatan tidak bergantung pada satu desa saja.",
        },
        end: {
          title: "Skenario selesai",
          desc: "Alurnya: hujan naik → indikator terpicu → status desa menjadi Tinggi → warga mengirim laporan → sistem menjelaskan faktor risiko → titik panas hulu terdeteksi → peringatan lintas kecamatan. Klik selesai untuk menutup demo.",
        },
      },
      reportEvidenceLabel: "Ikut diproses sebagai bukti pendukung:",
      demoReportDescription:
        "Air sungai naik dengan cepat dan mulai mendekati permukiman. Warga mulai waspada.",
    },
    loggedOut: {
      title: "Anda telah logout",
      subtitle: "Terima kasih sudah mengunjungi Nagari Watch.",
      button: "Login kembali",
    },
    districtSelect: {
      eyebrow: "Nagari Watch",
      title: "Pilih Kecamatan",
      intro:
        "Nagari Watch membantu memantau kondisi yang berkaitan dengan risiko banjir di sekitar Ekosistem Leuser, Aceh Tenggara. Untuk saat ini, {{highlight}} menjadi wilayah percontohan dengan data desa yang paling lengkap.",
      introHighlight: "Kecamatan Ketambe",
      noDataTag: " (belum ada data)",
      kabPrefix: "Kab.",
      dataAvailable: "Data tersedia",
      noDataAvailable: "Belum ada data",
    },
    noData: {
      back: "Pilih kecamatan lain",
      message: "Belum ada data untuk Kecamatan {{name}}, Kabupaten {{kab}}.",
      note: "Kecamatan ini termasuk dalam rencana pengembangan Nagari Watch, tetapi pendataannya belum dimulai. Kecamatan Ketambe digunakan lebih dulu sebagai wilayah percontohan sebelum diperluas ke kecamatan lain.",
    },
    firmsPanel: {
      sourceDirect: "NASA FIRMS (langsung)",
      sourceOwnProxy: "NASA FIRMS (proxy sendiri)",
      sourceProxy: "NASA FIRMS (via proxy demo)",
      sourceDummy: "Data contoh (dummy)",
      sourcePrefix: "Sumber data hotspot: ",
      fetching: "Mengambil data FIRMS…",
      updated: "Diperbarui {{time}}",
      errorFallback:
        "Data FIRMS gagal dimuat. Menampilkan data contoh sebagai gantinya.",
      retry: "Coba lagi",
      close: "Tutup",
      changeKey: "Ganti key",
      connect: "Sambungkan",
      placeholderKey: "Tempel FIRMS MAP_KEY di sini",
      saveBtn: "Simpan",
      noKeyLink: "Belum punya MAP_KEY? Daftar gratis",
    },
    meteoPanel: {
      sourceLive: "Open-Meteo (langsung)",
      sourceDummy: "Data contoh (dummy)",
      sourcePrefix: "Sumber data cuaca: ",
      fetching: "Mengambil data cuaca…",
      updated: "Diperbarui {{time}}",
      errorFallback:
        "Data cuaca gagal dimuat. Menampilkan data contoh sebagai gantinya.",
      retry: "Coba lagi",
    },
    riverPanel: {
      sourceLive: "OpenStreetMap (langsung)",
      sourceDummy: "Data contoh (dummy)",
      sourcePrefix: "Sumber data sungai/elevasi: ",
      fetching: "Mengambil data sungai…",
      updated: "Diperbarui {{time}}",
      errorFallback:
        "Data sungai gagal dimuat. Menampilkan data contoh sebagai gantinya.",
      retry: "Coba lagi",
    },
    simBanner: {
      label: "DATA CONTOH / SIMULASI:",
      body: "Curah hujan, jarak sungai, elevasi, dan jumlah rumah tangga di halaman ini berasal dari data",
      bodyBold: "dummy",
      bodyRest:
        "untuk pengembangan tampilan dan belum berasal dari BMKG/BPBD/BPS. Untuk titik panas (hotspot),",
      liveNotePrefix: "saat ini memakai data",
      liveNoteBold: "NASA FIRMS sungguhan",
      notLiveNote: "juga masih data contoh sampai MAP_KEY FIRMS disambungkan.",
      warning:
        "Jangan gunakan data ini sebagai dasar keputusan evakuasi atau mitigasi nyata.",
      linkText: "Lihat sumber data & metodologi",
    },
    earlyWarning: {
      title: "Peringatan Dini · Ambang Terlampaui",
      summary:
        "{{count}} desa memicu peringatan berdasarkan ambang curah hujan, jarak sungai/elevasi, dan titik panas.",
      riskLevel: "Risk Level: {{level}}",
      more: "+{{count}} desa lainnya juga berstatus waspada.",
      close: "Tutup peringatan",
    },
    actionGuide: {
      sectionLabel: "Yang bisa dilakukan sekarang",
      rendah: {
        title: "Risiko Rendah",
        headline: "Tidak ada tindakan khusus. Tetap pantau kondisi cuaca.",
        steps: [
          "Pantau info cuaca dan curah hujan secara berkala",
          "Kenali titik kumpul/evakuasi terdekat sebagai antisipasi",
        ],
      },
      sedang: {
        title: "Risiko Sedang",
        headline:
          "Periksa akses keluar rumah dan hindari aktivitas di dekat sungai jika hujan meningkat.",
        steps: [
          "Periksa akses keluar-masuk rumah tetap aman",
          "Hindari aktivitas di dekat sungai bila hujan meningkat",
          "Pantau informasi BPBD/BMKG setempat",
          "Siapkan dokumen penting di tempat yang mudah dijangkau",
        ],
      },
      tinggi: {
        title: "Risiko Tinggi",
        headline: "Bersiap mengikuti arahan evakuasi dan hindari daerah rawan.",
        steps: [
          "Simpan dokumen penting di tempat aman",
          "Hindari daerah dekat sungai dan dataran rendah",
          "Pantau informasi BPBD setempat secara aktif",
          "Bersiap menuju titik aman jika kondisi memburuk",
        ],
      },
    },
    todayStatus: {
      title: "Kondisi Hari Ini",
      badgeIcon: { tinggi: "🔴", sedang: "🟡", rendah: "🟢" },
      badgeLabel: {
        tinggi: "SIAGA",
        sedang: "WASPADA",
        rendah: "AMAN",
      },
      rainfallLabel: "Curah Hujan",
      mmUnit: "mm/hari",
      hotspotLabel: "Hotspot",
      villagesUnit: "desa",
      floodRiskLabel: "Flood Risk",
      whyToggleShow: "Kenapa?",
      whyToggleHide: "Tutup",
      villagesOnAlert:
        "Saat ini, {{count}} dari {{total}} desa berada pada status Waspada atau Siaga.",
      rainAlertNote:
        "{{count}} desa mencatat curah hujan ekstrem dalam 24 jam terakhir.",
    },
    shareWarning: {
      button: "Bagikan",
      copied: "Tersalin!",
      titlePrefix: "Peringatan Nagari Watch",
      textOverall:
        "PERINGATAN RISIKO BANJIR · {{level}}. {{count}} desa di Kecamatan {{kec}} sedang dalam status waspada. Diperbarui {{time}}. Pantau kondisi di Nagari Watch.",
    },
    filterBar: {
      label: "Filter Risiko:",
      all: "All",
      high: "High",
      medium: "Medium",
      low: "Low",
    },
    mapLegend: {
      title: "Legenda",
      hotspot: "Titik Panas (FIRMS)",
      layerBase: "Peta Dasar",
      layerSatellite: "Citra Satelit",
      layerBoundary: "Batas Ekosistem Leuser",
      boundaryError: "Gagal memuat batas Ekosistem Leuser: {{error}}",
    },
    mapPopup: {
      floodRisk: "Risiko banjir",
      rainfall: "Curah hujan",
      riverDistance: "Jarak ke sungai",
      elevation: "Elevasi",
      hotspotTitle: "Titik Panas (FIRMS)",
      detected: "Terdeteksi",
      confidence: "Confidence",
    },
    summaryCards: {
      totalDesa: "Total Desa",
      highRisk: "Risiko Tinggi",
      mediumRisk: "Risiko Sedang",
      lowRisk: "Risiko Rendah",
      highHotspotDesa: "Desa dengan Titik Panas Tinggi",
    },
    desaTable: {
      title: "Daftar Desa",
      titleWithFilter: "Daftar Desa Risiko {{filter}}",
      colDesa: "Desa",
      colRain: "Curah Hujan",
      colRiver: "Jarak Sungai",
      colElevation: "Elevasi",
      colHotspot: "Titik Panas (5 hari)",
      colRisk: "Risiko",
      empty: "Saat ini tidak ada desa dengan risiko {{filter}}.",
      hotspotTooltip: "Klik untuk melihat detail titik panas",
      riskTooltip: "Klik untuk melihat rincian skor risiko",
      pointsUnit: "titik",
    },
    hotspotModal: {
      title: "Titik Panas {{name}}",
      close: "Tutup",
      subtitleWithPoints:
        "{{count}} titik terdeteksi dalam 5 hari terakhir (radius pencocokan hingga {{radius}} km)",
      subtitleEmpty:
        "Tidak ada titik panas yang terdeteksi di sekitar desa ini dalam 5 hari terakhir.",
      colDateTime: "Tanggal & Waktu Deteksi",
      colDistance: "Jarak ke Desa",
      colConfidence: "Confidence",
      colFrp: "FRP (MW)",
      sourceNote:
        "Sumber: NASA FIRMS (VIIRS_SNPP_NRT). Confidence & FRP (Fire Radiative Power) membantu membedakan kebakaran/pembukaan lahan sungguhan dari deteksi palsu (mis. pantulan panas, industri).",
    },
    riskExplainModal: {
      titleWhy: "Mengapa Risiko {{level}}? · {{name}}",
      close: "Tutup",
      riskLevelTag: "Risk Level",
      riskLevelDesc:
        ": ditentukan oleh aturan ambang curah hujan, jarak sungai, dan elevasi di bawah.",
      riskScoreTag: "Risk Score",
      riskScoreDescPrefix: "{{score}}/100",
      riskScoreDesc:
        ": indikator pendukung yang menunjukkan kontribusi relatif tiap faktor, termasuk titik panas.",
      riskScoreDescBukan: "Bukan",
      riskScoreDescSuffix:
        'yang menentukan Risk Level di atas, skor 78 tidak otomatis berarti "Tinggi".',
      breakdownIntro: "Rincian indikator yang membentuk Risk Score:",
      weight: "bobot {{pct}}%",
      actualValue: "Nilai saat ini: {{val}}",
      threshold: "Ambang: {{val}}",
      footerNotePrefix:
        "Metodologi, sumber data, dan keterbatasan sistem dapat dilihat di halaman",
      footerNoteLink: "Metodologi & Sumber Data",
      footerNoteSuffix:
        "di menu sidebar. Skor dan ambang ini masih merupakan pilihan desain MVP dan belum dikalibrasi dengan data historis banjir.",
    },
    situationSummary: {
      badgeRiskLevel: "Risk Level: Berbasis Aturan",
      badgeAiAssisted: "Situation Summary: Dibantu AI",
      heading: "Ringkasan Situasi · Dibantu AI",
      caption:
        "Ringkasan dibuat dari indikator pemantauan dan laporan warga. AI tidak menentukan Risk Level.",
      notConfigured:
        "Fitur ini belum dikonfigurasi. Atur VITE_SITUATION_SUMMARY_ENDPOINT ke fungsi serverless yang sudah di-deploy (lihat serverless-proxy/).",
      generateButton: "Buat Ringkasan Situasi",
      loading: "Menyusun ringkasan dari data saat ini…",
      errorPrefix: "Gagal membuat ringkasan: {{message}}",
      retryButton: "Coba Lagi",
      regenerateButton: "Buat Ulang",
      limitationsLabel: "Keterbatasan:",
    },
    evidenceDashboard: {
      title: "Evidence Dashboard",
      confidenceLabel: "Confidence data:",
      subtitle:
        "Sumber bukti: tren curah hujan, Hotspot Pressure Indicator (proxy eksperimental), dan perubahan dari bulan ke bulan, dibandingkan dengan laporan warga.",
      trendTitle: "Tren 6 Bulan Terakhir",
      noHistory: "Belum ada riwayat bulanan.",
      rainfallDatasetLabel: "Curah hujan rata-rata (mm)",
      hotspotDatasetLabel: "Titik panas rata-rata (per desa)",
      yLeft: "mm/hari",
      yRight: "titik/desa",
      changeRainfall: "Curah Hujan",
      changeHotspot: "Titik Panas",
      changeHighRisk: "Desa Risiko Tinggi",
      changeHotspotPressure: "Hotspot Pressure Indicator",
      unitMm: " mm",
      unitPoints: " titik",
      unitDesa: " desa",
      unitPct: "%",
      vsLastMonth: "vs {{month}}",
      lastMonthFallback: "bulan lalu",
    },
    riskChart: {
      rainPerVillage: "Curah Hujan per Desa",
      riskDistribution: "Distribusi Level Risiko",
      rainDatasetLabel: "Curah hujan (mm/hari)",
      yAxisLabel: "mm/hari",
    },
    monthlyBrief: {
      title: "Laporan {{month}}",
      highRisk: "High Risk Village",
      avgRainfall: "Average Rainfall",
      hotspotTrend: "Hotspot Trend",
      hotspotPoints: "{{points}} titik/desa · {{count}} desa waspada",
      hotspotPressure: "Hotspot Pressure Indicator (experimental)",
      recommendation: "Recommendation",
    },
    reportStatus: {
      pending: "Pending",
      verified: "Verified",
      resolved: "Resolved",
    },
    communityReport: {
      title: "Community Report",
      subtitle:
        "Laporkan kondisi banjir atau cuaca di lokasi Anda. Foto/video hanya ditampilkan sebagai pratinjau dan tidak diunggah ke server.",
      categoryLabel: "Apa yang terjadi?",
      categories: {
        flood: "🌊 Banjir",
        fire: "🔥 Kebakaran",
        landslide: "⛰️ Longsor",
        landClearing: "🌳 Pembukaan lahan",
        roadCut: "🚧 Jalan terputus",
        other: "⚠️ Lainnya",
      },
      locationLabel: "Location",
      locationPlaceholder: "Pilih desa",
      descriptionLabel: "Description",
      descPlaceholder: "Contoh: air sungai naik cepat",
      uploadLabel: "Upload Photo/Video",
      uploadPlaceholder: "Klik untuk pilih foto atau video",
      remove: "Hapus",
      gpsLabel: "Location Metadata (GPS)",
      gpsButton: "Ambil Lokasi GPS",
      gpsLoading: "Mengambil lokasi…",
      gpsDenied: "Izin lokasi ditolak",
      gpsUnsupported: "GPS tidak didukung perangkat ini",
      gpsIdle: "Belum diambil",
      errorRequired: "Kategori, lokasi, dan deskripsi wajib diisi.",
      submit: "Kirim Laporan",
      feedTitle: "Laporan Warga ({{count}})",
      prototypeNote:
        "Prototype: status verifikasi di bawah hanya mensimulasikan alur Pending → Verified → Resolved. Belum terhubung ke proses verifikasi RT/RW/BPBD dan belum tersimpan permanen.",
      markAs: "Tandai {{status}} →",
      photoAlt: "Foto laporan di {{location}}",
      previewAlt: "Pratinjau laporan warga",
    },
    communityReportPage: {
      title: "Community Report",
      subtitle: "Laporan kondisi lingkungan dari warga.",
    },
    crossBorderPage: {
      title: "Cross-Border Risk",
      subtitle:
        "Melihat risiko lingkungan yang dapat saling berkaitan antar kecamatan dalam satu Daerah Aliran Sungai (DAS) di kawasan Ekosistem Leuser.",
      alertTitle: "Peringatan Lintas Wilayah",
      alertLine: "{{msg}} Wilayah hilir terdampak: {{list}}.",
      rainLabel: "Curah Hujan",
      hotspotLabel: "Titik Panas",
      perDesa: "/desa",
      estimasiBadge: "Estimasi",
      footerNote:
        "Fitur ini masih berupa MVP. Saat ini hanya Kecamatan Ketambe yang memiliki data desa. Kecamatan lain menggunakan estimasi sementara sampai pendataan lapangan dilakukan. Urutan hulu–tengah–hilir juga masih perlu diverifikasi dengan data hidrologi resmi.",
      mvpDataNote: "Data desa MVP, lihat halaman Peta.",
      noDataNote: "Belum ada pendataan.",
      posisi: {
        Hulu: "Hulu",
        Tengah: "Tengah",
        Hilir: "Hilir",
      },
      kecamatanNotes: {
        "tanoh-alas":
          "Belum ada data desa. Nilai saat ini merupakan estimasi dari data hujan wilayah.",
        "babul-rahmah":
          "Belum ada data desa. Nilai saat ini merupakan estimasi dari data hujan wilayah.",
        leuser:
          "Belum ada data desa. Nilai saat ini merupakan estimasi dari data hujan wilayah.",
        "lawe-alas":
          "Berada di hilir DAS yang sama dengan Ketambe dan Tanoh Alas, sehingga dapat menerima dampak aliran air atau sedimen dari hulu.",
      },
    },
    dashboardPage: {
      title: "Evidence Dashboard",
      subtitle:
        "Bukti kondisi risiko banjir dari beberapa sumber: anomali curah hujan, tekanan titik panas (proxy eksperimental, bukan pengukuran perubahan lahan), dan laporan warga.",
      rainfallAnomaly: "Rainfall Anomaly",
      monitored: "Terpantau",
      normal: "Normal",
      fromRainData: "dari data curah hujan desa saat ini",
      hotspotPressure: "Hotspot Pressure",
      desaUnit: "desa",
      hotspotSub:
        "tekanan titik panas tinggi (proxy eksperimental, bukan pengukuran perubahan lahan)",
      citizenReports: "Citizen Reports",
      reportsThisSession: "laporan warga pada sesi ini",
      verificationTitle: "Verifikasi Laporan Warga",
      prototypeBadge: "Prototype, belum ada backend",
      verificationSub:
        "Simulasi alur verifikasi laporan warga: Pending → Verified → Resolved. Status diubah manual di halaman Community Report dan tidak tersimpan permanen.",
      reportsLabel: "Reports",
      latestReportsTitle: "Laporan Warga Terbaru · Bukti Lapangan",
    },
    monthlyReportPage: {
      title: "Monthly Report",
      subtitle: "Ringkasan risiko banjir bulanan Kecamatan {{name}}.",
      generateReport: "Generate Report",
      downloadPdf: "Download PDF",
      printedHead: "Nagari Watch Monthly Report",
      printedOn: "Kecamatan {{name}} · dicetak {{date}}",
      printNote:
        "Laporan ini menggunakan data contoh untuk pengembangan tampilan. Lihat Metodologi & Sumber Data untuk status masing-masing indikator.",
      thisMonth: "Bulan ini",
      highRiskVillage: "High Risk Village",
      mediumRiskVillage: "Medium Risk Village",
      lowRiskVillage: "Low Risk Village",
      avgRainfall: "Average Rainfall",
      hotspotTrend: "Hotspot Trend",
      hotspotPressureIndicator: "Hotspot Pressure Indicator",
      noDataForYear: "Belum ada data laporan untuk tahun {{year}}.",
      pointsPerDesa: "titik/desa",
      footerNote:
        'Data bulanan pada MVP ini adalah data dummy untuk keperluan pengembangan tampilan Kecamatan {{name}} sebagai kecamatan percontohan (MVP). "Hotspot Pressure Indicator" adalah proxy eksperimental dari tren titik panas, bukan pengukuran perubahan tutupan lahan (land-use change) sungguhan, lihat halaman Metodologi.',
    },
    petaPage: {
      searchTitle: "Cari lokasi dulu, yuk",
      searchIntro:
        "Masukkan nama desa di Kecamatan {{kec}} untuk melihat peta risiko banjir dan datanya.",
      searchPlaceholder: "Contoh: Lawe Beringin, Ketambe, Jongar Asli...",
      searchButton: "Cari",
      notFound: 'Desa "{{query}}" tidak ditemukan.',
      viewAll: "atau lihat semua desa",
      changeLocation: "Cari lokasi lain",
      rainLabel: "Curah Hujan",
      riverLabel: "Jarak Sungai",
      elevationLabel: "Elevasi",
      householdLabel: "Rumah Tangga",
      rainUnit: "mm/hari",
      riverUnit: "m",
      elevationUnit: "mdpl",
      dataNote:
        "Koordinat dan nilai indikator di file ini masih berupa data contoh untuk pengembangan tampilan. Titik panas digunakan sebagai proxy sederhana untuk data NASA FIRMS.",
    },
    metodologi: {
      title: "Metodologi & Sumber Data",
      subtitle:
        "Lihat sumber data Nagari Watch, cara level risiko dihitung, dan keterbatasan sistem saat ini di halaman ini.",
      statusLegendTitle: "Legenda Status Data",
      statusLegendIntro:
        "Setiap indikator memiliki salah satu dari empat status berikut:",
      statusLegend: [
        {
          emoji: "🟢",
          label: "Real/Live",
          desc: "Data berasal langsung dari sumber dan diperbarui otomatis.",
        },
        {
          emoji: "🟡",
          label: "Mixed",
          desc: "Sebagian berasal dari sumber langsung, sebagian masih manual, atau belum melalui verifikasi dan penyimpanan permanen.",
        },
        {
          emoji: "🟠",
          label: "Simulated",
          desc: "Data contoh untuk pengembangan tampilan, bukan hasil pengukuran lapangan.",
        },
        {
          emoji: "⚪",
          label: "Future Integration",
          desc: "Belum tersedia dan masih dalam tahap perencanaan.",
        },
      ],
      sourceTableTitle: "Sumber Data per Indikator",
      colIndicator: "Indikator",
      colCurrentStatus: "Status Data Saat Ini",
      colPlan: "Sumber Data yang Direncanakan",
      colNote: "Catatan",
      sumberData: [
        {
          indikator: "Curah Hujan (mm/hari)",
          statusSaatIni: "Open-Meteo (live), dummy jika gagal/timeout",
          statusTone: "mixed",
          rencana: "BMKG (stasiun terdekat)/satelit hujan (GSMaP, CHIRPS)",
          catatan:
            "Curah hujan diambil dari Open-Meteo Forecast API saat koneksi berhasil (🟢). Jika gagal atau timeout, sistem menggunakan data contoh dari file desa (🟡). Status koneksi dapat dilihat di panel sumber curah hujan.",
        },
        {
          indikator: "Jarak ke Sungai (m) & Elevasi (mdpl)",
          statusSaatIni: "Open-Meteo + OSM/Overpass (live), dummy jika gagal",
          statusTone: "mixed",
          rencana: "DEM + peta jaringan sungai resmi (BWS)",
          catatan:
            "Elevasi diambil dari Open-Meteo dan jarak sungai dihitung dari data waterway OpenStreetMap melalui Overpass API (🟢 saat berhasil). Jika salah satu sumber gagal, sistem menggunakan data contoh (🟡). Karena cakupan OSM tidak selalu selengkap peta resmi BWS, hasilnya masih berupa perkiraan.",
        },
        {
          indikator: "Titik Panas/Hotspot (5 hari terakhir)",
          statusSaatIni:
            "NASA FIRMS (jika MAP_KEY disambungkan), dummy jika belum",
          statusTone: "mixed",
          rencana:
            "Sudah bisa langsung dari NASA FIRMS Area API (VIIRS_SNPP_NRT)",
          catatan:
            'Satu-satunya indikator yang SUDAH bisa memakai data satelit real (🟢 saat MAP_KEY tersambung, 🟡 saat pakai proxy demo). Lihat panel "Sumber data hotspot" di bagian atas dashboard untuk status koneksinya saat ini.',
        },
        {
          indikator: "Jumlah Rumah Tangga",
          statusSaatIni: "Data dummy",
          statusTone: "dummy",
          rencana: "BPS (data desa)/Dukcapil setempat",
          catatan:
            "Dipakai untuk konteks dampak, belum memengaruhi skor risiko.",
        },
        {
          indikator: "Laporan Warga (Community Report)",
          statusSaatIni:
            "Input manual dari pengguna sesi ini (tidak tersimpan permanen)",
          statusTone: "mixed",
          rencana:
            "Basis data terpusat + alur verifikasi berjenjang (RT/RW → Damkarhut/BPBD)",
          catatan:
            "Belum ada proses verifikasi. Laporan yang masuk ditampilkan apa adanya. Prioritas pengembangan berikutnya dijelaskan di roadmap.",
        },
        {
          indikator: "Estimasi Kecamatan Lain (Cross-Border Risk)",
          statusSaatIni: "Estimasi kasar, bukan hasil pendataan",
          statusTone: "dummy",
          rencana: "Pendataan lapangan per kecamatan",
          catatan:
            "Saat ini hanya Kecamatan Ketambe yang memiliki data desa. Kecamatan lain ditampilkan untuk memberi gambaran cakupan DAS.",
        },
        {
          indikator: "Kalibrasi Ambang & Skor (validasi historis)",
          statusSaatIni: "Belum dibangun",
          statusTone: "future",
          rencana:
            "Kalibrasi ambang/bobot dengan data kejadian banjir historis (BPBD) + model prediktif tervalidasi",
          catatan:
            "Ambang dan bobot saat ini masih merupakan pilihan desain MVP dan belum dikalibrasi dengan data historis.",
        },
      ],
      toneText: {
        dummy: "SIMULASI",
        mixed: "CAMPURAN",
        real: "REAL",
        future: "FUTURE",
      },
      scoreTitle: "Cara Skor & Level Risiko Dihitung",
      scoreIntroPrefix: "Nagari Watch memakai",
      scoreIntroBold: "logika ambang (threshold, bukan machine learning)",
      scoreIntroSuffix:
        "agar hasilnya mudah dijelaskan kepada warga dan aparat desa.",
      riskLevelTag: "Risk Level",
      riskLevelAuthoritative: "Penentu utama.",
      riskLevelDesc:
        "Level Tinggi/Sedang/Rendah ditentukan oleh aturan ambang berikut (OR-logic):",
      riskLevelFormula:
        "curah hujan >{{hujan}} mm ATAU (jarak sungai <{{sungai}} m DAN elevasi <{{elevasi}} mdpl)",
      riskLevelFooter: "Titik panas tidak ikut menentukan level ini.",
      whyThresholdsTitle: "Mengapa Ambang Ini?",
      whyThresholdsRainQ: "Kenapa >100 mm/hari?",
      whyThresholdsRainA:
        'Angka ini mengacu pada kategori "hujan sangat lebat" BMKG (>100 mm/hari), dengan kategori ekstrem di atas 150 mm/hari. Angka ini belum dikalibrasi khusus untuk Ketambe.',
      whyThresholdsRiverQ: "Kenapa <200 m dari sungai & <50 mdpl?",
      whyThresholdsRiverA:
        "Ambang ini merupakan heuristik sederhana yang digunakan dalam pemetaan bahaya banjir. Dipilih agar mudah dipahami, tetapi belum divalidasi dengan topografi dan riwayat banjir di Ketambe.",
      whyThresholdsPoints: [
        "Ambang ini merupakan titik awal berbasis pengetahuan domain, bukan hasil pembelajaran dari data.",
        "Ini bukan model prediktif. Sistem tidak menghitung probabilitas banjir, tetapi mengelompokkan kondisi saat ini ke dalam kategori risiko.",
        "Ambang ini belum dikalibrasi menggunakan kejadian banjir historis di Ketambe.",
        "Langkah berikutnya adalah mengkalibrasi ambang dan bobot menggunakan data historis BPBD/BMKG serta kejadian banjir di DAS Alas.",
      ],
      riskScoreTag: "Risk Score",
      riskScoreSupplementary: "Indikator pendukung.",
      riskScoreDesc:
        "Skor 0–100 membantu melihat kontribusi relatif tiap indikator, termasuk titik panas. Skor ini",
      riskScoreDescNot: "tidak",
      riskScoreDescSuffix:
        'tidak menentukan Risk Level di atas. Tidak ada ambang skor seperti "≥70 = Tinggi" yang digunakan untuk menentukan status desa.',
      weightsIntro:
        "Bobot yang digunakan untuk menghitung Risk Score, bukan Risk Level:",
      weightRain: "Curah Hujan",
      weightRainSub: "Tinggi jika >{{val}} mm/hari",
      weightRiver: "Sungai & Elevasi",
      weightRiverSub: "Tinggi jika <{{sungai}} m DAN <{{elevasi}} mdpl",
      weightHotspot: "Titik Panas",
      weightHotspotSub: "Tinggi jika ≥{{val}} titik/5 hari",
      scoreFooterNote:
        'Klik badge risiko di tabel "Daftar Desa" untuk melihat nilai tiap indikator, ambang yang digunakan, dan kontribusinya terhadap skor akhir.',
      limitationsTitle: "Keterbatasan & Catatan Penting",
      limitations: [
        "Ambang curah hujan, jarak sungai, dan elevasi masih merupakan pilihan desain MVP dan belum dikalibrasi dengan data historis banjir di Ketambe.",
        "Data desa (curah hujan, jarak sungai, elevasi, dan rumah tangga) masih berupa data contoh untuk mensimulasikan variasi risiko, bukan hasil pengukuran lapangan.",
        "FIRMS mendeteksi berbagai sumber panas. Hasilnya perlu diverifikasi di lapangan sebelum digunakan sebagai dasar tindakan.",
        "Laporan warga belum melalui proses verifikasi dan belum tersimpan permanen; data akan hilang saat halaman di-refresh.",
        "Jangan gunakan Nagari Watch sebagai satu-satunya dasar keputusan evakuasi atau mitigasi. Tetap ikuti arahan BPBD/BMKG setempat.",
      ],
    },
  },

  en: {
    common: {
      close: "Close",
      cancel: "Cancel",
      save: "Save",
      dash: "-",
      village: "village",
      points: "points",
    },
    months: {
      Januari: "January",
      Februari: "February",
      Maret: "March",
      April: "April",
      Mei: "May",
      Juni: "June",
      Juli: "July",
      Agustus: "August",
      September: "September",
      Oktober: "October",
      November: "November",
      Desember: "December",
    },
    langToggle: {
      label: "Language",
    },
    customSelect: {
      placeholder: "Select…",
      empty: "No options",
    },
    riskLevels: {
      Tinggi: "High",
      Sedang: "Medium",
      Rendah: "Low",
    },
    alertReasons: {
      heavyRain: "Heavy rainfall",
      heavyRainDetail: "{{val}} mm/day (threshold >{{threshold}} mm)",
      nearRiverLowElev: "Near river & low elevation",
      nearRiverLowElevDetail:
        "{{river}} m from river, {{elev}} masl (threshold <{{riverThreshold}} m & <{{elevThreshold}} masl)",
      highHotspot: "High hotspot activity",
      highHotspotDetail:
        "{{val}} hotspots in the last 5 days (threshold ≥{{threshold}})",
    },
    riskFactors: {
      rainfall: "Rainfall",
      rainfallValue: "{{val}} mm/day",
      rainfallThreshold: "Medium >{{sedang}} mm · High >{{tinggi}} mm",
      rainfallExplainHigh:
        "It has passed the HIGH threshold, which is enough to put the village at High Risk.",
      rainfallExplainMed:
        "It is above the medium threshold and adds to the risk score.",
      rainfallExplainLow:
        "It is below the medium threshold, so it does not add to the risk score.",
      riverElevation: "River Distance & Elevation",
      riverElevationValue: "{{river}} m from river, {{elev}} masl",
      riverElevationThreshold: "High if <{{river}} m AND <{{elev}} masl",
      riverElevationExplainHigh:
        "The village is both close to a river and at low elevation, which automatically results in High Risk.",
      riverElevationExplainMed:
        "Either the river distance or elevation is within the higher-risk range.",
      riverElevationExplainLow:
        "River distance and elevation are still within the range used by the system.",
      hotspot: "Hotspots (5 days)",
      hotspotValue: "{{val}} points",
      hotspotThreshold: "Medium ≥{{sedang}} · High ≥{{tinggi}}",
      hotspotExplain:
        "A simple indicator of heat and fire activity in upstream areas. It does not determine the main flood risk level, but contributes to the combined score and is shown separately as the Hotspot Pressure Indicator.",
    },
    monthlyRecommendation: {
      stable:
        "Conditions are relatively stable. Keep monitoring rainfall and river conditions.",
      high: "Increase preparedness in high-risk villages and make sure evacuation routes are ready.",
      medium:
        "Pay close attention to high-risk villages near rivers and prepare early communication with residents.",
      hotspotAddon:
        " Hotspots are increasing in several upstream villages. Coordinate field monitoring with Damkarhut/BPBD.",
    },
    dataConfidence: {
      highLevel: "High",
      highReason:
        "Hotspots come directly from NASA FIRMS satellite data and are updated near real time.",
      mediumLevel: "Medium",
      mediumReason:
        "Hotspots from NASA FIRMS via demo proxy, may be delayed/quota-limited.",
      lowLevel: "Low",
      lowReason:
        "Using sample data for UI development, not actual satellite data.",
    },
    crossBorderAlert: {
      messageHighRisk:
        "{{name}} (upstream) is showing high flood risk. Water or sediment flow could affect downstream areas within 24–48 hours.",
      messageHotspot:
        "{{name}} (upstream) is showing an increase in hotspots. Water or sediment flow could affect downstream areas within 24–48 hours.",
    },
    appShell: {
      eyebrow: "Nagari Watch · {{name}} Subdistrict",
      mvpTag: " (MVP)",
      comingSoonTag: " (coming soon)",
      subtitle: "{{kab}} Regency, {{prov}} Province · Leuser Ecosystem",
      pageTitles: {
        dashboard: "Evidence Dashboard",
        peta: "Risk Map",
        laporan: "Community Report",
        bulanan: "Monthly Report",
        lintas: "Cross-Border Risk",
        metodologi: "Methodology & Data Sources",
      },
    },
    sidebar: {
      kecamatanLabel: "Subdistrict",
      currentLocation: "Current Location",
      alertRadiusLabel: "Risk Notifications",
      alertRadiusValue: "{{km}} km radius from {{desa}}",
      alertRadiusHint:
        "An email is sent automatically when a village within this radius reaches High risk. Settings are in src/data/userProfile.js.",
      role: "Role",
      roleOptions: {
        Warga: "Resident",
        Relawan: "Volunteer",
        "Petugas BPBD": "BPBD Officer",
      },
      locating: "Locating…",
      permissionDeniedRetry: "Permission denied · retry",
      notSupported: "Not supported",
      idle: "-",
      nearLabel: "Near {{name}} (~{{km}} km)",
      outOfCoverage: "Outside coverage (~{{km}} km from Ketambe)",
      outOfCoverageHint:
        "Your location is outside Ketambe Subdistrict, the only area with village data in this MVP.",
      detected: "Location detected",
      changeDistrict: "Change Subdistrict",
      logout: "Logout",
      nav: {
        dashboard: "Evidence Dashboard",
        peta: "Map",
        laporan: "Community Report",
        bulanan: "Monthly Report",
        lintas: "Cross-Border Risk",
        metodologi: "Methodology & Data Sources",
      },
      demoButton: "▶ Run Demo Scenario",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    demoScenario: {
      bannerLabel: "DEMO MODE",
      bannerText: "This popup shows a simulated scenario for {{desa}} Village",
      stepCounter: "Step {{current}} of {{total}}",
      prevButton: "Previous",
      nextButton: "Next",
      exitButton: "Exit Demo",
      finishButton: "Finish, close demo",
      beforeLabel: "Before",
      afterLabel: "After",
      thresholdLabel: "Threshold: {{val}} mm/day",
      crossedLabel: "Scenario value: {{val}} mm/day",
      sampleReportTag: "Sample report",
      steps: {
        intro: {
          title: "Scenario: Extreme Rainfall in {{desa}} Village",
          desc: "The scenario starts with the village at Moderate risk.",
        },
        rainUp: {
          title: "Rainfall spikes",
          desc: "Rainfall in {{desa}} rises from {{before}} mm/day to {{after}} mm/day.",
        },
        riskTriggered: {
          title: "Risk indicator triggered",
          desc: "Rainfall has passed the extreme threshold (>{{threshold}} mm/day). riskLogic.js then recalculates the village status.",
        },
        villageHigh: {
          title: "Village becomes HIGH",
          desc: "{{desa}}'s risk status changes from Moderate to High.",
        },
        residentReport: {
          title: "Resident submits a report",
          desc: "This sample resident report shows how field reports can complement sensor data.",
        },
        explainWhy: {
          title: "System explains why",
          desc: "The score breakdown shows rainfall as the main factor behind the High status.",
        },
        hotspotUpstream: {
          title: "Upstream hotspot detected",
          desc: "{{hotspot}} hotspots (NASA FIRMS proxy) were detected near {{desa}}, adding pressure to the upstream area.",
        },
        crossBorder: {
          title: "Cross-border warning",
          desc: "Ketambe Subdistrict (Upstream) is already at high risk because of conditions across several villages. In this scenario, {{desa}} adds to that condition, so the system triggers a warning for the downstream area. The warning is based on the wider area, not just one village.",
        },
        end: {
          title: "Scenario complete",
          desc: "The flow is: rainfall rises → indicator is triggered → village becomes High → resident submits a report → system explains the risk factors → upstream hotspot is detected → cross-border warning. Click finish to close the demo.",
        },
      },
      reportEvidenceLabel: "Included as supporting evidence:",
      demoReportDescription:
        "The river is rising quickly and getting close to homes. Residents are starting to take notice.",
    },
    loggedOut: {
      title: "You have logged out",
      subtitle: "Thank you for visiting Nagari Watch.",
      button: "Log in again",
    },
    districtSelect: {
      eyebrow: "Nagari Watch",
      title: "Select a Subdistrict",
      intro:
        "Nagari Watch helps monitor conditions linked to flood risk around the Leuser Ecosystem in Southeast Aceh. For now, {{highlight}} is the pilot area with the most complete village-level data.",
      introHighlight: "Ketambe Subdistrict",
      noDataTag: " (no data yet)",
      kabPrefix: "Regency:",
      dataAvailable: "Data available",
      noDataAvailable: "No data yet",
    },
    noData: {
      back: "Choose another subdistrict",
      message: "No data yet for {{name}} Subdistrict, {{kab}} Regency.",
      note: "This subdistrict is part of Nagari Watch's development plan, but data collection has not started yet. Ketambe is being used as the pilot area before the system expands to other subdistricts.",
    },
    firmsPanel: {
      sourceDirect: "NASA FIRMS (direct)",
      sourceOwnProxy: "NASA FIRMS (own proxy)",
      sourceProxy: "NASA FIRMS (via demo proxy)",
      sourceDummy: "Sample data (dummy)",
      sourcePrefix: "Hotspot data source: ",
      fetching: "Fetching FIRMS data…",
      updated: "Updated {{time}}",
      errorFallback:
        "FIRMS data could not be loaded. Showing sample data instead.",
      retry: "Retry",
      close: "Close",
      changeKey: "Change key",
      connect: "Connect",
      placeholderKey: "Paste your FIRMS MAP_KEY here",
      saveBtn: "Save",
      noKeyLink: "Don't have a MAP_KEY? Sign up for free",
    },
    meteoPanel: {
      sourceLive: "Open-Meteo (live)",
      sourceDummy: "Sample data (dummy)",
      sourcePrefix: "Weather data source: ",
      fetching: "Fetching weather data…",
      updated: "Updated {{time}}",
      errorFallback:
        "Weather data could not be loaded. Showing sample data instead.",
      retry: "Retry",
    },
    riverPanel: {
      sourceLive: "OpenStreetMap (live)",
      sourceDummy: "Sample data (dummy)",
      sourcePrefix: "River/elevation data source: ",
      fetching: "Fetching river data…",
      updated: "Updated {{time}}",
      errorFallback:
        "River data could not be loaded. Showing sample data instead.",
      retry: "Retry",
    },
    simBanner: {
      label: "SAMPLE / SIMULATED DATA:",
      body: "Rainfall, river distance, elevation, and household counts on this page come from",
      bodyBold: "dummy",
      bodyRest:
        "sample data for UI development and are not yet from BMKG/BPBD/BPS. Hotspots",
      liveNotePrefix: "currently use",
      liveNoteBold: "real NASA FIRMS data",
      notLiveNote:
        "are also still sample data until a FIRMS MAP_KEY is connected.",
      warning:
        "Do not use this data as the basis for real evacuation or mitigation decisions.",
      linkText: "View data sources & methodology",
    },
    earlyWarning: {
      title: "Early Warning · Threshold Exceeded",
      summary:
        "{{count}} villages triggered a warning based on rainfall, river distance/elevation, and hotspot thresholds.",
      riskLevel: "Risk Level: {{level}}",
      more: "+{{count}} more villages are also on alert.",
      close: "Close warning",
    },
    actionGuide: {
      sectionLabel: "What you can do now",
      rendah: {
        title: "Low Risk",
        headline: "No special action needed. Keep monitoring the weather.",
        steps: [
          "Check weather and rainfall updates regularly",
          "Know your nearest evacuation/assembly point just in case",
        ],
      },
      sedang: {
        title: "Medium Risk",
        headline:
          "Check that you can still leave your house, and avoid areas near the river if rain picks up.",
        steps: [
          "Make sure your route out of the house is still clear",
          "Avoid activity near the river if rainfall increases",
          "Follow updates from your local BPBD/BMKG",
          "Keep important documents somewhere easy to grab",
        ],
      },
      tinggi: {
        title: "High Risk",
        headline:
          "Be ready to follow evacuation guidance and avoid flood-prone areas.",
        steps: [
          "Keep important documents somewhere safe",
          "Avoid areas near the river and low-lying ground",
          "Actively follow updates from your local BPBD",
          "Be ready to move to a safe point if conditions worsen",
        ],
      },
    },
    todayStatus: {
      title: "Today's Condition",
      badgeIcon: { tinggi: "🔴", sedang: "🟡", rendah: "🟢" },
      badgeLabel: {
        tinggi: "ALERT",
        sedang: "WATCH",
        rendah: "SAFE",
      },
      rainfallLabel: "Rainfall",
      mmUnit: "mm/day",
      hotspotLabel: "Hotspot",
      villagesUnit: "villages",
      floodRiskLabel: "Flood Risk",
      whyToggleShow: "Why?",
      whyToggleHide: "Close",
      villagesOnAlert:
        "{{count}} of {{total}} villages are currently on Watch or Alert status.",
      rainAlertNote:
        "{{count}} villages recorded extreme rainfall in the last 24 hours.",
    },
    shareWarning: {
      button: "Share",
      copied: "Copied!",
      titlePrefix: "Nagari Watch Warning",
      textOverall:
        "FLOOD RISK WARNING · {{level}}. {{count}} villages in {{kec}} Subdistrict are currently on alert. Updated {{time}}. Track conditions in Nagari Watch.",
    },
    filterBar: {
      label: "Risk Filter:",
      all: "All",
      high: "High",
      medium: "Medium",
      low: "Low",
    },
    mapLegend: {
      title: "Legend",
      hotspot: "Hotspot (FIRMS)",
      layerBase: "Base Map",
      layerSatellite: "Satellite Imagery",
      layerBoundary: "Leuser Ecosystem Boundary",
      boundaryError: "Failed to load Leuser Ecosystem boundary: {{error}}",
    },
    mapPopup: {
      floodRisk: "Flood risk",
      rainfall: "Rainfall",
      riverDistance: "Distance to river",
      elevation: "Elevation",
      hotspotTitle: "Hotspot (FIRMS)",
      detected: "Detected",
      confidence: "Confidence",
    },
    summaryCards: {
      totalDesa: "Total Villages",
      highRisk: "High Risk",
      mediumRisk: "Medium Risk",
      lowRisk: "Low Risk",
      highHotspotDesa: "Villages with High Hotspot Activity",
    },
    desaTable: {
      title: "Village List",
      titleWithFilter: "{{filter}} Risk Village List",
      colDesa: "Village",
      colRain: "Rainfall",
      colRiver: "River Distance",
      colElevation: "Elevation",
      colHotspot: "Hotspots (5 days)",
      colRisk: "Risk",
      empty: "No villages are currently at {{filter}} risk.",
      hotspotTooltip: "Click to view hotspot details",
      riskTooltip: "Click to see the risk score breakdown",
      pointsUnit: "points",
    },
    hotspotModal: {
      title: "Hotspots in {{name}}",
      close: "Close",
      subtitleWithPoints:
        "{{count}} points detected in the last 5 days (matching radius up to {{radius}} km)",
      subtitleEmpty:
        "No hotspots were detected around this village in the last 5 days.",
      colDateTime: "Detection date & time",
      colDistance: "Distance to Village",
      colConfidence: "Confidence",
      colFrp: "FRP (MW)",
      sourceNote:
        "Source: NASA FIRMS (VIIRS_SNPP_NRT). Confidence & FRP (Fire Radiative Power) help distinguish real fires/land clearing from false detections (e.g. heat reflection, industrial sources).",
    },
    riskExplainModal: {
      titleWhy: "Why {{level}} Risk? · {{name}}",
      close: "Close",
      riskLevelTag: "Risk Level",
      riskLevelDesc:
        ": determined by the rainfall, river distance, and elevation thresholds below.",
      riskScoreTag: "Risk Score",
      riskScoreDescPrefix: "{{score}}/100",
      riskScoreDesc:
        ": a supporting indicator showing the relative contribution of each factor, including hotspots.",
      riskScoreDescBukan: "Not",
      riskScoreDescSuffix:
        'what determines the Risk Level above, a score of 78 doesn\'t automatically mean "High".',
      breakdownIntro: "Risk Score breakdown:",
      weight: "weight {{pct}}%",
      actualValue: "Current value: {{val}}",
      threshold: "Threshold: {{val}}",
      footerNotePrefix:
        "See the full methodology, data sources, and system limitations on the",
      footerNoteLink: "Methodology & Data Sources",
      footerNoteSuffix:
        "page in the sidebar. These scores and thresholds are still MVP design choices and have not been calibrated with historical flood data.",
    },
    situationSummary: {
      badgeRiskLevel: "Risk Level: Rule-Based",
      badgeAiAssisted: "Situation Summary: AI-Assisted",
      heading: "Situation Summary · AI-Assisted",
      caption:
        "Generated from current monitoring indicators and resident reports. AI does not determine the risk level.",
      notConfigured:
        "This feature is not configured yet. Set VITE_SITUATION_SUMMARY_ENDPOINT to a deployed serverless function (see serverless-proxy/).",
      generateButton: "Generate Situation Summary",
      loading: "Putting together a summary from the current data…",
      errorPrefix: "Couldn't generate a summary: {{message}}",
      retryButton: "Try Again",
      regenerateButton: "Regenerate",
      limitationsLabel: "Limitations:",
    },
    evidenceDashboard: {
      title: "Evidence Dashboard",
      confidenceLabel: "Data confidence:",
      subtitle:
        "Evidence from rainfall trends, the Hotspot Pressure Indicator (experimental proxy), and month-to-month changes, alongside resident reports.",
      trendTitle: "Last 6 Months Trend",
      noHistory: "No monthly history yet.",
      rainfallDatasetLabel: "Average rainfall (mm)",
      hotspotDatasetLabel: "Average hotspots (per village)",
      yLeft: "mm/day",
      yRight: "points/village",
      changeRainfall: "Rainfall",
      changeHotspot: "Hotspots",
      changeHighRisk: "High Risk Villages",
      changeHotspotPressure: "Hotspot Pressure Indicator",
      unitMm: " mm",
      unitPoints: " points",
      unitDesa: " villages",
      unitPct: "%",
      vsLastMonth: "vs {{month}}",
      lastMonthFallback: "last month",
    },
    riskChart: {
      rainPerVillage: "Rainfall per Village",
      riskDistribution: "Risk Level Distribution",
      rainDatasetLabel: "Rainfall (mm/day)",
      yAxisLabel: "mm/day",
    },
    monthlyBrief: {
      title: "{{month}} Report",
      highRisk: "High Risk Village",
      avgRainfall: "Average Rainfall",
      hotspotTrend: "Hotspot Trend",
      hotspotPoints: "{{points}} points/village · {{count}} villages on alert",
      hotspotPressure: "Hotspot Pressure Indicator (experimental)",
      recommendation: "Recommendation",
    },
    reportStatus: {
      pending: "Pending",
      verified: "Verified",
      resolved: "Resolved",
    },
    communityReport: {
      title: "Community Report",
      subtitle:
        "Report flood or weather conditions at your location. Photos/videos are only previewed and are not uploaded to a server.",
      categoryLabel: "What happened?",
      categories: {
        flood: "🌊 Flood",
        fire: "🔥 Fire",
        landslide: "⛰️ Landslide",
        landClearing: "🌳 Land clearing",
        roadCut: "🚧 Road cut off",
        other: "⚠️ Other",
      },
      locationLabel: "Location",
      locationPlaceholder: "Select a village",
      descriptionLabel: "Description",
      descPlaceholder: "Example: river water rising fast",
      uploadLabel: "Upload Photo/Video",
      uploadPlaceholder: "Click to choose a photo or video",
      remove: "Remove",
      gpsLabel: "Location Metadata (GPS)",
      gpsButton: "Capture GPS Location",
      gpsLoading: "Getting location…",
      gpsDenied: "Location permission denied",
      gpsUnsupported: "GPS not supported on this device",
      gpsIdle: "Not captured yet",
      errorRequired: "Category, location, and description are required.",
      submit: "Submit Report",
      feedTitle: "Citizen Reports ({{count}})",
      prototypeNote:
        "Prototype: the status below only simulates the Pending → Verified → Resolved workflow. It is not connected to RT/RW/BPBD verification and is not stored permanently.",
      markAs: "Mark {{status}} →",
      photoAlt: "Report photo in {{location}}",
      previewAlt: "Citizen report preview",
    },
    communityReportPage: {
      title: "Community Report",
      subtitle: "Environmental condition reports from residents.",
    },
    crossBorderPage: {
      title: "Cross-Border Risk",
      subtitle:
        "Shows environmental risks that may be connected across subdistricts within the same watershed (DAS) in the Leuser Ecosystem area.",
      alertTitle: "Cross-Region Warning",
      alertLine: "{{msg}} Affected downstream areas: {{list}}.",
      rainLabel: "Rainfall",
      hotspotLabel: "Hotspots",
      perDesa: "/village",
      estimasiBadge: "Estimate",
      footerNote:
        "This feature is still an MVP. Only Ketambe Subdistrict currently has village data. Other subdistricts use temporary estimates until field data collection begins. The upstream–midstream–downstream order also needs to be verified with official hydrological data.",
      mvpDataNote: "MVP village data, see the Map page.",
      noDataNote: "No data collected yet.",
      posisi: {
        Hulu: "Upstream",
        Tengah: "Midstream",
        Hilir: "Downstream",
      },
      kecamatanNotes: {
        "tanoh-alas":
          "No village data yet. The current value is estimated from regional rainfall data.",
        "babul-rahmah":
          "No village data yet. The current value is estimated from regional rainfall data.",
        leuser:
          "No village data yet. The current value is estimated from regional rainfall data.",
        "lawe-alas":
          "Located downstream in the same watershed as Ketambe and Tanoh Alas, so it may be affected by water or sediment flow from upstream.",
      },
    },
    dashboardPage: {
      title: "Evidence Dashboard",
      subtitle:
        "Evidence of flood-risk conditions from several sources: rainfall anomalies, hotspot pressure (experimental proxy, not a land-use change measurement), and resident reports.",
      rainfallAnomaly: "Rainfall Anomaly",
      monitored: "Monitored",
      normal: "Normal",
      fromRainData: "from current village rainfall data",
      hotspotPressure: "Hotspot Pressure",
      desaUnit: "villages",
      hotspotSub:
        "high hotspot pressure (experimental proxy, not a land-use change measurement)",
      citizenReports: "Citizen Reports",
      reportsThisSession: "resident reports this session",
      verificationTitle: "Citizen Report Verification",
      prototypeBadge: "Prototype, no backend yet",
      verificationSub:
        "Simulated report verification flow: Pending → Verified → Resolved. Status is changed manually on the Community Report page and is not stored permanently.",
      reportsLabel: "Reports",
      latestReportsTitle: "Latest Resident Reports · Field Evidence",
    },
    monthlyReportPage: {
      title: "Monthly Report",
      subtitle: "Monthly flood risk summary for {{name}} Subdistrict.",
      generateReport: "Generate Report",
      downloadPdf: "Download PDF",
      printedHead: "Nagari Watch Monthly Report",
      printedOn: "{{name}} Subdistrict · printed {{date}}",
      printNote:
        "This report uses sample data for UI development. See Methodology & Data Sources for the status of each indicator.",
      thisMonth: "This month",
      highRiskVillage: "High Risk Village",
      mediumRiskVillage: "Medium Risk Village",
      lowRiskVillage: "Low Risk Village",
      avgRainfall: "Average Rainfall",
      hotspotTrend: "Hotspot Trend",
      hotspotPressureIndicator: "Hotspot Pressure Indicator",
      noDataForYear: "No report data yet for {{year}}.",
      pointsPerDesa: "points/village",
      footerNote:
        'Monthly data is still sample data for the {{name}} Subdistrict pilot. The "Hotspot Pressure Indicator" is an experimental proxy for hotspot trends, not a land-use change measurement. See Methodology for details.',
    },
    petaPage: {
      searchTitle: "Search for a location first",
      searchIntro:
        "Enter a village name in {{kec}} Subdistrict to see its flood risk map and data.",
      searchPlaceholder: "Example: Lawe Beringin, Ketambe, Jongar Asli...",
      searchButton: "Search",
      notFound: 'Village "{{query}}" not found.',
      viewAll: "or view all villages",
      changeLocation: "Search another location",
      rainLabel: "Rainfall",
      riverLabel: "River Distance",
      elevationLabel: "Elevation",
      householdLabel: "Households",
      rainUnit: "mm/day",
      riverUnit: "m",
      elevationUnit: "masl",
      dataNote:
        "Coordinates and indicator values in this file are sample data for UI development. Hotspots are used as a simple proxy for NASA FIRMS data.",
    },
    metodologi: {
      title: "Methodology & Data Sources",
      subtitle:
        "See where Nagari Watch gets its data, how risk levels are calculated, and what the system can and cannot tell you.",
      statusLegendTitle: "Data Status Legend",
      statusLegendIntro:
        "Each indicator has one of the following four statuses:",
      statusLegend: [
        {
          emoji: "🟢",
          label: "Real/Live",
          desc: "Data comes directly from the source and is updated automatically.",
        },
        {
          emoji: "🟡",
          label: "Mixed",
          desc: "Partly sourced from live data, partly manual, or not yet verified and stored permanently.",
        },
        {
          emoji: "🟠",
          label: "Simulated",
          desc: "Sample data for UI development, not field measurements.",
        },
        {
          emoji: "⚪",
          label: "Future Integration",
          desc: "Not available yet; still being planned.",
        },
      ],
      sourceTableTitle: "Data Source per Indicator",
      colIndicator: "Indicator",
      colCurrentStatus: "Current Data Status",
      colPlan: "Planned Data Source",
      colNote: "Note",
      sumberData: [
        {
          indikator: "Rainfall (mm/day)",
          statusSaatIni: "Open-Meteo (live), dummy if it fails/times out",
          statusTone: "mixed",
          rencana: "BMKG (nearest station)/satellite rainfall (GSMaP, CHIRPS)",
          catatan:
            "Rainfall comes from the Open-Meteo Forecast API when the connection works (🟢). If the request fails or times out, the system uses sample values from the village data file (🟡). Check the rainfall source panel for the current status.",
        },
        {
          indikator: "Distance to River (m) & Elevation (masl)",
          statusSaatIni: "Open-Meteo + OSM/Overpass (live), dummy if it fails",
          statusTone: "mixed",
          rencana: "DEM + official river network map (BWS)",
          catatan:
            "Elevation comes from Open-Meteo and river distance is calculated from OpenStreetMap waterway data through the Overpass API (🟢 when successful). If either source fails, the system uses sample values (🟡). OSM coverage may be less complete than an official BWS map, so the results are estimates.",
        },
        {
          indikator: "Hotspots (last 5 days)",
          statusSaatIni: "NASA FIRMS (if MAP_KEY connected), dummy if not",
          statusTone: "mixed",
          rencana:
            "Already usable directly from the NASA FIRMS Area API (VIIRS_SNPP_NRT)",
          catatan:
            'Hotspots can use NASA FIRMS satellite data when a MAP_KEY is connected (🟢). When using the demo proxy, the status is 🟡. Check the "Hotspot data source" panel for the current connection.',
        },
        {
          indikator: "Number of Households",
          statusSaatIni: "Dummy data",
          statusTone: "dummy",
          rencana: "BPS (village data)/local Dukcapil",
          catatan:
            "Used for impact context, does not yet affect the risk score.",
        },
        {
          indikator: "Citizen Reports (Community Report)",
          statusSaatIni:
            "Manual input from this session's users (not stored permanently)",
          statusTone: "mixed",
          rencana:
            "Centralized database + tiered verification workflow (RT/RW → Damkarhut/BPBD)",
          catatan:
            "There is no verification process yet. Incoming reports are shown as submitted. See the roadmap for the next steps.",
        },
        {
          indikator: "Other Subdistrict Estimates (Cross-Border Risk)",
          statusSaatIni: "Rough estimate, not a data collection result",
          statusTone: "dummy",
          rencana: "Field data collection per subdistrict",
          catatan:
            "Only Ketambe Subdistrict currently has village data. Other subdistricts are shown to give context for the watershed coverage.",
        },
        {
          indikator: "Threshold & Score Calibration (historical validation)",
          statusSaatIni: "Not built yet",
          statusTone: "future",
          rencana:
            "Calibrate thresholds/weights with historical flood event data (BPBD) + a validated predictive model",
          catatan:
            "Current thresholds and weights are still MVP design choices and have not been calibrated with historical data.",
        },
      ],
      toneText: {
        dummy: "SIMULATED",
        mixed: "MIXED",
        real: "REAL",
        future: "FUTURE",
      },
      scoreTitle: "How the Risk Score & Level Are Calculated",
      scoreIntroPrefix: "Nagari Watch uses",
      scoreIntroBold: "threshold logic (not machine learning)",
      scoreIntroSuffix:
        "so the results are easy to explain to residents and village officials.",
      riskLevelTag: "Risk Level",
      riskLevelAuthoritative: "Primary decision rule.",
      riskLevelDesc:
        "High/Medium/Low is determined by the following threshold rules (OR-logic):",
      riskLevelFormula:
        "rainfall >{{hujan}} mm OR (river distance <{{sungai}} m AND elevation <{{elevasi}} masl)",
      riskLevelFooter: "Hotspots do not factor into this level.",
      whyThresholdsTitle: "Why These Thresholds?",
      whyThresholdsRainQ: "Why >100 mm/day?",
      whyThresholdsRainA:
        'This lines up with BMKG\'s "very heavy rain" category (>100 mm/day, bordering the extreme category above 150 mm/day), it is not a threshold calibrated specifically for Ketambe.',
      whyThresholdsRiverQ: "Why <200 m from a river & <50 masl?",
      whyThresholdsRiverA:
        "This is a simple river-distance heuristic used in flood-hazard mapping. It is easy to explain, but has not been validated against local topography or flood history in Ketambe.",
      whyThresholdsPoints: [
        "These are initial thresholds based on domain knowledge, not thresholds learned from data.",
        "This is not a predictive model. It does not estimate flood probability; it classifies current conditions into a risk category.",
        "These thresholds have not been calibrated using historical flood events in Ketambe.",
        "Next step: calibrate the thresholds and weights using historical BPBD/BMKG data and flood events in the Alas River watershed.",
      ],
      riskScoreTag: "Risk Score",
      riskScoreSupplementary: "Supporting indicator.",
      riskScoreDesc:
        "The 0–100 score shows the relative contribution of each indicator, including hotspots. This score",
      riskScoreDescNot: "does not",
      riskScoreDescSuffix:
        'does not determine the Risk Level above. There is no score threshold such as "≥70 = High" used to assign village status.',
      weightsIntro: "Weights used for the Risk Score, not the Risk Level:",
      weightRain: "Rainfall",
      weightRainSub: "High if >{{val}} mm/day",
      weightRiver: "River & Elevation",
      weightRiverSub: "High if <{{sungai}} m AND <{{elevasi}} masl",
      weightHotspot: "Hotspots",
      weightHotspotSub: "High if ≥{{val}} points/5 days",
      scoreFooterNote:
        'Click a risk badge in the "Village List" to see each indicator value, the threshold used, and its contribution to the final score.',
      limitationsTitle: "Limitations & Important Notes",
      limitations: [
        "Rainfall, river distance, and elevation thresholds are still MVP design choices and have not been calibrated with historical flood data from Ketambe.",
        "Village data (rainfall, river distance, elevation, households) is sample data used to simulate risk variation for UI development, not field measurements.",
        "FIRMS detects a range of heat sources. Results should be verified in the field before being used for action.",
        "Resident reports are not yet verified or stored permanently; they are lost when the page is refreshed.",
        "Do not use Nagari Watch as the sole basis for evacuation or disaster-mitigation decisions. Follow guidance from your local BPBD/BMKG.",
      ],
    },
  },
};
