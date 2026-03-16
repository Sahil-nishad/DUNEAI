// ═══════════════════════════════════════════════════════
//  DuneAI Backend Server
//  File: server.js
//
//  Routes:
//    POST /api/contact        — Contact form (3-step modal)
//    POST /api/enquiry        — Quick enquiry (CTA buttons)
//    POST /api/newsletter     — Newsletter signup
//    GET  /api/health         — Health check
// ═══════════════════════════════════════════════════════

require('dotenv').config();

const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');

const { adminEmailHTML, clientEmailHTML } = require('./emailTemplates');

const app  = express();
const PORT = process.env.PORT || 3001;

// ─────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// CORS — only allow your frontend origin
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Rate limiting — max 10 submissions per 15 minutes per IP
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max:      parseInt(process.env.RATE_LIMIT_MAX)        || 10,
  message:  { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders:   false,
});
app.use('/api/', limiter);


// ─────────────────────────────────────────
// NODEMAILER TRANSPORTER
// ─────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  },
});

// Verify SMTP connection on startup
transporter.verify((err, success) => {
  if (err) {
    console.error('❌ SMTP connection failed:', err.message);
    console.error('   Check your .env SMTP_USER / SMTP_PASS settings.');
  } else {
    console.log('✅ SMTP connected — DuneAI mail system ready');
  }
});


// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

/** Basic email validation */
function isValidEmail(email) {
  return typeof email === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Sanitise input: trim strings, remove script tags */
function sanitise(val) {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
}

/** Send email via transporter — returns promise */
async function sendMail(options) {
  return transporter.sendMail({
    from: `"DuneAI" <${process.env.SMTP_USER}>`,
    ...options,
  });
}


// ─────────────────────────────────────────
// ROUTE: Health Check
// GET /api/health
// ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status:  'DuneAI backend is operational 🌑',
    time:    new Date().toISOString(),
  });
});


// ─────────────────────────────────────────
// ROUTE: Full Contact Form (3-step modal)
// POST /api/contact
// Body: { name, email, company, role, heard,
//         service, budget, timeline,
//         desc, data, whatsapp }
// ─────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    // ── Extract & sanitise ──
    const name      = sanitise(req.body.name);
    const email     = sanitise(req.body.email);
    const company   = sanitise(req.body.company);
    const role      = sanitise(req.body.role);
    const heard     = sanitise(req.body.heard);
    const service   = sanitise(req.body.service);
    const budget    = sanitise(req.body.budget);
    const timeline  = sanitise(req.body.timeline);
    const desc      = sanitise(req.body.desc);
    const data      = sanitise(req.body.data);
    const whatsapp  = sanitise(req.body.whatsapp);

    // ── Validate required fields ──
    if (!name)               return res.status(400).json({ success: false, message: 'Name is required.' });
    if (!isValidEmail(email)) return res.status(400).json({ success: false, message: 'Valid email is required.' });
    if (!service)            return res.status(400).json({ success: false, message: 'Service selection is required.' });
    if (!budget)             return res.status(400).json({ success: false, message: 'Budget selection is required.' });
    if (!desc || desc.length < 20) return res.status(400).json({ success: false, message: 'Project description too short (min 20 chars).' });

    const payload = { name, email, company, role, heard, service, budget, timeline, desc, data, whatsapp };

    // ── 1. Send admin notification to hello@duneai.in ──
    await sendMail({
      to:      process.env.DUNEAI_EMAIL || 'hello@duneai.in',
      replyTo: email,
      subject: `🌑 New DuneAI Enquiry — ${service} | ${name}`,
      html:    adminEmailHTML(payload),
      text:    buildAdminPlainText(payload),
    });

    // ── 2. Send confirmation to client ──
    await sendMail({
      to:      email,
      subject: `You're Now Duning With Us 🌑 — DuneAI`,
      html:    clientEmailHTML({ name }),
      text:    buildClientPlainText(name),
    });

    console.log(`✅ Contact form → ${email} | Service: ${service} | Budget: ${budget}`);

    return res.status(200).json({
      success: true,
      message: `Transmission received. We'll contact ${name.split(' ')[0]} within 24 hours.`,
    });

  } catch (err) {
    console.error('❌ /api/contact error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to send. Please email us directly at hello@duneai.in',
    });
  }
});


// ─────────────────────────────────────────
// ROUTE: Quick Enquiry (CTA section buttons)
// POST /api/enquiry
// Body: { name, email, message, type }
// type: "strategy_call" | "start_project"
// ─────────────────────────────────────────
app.post('/api/enquiry', async (req, res) => {
  try {
    const name    = sanitise(req.body.name);
    const email   = sanitise(req.body.email);
    const message = sanitise(req.body.message);
    const type    = sanitise(req.body.type) || 'general';

    if (!name)                return res.status(400).json({ success: false, message: 'Name is required.' });
    if (!isValidEmail(email)) return res.status(400).json({ success: false, message: 'Valid email is required.' });

    const typeLabel = type === 'strategy_call' ? '📞 Book Strategy Call'
                    : type === 'start_project' ? '🚀 Start Your Project'
                    : '💬 General Enquiry';

    // Admin notification
    await sendMail({
      to:      process.env.DUNEAI_EMAIL || 'hello@duneai.in',
      replyTo: email,
      subject: `🌑 DuneAI Enquiry — ${typeLabel} | ${name}`,
      html: `
        <div style="background:#050508;font-family:Arial,sans-serif;color:#f0ede6;padding:32px;border-radius:8px;max-width:560px;margin:0 auto;border:1px solid rgba(201,168,106,.2);">
          <div style="font-size:1.3rem;font-weight:700;letter-spacing:.14em;color:#C9A86A;margin-bottom:20px;">🌑 DUNEAI</div>
          <div style="background:rgba(201,168,106,.07);border:1px solid rgba(201,168,106,.2);border-radius:4px;padding:14px;margin-bottom:20px;font-size:.82rem;color:#C9A86A;letter-spacing:.08em;">${typeLabel}</div>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b6870;font-size:.78rem;width:110px;">Name</td><td style="padding:8px 0;font-size:.88rem;color:#C9A86A;font-weight:600;">${escHtml(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#6b6870;font-size:.78rem;">Email</td><td style="padding:8px 0;font-size:.88rem;"><a href="mailto:${escHtml(email)}" style="color:#5BE7FF;">${escHtml(email)}</a></td></tr>
            ${message ? `<tr><td style="padding:8px 0;color:#6b6870;font-size:.78rem;vertical-align:top;">Message</td><td style="padding:8px 0;font-size:.85rem;color:#f0ede6;line-height:1.6;">${escHtml(message)}</td></tr>` : ''}
          </table>
          <div style="margin-top:24px;text-align:center;">
            <a href="mailto:${escHtml(email)}?subject=Re: Your DuneAI Enquiry" style="background:#C9A86A;color:#050508;padding:10px 24px;border-radius:3px;font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;">Reply to ${escHtml(name.split(' ')[0])} →</a>
          </div>
        </div>
      `,
      text: `DuneAI Enquiry\n\nType: ${typeLabel}\nName: ${name}\nEmail: ${email}\nMessage: ${message || '—'}`,
    });

    // Client confirmation
    await sendMail({
      to:      email,
      subject: `You're Now Duning With Us 🌑 — DuneAI`,
      html:    clientEmailHTML({ name }),
      text:    buildClientPlainText(name),
    });

    console.log(`✅ Enquiry (${type}) → ${email} | ${name}`);

    return res.status(200).json({
      success: true,
      message: `Got it! We'll reach out to ${name.split(' ')[0]} within 24 hours.`,
    });

  } catch (err) {
    console.error('❌ /api/enquiry error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to send. Please email us directly at hello@duneai.in',
    });
  }
});


// ─────────────────────────────────────────
// ROUTE: Newsletter Signup (footer)
// POST /api/newsletter
// Body: { email }
// ─────────────────────────────────────────
app.post('/api/newsletter', async (req, res) => {
  try {
    const email = sanitise(req.body.email);
    if (!isValidEmail(email)) return res.status(400).json({ success: false, message: 'Valid email required.' });

    // Notify admin
    await sendMail({
      to:      process.env.DUNEAI_EMAIL || 'hello@duneai.in',
      subject: `🌑 DuneAI Newsletter Signup — ${email}`,
      html: `<div style="background:#050508;font-family:Arial,sans-serif;color:#f0ede6;padding:32px;border-radius:8px;max-width:480px;margin:0 auto;border:1px solid rgba(201,168,106,.2);"><div style="font-size:1.2rem;font-weight:700;letter-spacing:.14em;color:#C9A86A;margin-bottom:16px;">🌑 DUNEAI</div><p style="color:#6b6870;font-size:.88rem;margin-bottom:12px;">New newsletter subscriber:</p><p style="font-size:1rem;color:#5BE7FF;"><a href="mailto:${escHtml(email)}" style="color:#5BE7FF;">${escHtml(email)}</a></p></div>`,
      text: `New DuneAI newsletter subscriber: ${email}`,
    });

    console.log(`✅ Newsletter signup → ${email}`);

    return res.status(200).json({ success: true, message: 'Subscribed! Welcome to the DuneAI network.' });

  } catch (err) {
    console.error('❌ /api/newsletter error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed. Please try again.' });
  }
});


// ─────────────────────────────────────────
// PLAIN TEXT FALLBACKS (email clients)
// ─────────────────────────────────────────
function buildAdminPlainText({ name, email, company, role, heard, service, budget, timeline, desc, data, whatsapp }) {
  return `
DuneAI — New Client Enquiry
============================

CLIENT DETAILS
--------------
Name:      ${name}
Email:     ${email}
Company:   ${company || '—'}
Role:      ${role || '—'}
WhatsApp:  ${whatsapp || '—'}
Found Us:  ${heard || '—'}

PROJECT DETAILS
---------------
Service:   ${service}
Budget:    ${budget}
Timeline:  ${timeline || '—'}
Data/Sys:  ${data || '—'}

PROJECT DESCRIPTION
-------------------
${desc}

---
DuneAI · hello@duneai.in · Built from the future 🌑
`.trim();
}

function buildClientPlainText(name) {
  const firstName = name.split(' ')[0];
  return `
You're Now Duning With Us 🌑
==============================

The desert has received your signal, ${firstName}.
Our intelligence systems are already processing your brief.

WHAT HAPPENS NEXT
-----------------
1. A DuneAI strategist will contact you within 24 hours.
2. We'll review your project and prepare a tailored AI roadmap.
3. Free 45-minute strategy session — zero pressure, pure value.

"The mystery of life isn't a problem to solve,
 but a reality to experience."
— Frank Herbert, Dune

Questions? Reach us: hello@duneai.in

DuneAI · Built from the future 🌑
`.trim();
}

// Helper for inline HTML emails
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


// ─────────────────────────────────────────
// 404 handler
// ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});


// ─────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌑 DuneAI Backend running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Email target: ${process.env.DUNEAI_EMAIL || 'hello@duneai.in'}\n`);
});

module.exports = app;
