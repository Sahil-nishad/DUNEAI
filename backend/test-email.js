// ═══════════════════════════════════════
//  DuneAI — Email Connection Test
//  File: test-email.js
//
//  Run: node test-email.js
//  This sends a real test email to hello@duneai.in
//  to confirm SMTP is working before going live.
// ═══════════════════════════════════════

require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function runTest() {
  console.log('\n🌑 DuneAI Email Test');
  console.log('====================');
  console.log(`SMTP Host : ${process.env.SMTP_HOST}`);
  console.log(`SMTP Port : ${process.env.SMTP_PORT}`);
  console.log(`SMTP User : ${process.env.SMTP_USER}`);
  console.log(`Target    : ${process.env.DUNEAI_EMAIL}\n`);

  try {
    // 1. Verify SMTP connection
    console.log('⏳ Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection OK\n');

    // 2. Send test email
    console.log('⏳ Sending test email...');
    const info = await transporter.sendMail({
      from:    `"DuneAI Test" <${process.env.SMTP_USER}>`,
      to:      process.env.DUNEAI_EMAIL || 'hello@duneai.in',
      subject: '🌑 DuneAI Backend Test — System Check',
      html: `
        <div style="background:#050508;font-family:Arial,sans-serif;color:#f0ede6;padding:32px;border-radius:8px;max-width:500px;margin:0 auto;border:1px solid rgba(201,168,106,.2);">
          <div style="font-size:1.3rem;font-weight:700;letter-spacing:.14em;color:#C9A86A;margin-bottom:16px;">🌑 DUNEAI</div>
          <div style="background:rgba(91,231,255,.07);border:1px solid rgba(91,231,255,.2);border-radius:4px;padding:14px;margin-bottom:20px;">
            <p style="font-size:.82rem;color:#5BE7FF;letter-spacing:.08em;">✅ BACKEND TEST SUCCESSFUL</p>
          </div>
          <p style="color:#6b6870;font-size:.88rem;line-height:1.7;">
            Your DuneAI email system is connected and operational.<br>
            Contact form submissions will now be delivered to this inbox.
          </p>
          <p style="color:rgba(107,104,112,.5);font-size:.7rem;margin-top:20px;letter-spacing:.1em;text-transform:uppercase;">
            DuneAI Backend · ${new Date().toISOString()}
          </p>
        </div>
      `,
      text: 'DuneAI Backend Test — Email system working correctly.',
    });

    console.log('✅ Test email sent!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`\n🎉 Everything is working. Check hello@duneai.in for the test email.\n`);

  } catch (err) {
    console.error('❌ Test failed:', err.message);
    console.error('\nTroubleshooting:');
    console.error('  1. Check .env file exists and has correct values');
    console.error('  2. Gmail: use App Password, not your real password');
    console.error('     → Google Account → Security → 2-Step Verification → App Passwords');
    console.error('  3. Check SMTP_HOST matches your email provider');
    console.error('  4. Make sure "Less secure app access" is not needed (use App Passwords)\n');
    process.exit(1);
  }
}

runTest();
