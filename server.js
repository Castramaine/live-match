const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const API_KEY = process.env.FOOTBALL_DATA_KEY;

app.use(express.static(__dirname));

app.get('/api/standings', async (req, res) => {
  const league = (req.query.league || 'PL').toUpperCase();

  if (!API_KEY) {
    return res.status(500).json({
      error: 'missing_api_key',
      message: 'Set FOOTBALL_DATA_KEY before running the local server.'
    });
  }

  try {
    const response = await fetch(`https://api.football-data.org/v4/competitions/${league}/standings`, {
      headers: { 'X-Auth-Token': API_KEY }
    });

    const text = await response.text();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).send(text);
  } catch (err) {
    res.status(502).json({
      error: 'proxy_error',
      message: err.message
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Live Match is running at http://localhost:${port}`);
  console.log('Set FOOTBALL_DATA_KEY before starting, or use Vercel/Netlify env vars for permanent deployment.');
});
