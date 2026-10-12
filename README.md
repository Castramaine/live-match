# Live Match

Single-page football standings app with live data from Football-Data.org and a server-side proxy for secure API key handling.

## Features
- Live league standings for Premier League, Ligue 1, La Liga, Serie A, and Bundesliga
- Compare any two teams in the same league
- Auto-refresh with manual refresh control
- Works with a Vercel or Netlify serverless proxy
- Great for single-file deployment on static hosting

## Files
- `index.html` — frontend app
- `api/standings.js` — Vercel serverless function
- `functions/standings.js` — Netlify serverless function

## Setup
### Vercel
1. Import the repo into Vercel.
2. Add environment variable:
   - `FOOTBALL_DATA_KEY` = your Football-Data.org API key
3. Deploy.
4. App will call `/api/standings?league=PL` automatically.

### Netlify
1. Import the repo into Netlify.
2. Add environment variable:
   - `FOOTBALL_DATA_KEY` = your Football-Data.org API key
3. Deploy.
4. App will try `/.netlify/functions/standings?league=PL` automatically.

## Local testing (development only)
You may save a temporary key in the browser with the UI. This is fine for testing, but avoid exposing keys in production front-end code.

## License
MIT
