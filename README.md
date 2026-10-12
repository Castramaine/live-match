# Live Match

Single-page football standings app with live data from Football-Data.org and a server-side proxy for secure API key handling.

## Important: browser-only direct calls to Football-Data.org will fail
Football-Data.org does not reliably allow direct browser requests from a static site. The correct setup is either:
- deploy to Vercel or Netlify with a serverless function and `FOOTBALL_DATA_KEY`, or
- run the included local proxy via `node server.js` with the key set as an environment variable.

## Features
- Live league standings for Premier League, Ligue 1, La Liga, Serie A, and Bundesliga
- Compare any two teams in the same league
- Auto-refresh with manual refresh control
- Works with a Vercel or Netlify serverless proxy
- Includes a local Node proxy for testing without exposing the key in-browser

## Files
- `index.html` — frontend app
- `api/standings.js` — Vercel serverless function
- `functions/standings.js` — Netlify serverless function
- `server.js` — local proxy for a quick localhost run
- `package.json` — Node script setup

## Local testing
1. Create a `.env` file or export your key:
   ```bash
   export FOOTBALL_DATA_KEY=your_key_here
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm start
   ```
4. Visit http://localhost:3000

This will serve the frontend and proxy requests through `/api/standings` to Football-Data.org.

## Vercel
1. Import the repo into Vercel.
2. Add environment variable:
   - `FOOTBALL_DATA_KEY` = your Football-Data.org API key
3. Deploy.
4. App will call `/api/standings?league=PL` automatically.

## Netlify
1. Import the repo into Netlify.
2. Add environment variable:
   - `FOOTBALL_DATA_KEY` = your Football-Data.org API key
3. Deploy.
4. App will try `/.netlify/functions/standings?league=PL` automatically.

## License
MIT
