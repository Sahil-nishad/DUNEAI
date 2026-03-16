// ═══════════════════════════════════════
//  DuneAI — Email Template Builder
//  File: emailTemplates.js
//  Generates HTML emails for:
//    - Admin notification (sent to hello@duneai.in)
//    - Client confirmation (sent to the user)
// ═══════════════════════════════════════

/**
 * Admin notification email — sent to hello@duneai.in
 * whenever a contact form is submitted
 */
function adminEmailHTML({ name, email, company, role, heard, service, budget, timeline, desc, data, whatsapp }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New DuneAI Enquiry</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#050508; font-family:'Helvetica Neue',Arial,sans-serif; color:#f0ede6; }
    .wrap { max-width:620px; margin:0 auto; padding:32px 16px; }
    .card { background:#0a0a10; border:1px solid rgba(201,168,106,.2); border-radius:8px; overflow:hidden; }
    .header { background:#050508; padding:32px; border-bottom:1px solid rgba(201,168,106,.15); text-align:center; }
    .logo { font-size:1.4rem; font-weight:700; letter-spacing:.14em; color:#f0ede6; }
    .logo span { color:#C9A86A; }
    .logo-dot { display:inline-block; width:8px; height:8px; background:#C9A86A; border-radius:50%; margin-right:8px; box-shadow:0 0 8px #C9A86A; }
    .badge { display:inline-block; margin-top:12px; padding:4px 14px; border:1px solid rgba(91,231,255,.3); border-radius:100px; font-size:.65rem; letter-spacing:.2em; text-transform:uppercase; color:#5BE7FF; }
    .body { padding:32px; }
    .alert-row { display:flex; align-items:center; gap:12px; padding:14px 16px; background:rgba(201,168,106,.07); border:1px solid rgba(201,168,106,.2); border-radius:4px; margin-bottom:28px; }
    .alert-icon { font-size:1.4rem; }
    .alert-text { font-size:.85rem; color:#C9A86A; letter-spacing:.06em; }
    .section-label { font-size:.6rem; letter-spacing:.25em; text-transform:uppercase; color:#C9A86A; margin-bottom:12px; padding-bottom:6px; border-bottom:1px solid rgba(201,168,106,.1); }
    .fields-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:24px; }
    .field { background:#050508; border:1px solid rgba(201,168,106,.1); border-radius:4px; padding:12px 14px; }
    .field-label { font-size:.58rem; letter-spacing:.15em; text-transform:uppercase; color:#6b6870; margin-bottom:4px; }
    .field-value { font-size:.88rem; color:#f0ede6; word-break:break-word; }
    .field-value.highlight { color:#C9A86A; font-weight:600; }
    .field-value.blue { color:#5BE7FF; }
    .field-full { grid-column:1/-1; }
    .desc-box { background:#050508; border:1px solid rgba(201,168,106,.1); border-radius:4px; padding:16px; margin-bottom:24px; }
    .desc-text { font-size:.88rem; color:#6b6870; line-height:1.8; white-space:pre-wrap; }
    .cta-row { text-align:center; margin-top:8px; }
    .cta-btn { display:inline-block; background:#C9A86A; color:#050508; padding:12px 28px; border-radius:3px; font-size:.78rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; text-decoration:none; }
    .footer { background:#050508; padding:20px 32px; border-top:1px solid rgba(201,168,106,.1); text-align:center; }
    .footer p { font-size:.65rem; letter-spacing:.1em; color:rgba(107,104,112,.5); text-transform:uppercase; }
    @media(max-width:480px){ .fields-grid{ grid-template-columns:1fr; } }
  </style>
</head>
<body>
<div class="wrap">
  <div class="card">

    <!-- Header -->
    <div class="header">
      <div class="logo"><span class="logo-dot"></span>DUNE<span>AI</span></div>
      <div class="badge">⚡ New Client Enquiry</div>
    </div>

    <!-- Body -->
    <div class="body">

      <div class="alert-row">
        <div class="alert-icon">🌑</div>
        <div class="alert-text">A new transmission has arrived from the desert. Review and respond within 24 hours.</div>
      </div>

      <!-- Section: About -->
      <div class="section-label">About the Client</div>
      <div class="fields-grid">
        <div class="field">
          <div class="field-label">Full Name</div>
          <div class="field-value highlight">${escHtml(name)}</div>
        </div>
        <div class="field">
          <div class="field-label">Email</div>
          <div class="field-value blue"><a href="mailto:${escHtml(email)}" style="color:#5BE7FF;">${escHtml(email)}</a></div>
        </div>
        <div class="field">
          <div class="field-label">Company / Startup</div>
          <div class="field-value">${escHtml(company || '—')}</div>
        </div>
        <div class="field">
          <div class="field-label">Role</div>
          <div class="field-value">${escHtml(role || '—')}</div>
        </div>
        <div class="field">
          <div class="field-label">WhatsApp</div>
          <div class="field-value">${escHtml(whatsapp || '—')}</div>
        </div>
        <div class="field">
          <div class="field-label">How They Found Us</div>
          <div class="field-value">${escHtml(heard || '—')}</div>
        </div>
      </div>

      <!-- Section: Project -->
      <div class="section-label">Project Details</div>
      <div class="fields-grid">
        <div class="field">
          <div class="field-label">Service Needed</div>
          <div class="field-value highlight">${escHtml(service || '—')}</div>
        </div>
        <div class="field">
          <div class="field-label">Budget Range</div>
          <div class="field-value highlight">${escHtml(budget || '—')}</div>
        </div>
        <div class="field">
          <div class="field-label">Timeline</div>
          <div class="field-value">${escHtml(timeline || '—')}</div>
        </div>
        <div class="field">
          <div class="field-label">Existing Data / Systems</div>
          <div class="field-value">${escHtml(data || '—')}</div>
        </div>
      </div>

      <!-- Description -->
      <div class="section-label">Project Description</div>
      <div class="desc-box">
        <div class="desc-text">${escHtml(desc || '—')}</div>
      </div>

      <!-- CTA -->
      <div class="cta-row">
        <a href="mailto:${escHtml(email)}?subject=Re: Your DuneAI Enquiry" class="cta-btn">
          Reply to ${escHtml(name.split(' ')[0])} →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>DuneAI Intelligence Systems &nbsp;·&nbsp; hello@duneai.in &nbsp;·&nbsp; Built from the future 🌑</p>
    </div>

  </div>
</div>
</body>
</html>`;
}


/**
 * Client confirmation email — sent to the person who submitted
 */
function clientEmailHTML({ name }) {
  const firstName = name.split(' ')[0] || 'Explorer';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>You're Now Duning With Us</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#050508; font-family:'Helvetica Neue',Arial,sans-serif; color:#f0ede6; }
    .wrap { max-width:580px; margin:0 auto; padding:32px 16px; }
    .card { background:#0a0a10; border:1px solid rgba(201,168,106,.2); border-radius:8px; overflow:hidden; }
    .header { background:#050508; padding:40px 32px; border-bottom:1px solid rgba(201,168,106,.12); text-align:center; }
    .logo { font-size:1.4rem; font-weight:700; letter-spacing:.14em; color:#f0ede6; }
    .logo span { color:#C9A86A; }
    .logo-dot { display:inline-block; width:8px; height:8px; background:#C9A86A; border-radius:50%; margin-right:8px; box-shadow:0 0 8px #C9A86A; }
    .emoji { font-size:3rem; margin:20px 0 10px; display:block; }
    .body { padding:36px 32px; }
    .greeting { font-size:1.5rem; font-weight:700; letter-spacing:.04em; text-transform:uppercase; margin-bottom:.5rem; }
    .greeting span { color:#C9A86A; }
    .subtext { color:#6b6870; font-size:.9rem; line-height:1.8; margin-bottom:28px; }
    .divider { height:1px; background:rgba(201,168,106,.1); margin:24px 0; }
    .steps { display:flex; flex-direction:column; gap:14px; margin-bottom:28px; }
    .step { display:flex; align-items:flex-start; gap:14px; padding:14px; background:#050508; border:1px solid rgba(201,168,106,.1); border-radius:4px; }
    .step-icon { font-size:1.2rem; flex-shrink:0; }
    .step-label { font-size:.6rem; letter-spacing:.15em; text-transform:uppercase; color:#C9A86A; margin-bottom:3px; }
    .step-text { font-size:.82rem; color:#6b6870; line-height:1.6; }
    .step-text strong { color:#f0ede6; }
    .quote-box { padding:20px; border-left:2px solid rgba(201,168,106,.3); margin-bottom:28px; background:rgba(201,168,106,.03); border-radius:0 4px 4px 0; }
    .quote-text { font-style:italic; color:rgba(107,104,112,.7); font-size:.82rem; line-height:1.7; margin-bottom:6px; }
    .quote-author { font-size:.62rem; letter-spacing:.15em; text-transform:uppercase; color:rgba(201,168,106,.6); }
    .contact-row { text-align:center; }
    .contact-link { color:#5BE7FF; font-size:.8rem; text-decoration:none; }
    .footer { background:#050508; padding:18px 32px; border-top:1px solid rgba(201,168,106,.1); text-align:center; }
    .footer p { font-size:.62rem; letter-spacing:.1em; color:rgba(107,104,112,.4); text-transform:uppercase; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="card">

    <!-- Header -->
    <div class="header">
      <div class="logo"><span class="logo-dot"></span>DUNE<span>AI</span></div>
      <span class="emoji">🌑</span>
      <div style="font-size:.65rem;letter-spacing:.25em;text-transform:uppercase;color:#C9A86A;">
        Transmission Received
      </div>
    </div>

    <!-- Body -->
    <div class="body">
      <div class="greeting">
        You're Now<br><span>Duning With Us.</span>
      </div>
      <p class="subtext">
        The desert has received your signal, <strong style="color:#f0ede6;">${escHtml(firstName)}</strong>.<br>
        Our intelligence systems are already processing your brief.
      </p>

      <div class="divider"></div>

      <div class="steps">
        <div class="step">
          <div class="step-icon">⚡</div>
          <div>
            <div class="step-label">What Happens Next</div>
            <div class="step-text">A DuneAI strategist will reach out to <strong>${escHtml(firstName)}</strong> within <strong>24 hours</strong> to schedule your first strategy call.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-icon">📋</div>
          <div>
            <div class="step-label">We Prepare Your Brief</div>
            <div class="step-text">Our team reviews your project details and builds a tailored <strong>AI roadmap</strong> specific to your business before the call.</div>
          </div>
        </div>
        <div class="step">
          <div class="step-icon">🤝</div>
          <div>
            <div class="step-label">Free Strategy Session</div>
            <div class="step-text"><strong>45 minutes, zero pressure.</strong> You'll walk away with complete clarity on how AI can accelerate your business.</div>
          </div>
        </div>
      </div>

      <div class="quote-box">
        <div class="quote-text">"The mystery of life isn't a problem to solve, but a reality to experience."</div>
        <div class="quote-author">— Frank Herbert, Dune</div>
      </div>

      <div class="contact-row">
        <p style="font-size:.75rem;color:#6b6870;margin-bottom:8px;">Questions before the call? Reach us directly:</p>
        <a href="mailto:hello@duneai.in" class="contact-link">hello@duneai.in</a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>DuneAI Intelligence Systems &nbsp;·&nbsp; hello@duneai.in &nbsp;·&nbsp; Built from the future 🌑</p>
    </div>

  </div>
</div>
</body>
</html>`;
}

// HTML escape helper — prevents injection in email templates
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = { adminEmailHTML, clientEmailHTML };
