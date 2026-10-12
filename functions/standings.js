const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

exports.handler = async function (event) {
  const league = (event.queryStringParameters && event.queryStringParameters.league)
    ? event.queryStringParameters.league.toUpperCase()
    : 'PL';

  const API_KEY = process.env.FOOTBALL_DATA_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'missing_api_key',
        message: 'FOOTBALL_DATA_KEY is not set in environment.'
      })
    };
  }

  const url = `https://api.football-data.org/v4/competitions/${league}/standings`;

  try {
    const r = await fetch(url, {
      headers: { 'X-Auth-Token': API_KEY }
    });

    const body = await r.text();
    return {
      statusCode: r.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({
        error: 'proxy_error',
        message: err.message
      })
    };
  }
};
