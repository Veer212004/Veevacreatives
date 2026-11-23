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

To send email from Gmail without owning a domain, enable Google 2-Step
Verification and create a Google App Password. Set `SMTP_HOST=smtp.gmail.com`,
`SMTP_PORT=465`, `SMTP_SECURE=true`, `SMTP_USER`, `SMTP_PASS` (the App Password,
not the Gmail account password), and `SMTP_FROM` to the same Gmail address.
Never put SMTP credentials in frontend code or commit them. For Vercel, add
these values in Project Settings → Environment Variables, then redeploy. Gmail
may apply sending limits; this setup is intended for normal enquiry volume, not
bulk email. Customer confirmations include the submitted project details.

The Git repository root contains `package.json`, `src/`, and `api/`; leave the
Vercel Root Directory blank so the build and enquiry function are detected.

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
