export default async function handler(req, res) {
  const league = (req.query.league || 'PL').toUpperCase();
  const API_KEY = process.env.FOOTBALL_DATA_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      error: 'missing_api_key',
      message: 'FOOTBALL_DATA_KEY is not set in environment.'
    });
  }

  const url = `https://api.football-data.org/v4/competitions/${league}/standings`;

  try {
    const r = await fetch(url, {
      headers: { 'X-Auth-Token': API_KEY }
    });

    const body = await r.text();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(r.status).send(body);
  } catch (err) {
    res.status(502).json({
      error: 'proxy_error',
      message: err.message
    });
  }
}
