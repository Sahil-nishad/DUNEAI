const { json, isValidEmail, methodNotAllowed, sanitise } = require('./_lib/common');
const { sendNewsletterSignup } = require('./_lib/mailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  try {
    const email = sanitise(req.body.email);
    if (!isValidEmail(email)) return json(res, 400, { success: false, message: 'Valid email required.' });

    try {
      await sendNewsletterSignup(email);
    } catch (err) {
      console.error('[newsletter.js] Newsletter signup error:', err.message);
    }

    return json(res, 200, {
      success: true,
      message: 'Subscribed! Welcome to the DuneAI network.',
    });
  } catch (error) {
    console.error('[newsletter.js] Request error:', error.message);
    return json(res, 500, {
      success: false,
      message: error.message || 'Failed. Please try again.',
    });
  }
};
