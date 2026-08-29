# Nagari Watch

Early-warning dashboard for flood risk and environmental pressure in Kecamatan Ketambe, Aceh Tenggara, within the Leuser Ecosystem.

Nagari Watch brings rainfall, river proximity, elevation, satellite hotspots, and community reports into one place. It helps users see which villages are showing higher-risk conditions and why.

## Features

- Risk map for villages in Kecamatan Ketambe
- Village-level Risk Level: High, Medium, Low
- Risk explanation with indicator values and thresholds
- NASA FIRMS satellite hotspot data
- Community incident reports
- Monthly risk brief
- Cross-district risk context
- Methodology and data transparency page
- Optional AI Situation Summary using Gemini
- Optional high-risk email notifications

## Data

The current MVP uses a mix of live, sample, and estimated data.

NASA FIRMS hotspot data can be live when a MAP_KEY is configured. Rainfall, river distance, elevation, and household data currently use sample or estimated values.

Because the current thresholds have not been calibrated against historical flood records, Nagari Watch is for demonstration and research purposes. It should not be used as the sole basis for evacuation or emergency decisions.

## Tech Stack

React, Vite, React Leaflet, Leaflet, Chart.js, NASA FIRMS, Open-Meteo, OpenStreetMap/Overpass, and optional Gemini, Cloudflare Workers, D1, and Resend integrations.

## Optional NASA FIRMS Setup

The dashboard can use sample hotspot data without a key.

To enable live hotspot data, configure a NASA FIRMS MAP_KEY. For a public deployment, keeping the key on the server through the included proxy is recommended.

## Status

MVP demonstration/research project.

Nagari Watch is currently focused on making environmental data easier to understand at the village level while being transparent about its current limitations.

For the detailed methodology and data status, see the Metodologi & Sumber Data page in the application.

## References

BMKG. Analisis Laju Perubahan Curah Hujan.
https://www.bmkg.go.id/iklim/analisis-laju-perubahan-curah-hujan

Peraturan Menteri PUPR No. 28/PRT/M/2015 tentang Penetapan Garis Sempadan Sungai dan Garis Sempadan Danau.
https://peraturan.bpk.go.id/Home/Details/159992/permen-pupr-no-28prtm2015-tahun-

NASA FIRMS / LANCE. VIIRS 375m Active Fire Product - FAQ
https://www.earthdata.nasa.gov/data/tools/firms/faq

Open-Meteo. Elevation API documentation.
https://open-meteo.com/en/docs/elevation-api

OpenStreetMap Wiki. Overpass API.
https://wiki.openstreetmap.org/wiki/Overpass_API
