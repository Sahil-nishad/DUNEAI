# 🌑 DuneAI Backend
## Email API Server — Contact Form → hello@duneai.in

---

## 📁 File Structure

```
duneai-backend/
├── server.js                    ← Main Express server (all API routes)
├── emailTemplates.js            ← HTML email templates (admin + client)
├── api.js                       ← Frontend connector (add to your HTML)
├── ContactModal-api-patch.html  ← Updated cmSubmitForm() for real API
├── test-email.js                ← SMTP connection test script
├── package.json
├── .env.example                 ← Copy to .env and fill in values
└── .gitignore
```

---

## ⚡ Quick Start (5 minutes)

### Step 1 — Install dependencies
```bash
cd duneai-backend
npm install
```

### Step 2 — Configure environment
```bash
cp .env.example .env
```
Open `.env` and fill in your SMTP credentials:
```env
SMTP_USER=hello@duneai.in
SMTP_PASS=your_app_password
DUNEAI_EMAIL=hello@duneai.in
```

### Step 3 — Get your App Password (Gmail)
> If hello@duneai.in is a Gmail / Google Workspace account:
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Security → 2-Step Verification → **App Passwords**
3. Select "Mail" → Generate
4. Copy the 16-character password into `SMTP_PASS` in your `.env`

### Step 4 — Test email delivery
```bash
node test-email.js
```
You should receive a test email at hello@duneai.in within seconds.

### Step 5 — Start the server
```bash
npm start          # Production
npm run dev        # Development (auto-restart)
```

---

## 🔗 API Endpoints

| Method | Route              | Description                        |
|--------|--------------------|------------------------------------|
| GET    | `/api/health`      | Health check                       |
| POST   | `/api/contact`     | Full 3-step contact form           |
| POST   | `/api/enquiry`     | Quick CTA button enquiry           |
| POST   | `/api/newsletter`  | Newsletter signup                  |

### POST /api/contact — Full form
```json
{
  "name":     "Sahil Khan",
  "email":    "sahil@company.com",
  "company":  "Acme Corp",
  "role":     "Founder",
  "heard":    "LinkedIn",
  "service":  "AI Agents Development",
  "budget":   "$5,000 – $15,000",
  "timeline": "1–3 months",
  "desc":     "I need an AI agent that...",
  "data":     "Yes — data only",
  "whatsapp": "+91 98765 43210"
}
```

### POST /api/enquiry — Quick button
```json
{
  "name":    "Sahil Khan",
  "email":   "sahil@company.com",
  "message": "I'd like to book a strategy call",
  "type":    "strategy_call"
}
```

---

## 🔌 Connect Frontend to Backend

### 1. Add api.js to your HTML
```html
<!-- Add before </body> in index.html -->
<script src="/js/api.js"></script>
```

### 2. Set your backend URL in api.js
```js
// For local dev:
const DUNEAI_API_URL = 'http://localhost:3001';

// For production (after deploying):
const DUNEAI_API_URL = 'https://api.duneai.in';
```

### 3. Replace cmSubmitForm() in ContactModal
Open `ContactModal-api-patch.html` and copy the `cmSubmitForm()` function.
Replace the old function in your `ContactModal.html` or `index.html`.

---

## 🚀 Deploy to Production

### Option A — Render.com (Free tier, recommended)
1. Push your backend folder to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your repo
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Add environment variables from your `.env`
7. Deploy → Copy your URL (e.g. `https://duneai-backend.onrender.com`)
8. Update `DUNEAI_API_URL` in `api.js` to your Render URL

### Option B — Railway.app
```bash
npm install -g @railway/cli
railway login
railway init
railway up
railway variables set SMTP_USER=hello@duneai.in SMTP_PASS=xxx ...
```

### Option C — VPS / DigitalOcean
```bash
# On your server:
git clone your-repo
cd duneai-backend
npm install
cp .env.example .env
nano .env  # fill in values

# Run with PM2 (keeps it alive)
npm install -g pm2
pm2 start server.js --name duneai-backend
pm2 save
pm2 startup
```

### Option D — Vercel Serverless
Convert `server.js` to `api/contact.js` (Vercel serverless function format).
Let me know and I'll generate the Vercel version.

---

## 📧 Email Flow

```
User fills form → Clicks "Dune With Us"
        ↓
Frontend (api.js) → POST /api/contact → server.js
        ↓
server.js validates + sanitises input
        ↓
    ┌───────────────────────────────┐
    │  Email 1 → hello@duneai.in   │  ← Admin notification with all details
    │  Email 2 → user@email.com    │  ← Client confirmation "Duning With Us"
    └───────────────────────────────┘
        ↓
Success response → Frontend shows success screen
```

---

## 🔒 Security Features

- **Rate limiting** — 10 requests per 15 min per IP
- **Input sanitisation** — strips HTML/script tags
- **Helmet** — security headers
- **CORS** — locked to your frontend domain
- **Email validation** — regex check before sending
- **Content-Length limit** — 10kb max request body

---

## 🛠 SMTP Provider Options

| Provider          | SMTP Host            | Port | Notes                          |
|-------------------|----------------------|------|--------------------------------|
| Gmail / Workspace | smtp.gmail.com       | 587  | Use App Password (not real pw) |
| Zoho Mail         | smtp.zoho.in         | 587  | Good for Indian domains        |
| Outlook/365       | smtp.office365.com   | 587  | Use app-specific password      |
| SendGrid          | smtp.sendgrid.net    | 587  | Best for scale / deliverability|
| Namecheap         | mail.privateemail.com| 587  | Included with domain hosting   |

---

*DuneAI Backend — Built from the future 🌑*
