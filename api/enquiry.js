const { json, isValidEmail, methodNotAllowed, sanitise } = require('./_lib/common');
const { sendAdminEnquiry, sendClientConfirmation } = require('./_lib/mailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  try {
    const name = sanitise(req.body.name);
    const email = sanitise(req.body.email);
    const message = sanitise(req.body.message);
    const type = sanitise(req.body.type) || 'general';

    if (!name) return json(res, 400, { success: false, message: 'Name is required.' });
    if (!isValidEmail(email)) return json(res, 400, { success: false, message: 'Valid email is required.' });

    const typeLabel = type === 'strategy_call'
      ? 'Book Strategy Call'
      : type === 'start_project'
        ? 'Start Your Project'
        : 'General Enquiry';

    try {
      await sendAdminEnquiry({ name, email, message, type, typeLabel });
    } catch (err) {
      console.error('[enquiry.js] Admin enquiry error:', err.message);
    }

    try {
      await sendClientConfirmation(name, email);
    } catch (err) {
      console.error('[enquiry.js] Client confirmation error:', err.message);
    }

    return json(res, 200, {
      success: true,
      message: `Got it! We'll reach out to ${name.split(' ')[0]} within 24 hours.`,
    });
  } catch (error) {
    console.error('[enquiry.js] Request error:', error.message);
    return json(res, 500, {
      success: false,
      message: error.message || 'Failed to send. Please email us directly at hello@duneai.in',
    });
  }
};
