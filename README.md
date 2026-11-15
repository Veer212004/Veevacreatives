# Veeva Creatives website (React + Vite + Express)

## Run

    npm install
    copy .env.example .env
    npm run dev        # frontend at http://localhost:5173
    npm run dev:server # in a second terminal, API at http://localhost:3001
    npm test
    npm run build

## Project enquiries

The contact form posts to the Express API. Valid enquiries are saved in
`data/enquiries.sqlite` (configurable with `DB_PATH`) before email delivery is
attempted. The API sends a confirmation to the customer and a notification to
`STUDIO_EMAIL`. If email is unavailable, the enquiry remains saved and the site
still confirms receipt.

To enable email, set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and
optionally `SMTP_SECURE` and `SMTP_FROM` in `.env`. Use an SMTP app password or
provider credential; never put SMTP credentials in frontend code. The customer
confirmation says the studio will respond within 24 hours.

For production, build the frontend and run `npm start` on a Node.js host with
`NODE_ENV=production`. The Express server serves `dist/` and the API together.
Mount persistent storage for the SQLite database (and set `DB_PATH` to that
location); local filesystems on serverless hosts may be temporary. Keep the
database private and back it up regularly. If deployed behind a trusted reverse
proxy, set `TRUST_PROXY_HOPS` to the number of proxy hops so request throttling
uses the original client address.

## Add work

Edit `WORKS` in src/App.jsx. Put images in public/assets/portfolio and list their keys; similar posters go in one work's image list. Videos live in public/assets/video.

## Not done yet

Privacy policy page, 404 page, final logo file, real client demos.
