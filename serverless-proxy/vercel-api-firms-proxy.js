const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("Parameter ?url= wajib diisi");
  }

  if (!targetUrl.startsWith("https://firms.modaps.eosdis.nasa.gov/")) {
    return res
      .status(403)
      .send("Hanya boleh proxy ke firms.modaps.eosdis.nasa.gov");
  }

  try {
    const upstream = await fetch(targetUrl);
    const text = await upstream.text();

    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    return res.status(upstream.status).send(text);
  } catch (err) {
    return res.status(502).send(`Gagal fetch FIRMS: ${err.message}`);
  }
}
