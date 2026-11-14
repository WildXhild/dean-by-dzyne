# Dean by D'Zyne

**Digital Solutions. Real Results.**

Dean by D'Zyne is a Nigerian digital-solutions studio offering digital integration, website development, software, SEO, AI automation and branding. The studio is remote-first, serving clients across Nigeria, with a focus on Lagos and Oyo.

## Technology

- Semantic HTML5
- CSS3 with custom properties, responsive layouts and motion preferences
- Vue 3 via CDN for reactive interface behavior
- Vanilla JavaScript for interactions and browser APIs
- Node.js and Express backend for contact submissions
- Netlify for static-site hosting and Git-based deployment

No frontend build step or framework migration is required.

## Repository structure

```text
.
├── index.html                 # Main website
├── css/styles.css             # Brand system, layout and animations
├── js/app.js                  # Vue app and browser interactions
├── Images/                    # Logo, partner artwork and service media
├── backend/                   # Express API and admin dashboard
│   ├── server.js
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── package.json
├── docs/                      # Project and implementation documentation
├── favicon.png
├── sitemap.xml
├── robots.txt
├── netlify.toml
└── _headers
```

## Run the website locally

From the repository root, serve the static files with any local HTTP server.

Python:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

Alternatively, use the VS Code Live Server extension. Opening index.html directly with file:// is less reliable for browser APIs and relative resources.

## Run the contact API locally

The backend is separate from the Netlify static site.

```bash
cd backend
npm install
cp .env.example .env
```

Edit backend/.env with the email provider credentials and allowed frontend origin, then run:

```bash
npm start
```

The API listens on port 5000 by default. The browser frontend accepts an optional `window.DEAN_API_BASE_URL` value to configure the API base URL. Set this to the deployed API origin before using the live contact form; localhost is only a local-development fallback.

**Deployment note:** Netlify deploys the static frontend. It does not host this Express server automatically. Deploy the backend to a Node-capable host and configure CORS and environment variables there.

## Deploy to Netlify

1. Connect this GitHub repository to Netlify.
2. Select the `main` branch after the reviewed changes have been merged.
3. Leave the build command empty.
4. Set the publish directory to the repository root (`.`).
5. Deploy. Netlify serves index.html and applies netlify.toml and _headers.
6. Configure the production API base URL and backend CORS origin separately.

Pull-request branches can be deployed as Netlify Deploy Previews for review before merging.

## Configuration and security

- Keep real credentials in local environment files or the backend hosting provider's secret settings.
- Never commit .env files, API keys, mail passwords or private submission data.
- Root and backend ignore rules cover environment files and local development artifacts.
- The backend's submission-management endpoints currently require an authentication/security review before public production use. Do not expose the admin dashboard or submission endpoints to the public internet without access control.

## Documentation

Historical implementation notes, setup guides, backend instructions and QA references are kept under [docs/](docs/). The current pre-change audit is [docs/PRE-IMPLEMENTATION-AUDIT.md](docs/PRE-IMPLEMENTATION-AUDIT.md).

## Contact

- Email: deanbydzyne@gmail.com
- WhatsApp / phone: +234 814 382 4044
- Service area: Remote-first, serving clients across Nigeria • Lagos & Oyo
- Website: https://deanbydzyne.netlify.app
