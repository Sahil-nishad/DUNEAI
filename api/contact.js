const { json, isValidEmail, methodNotAllowed, sanitise } = require('./_lib/common');
const { sendAdminContact, sendClientConfirmation } = require('./_lib/mailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  try {
    const name = sanitise(req.body.name);
    const email = sanitise(req.body.email);
    const company = sanitise(req.body.company);
    const role = sanitise(req.body.role);
    const heard = sanitise(req.body.heard);
    const service = sanitise(req.body.service);
    const budget = sanitise(req.body.budget);
    const timeline = sanitise(req.body.timeline);
    const desc = sanitise(req.body.desc);
    const data = sanitise(req.body.data);
    const whatsapp = sanitise(req.body.whatsapp);

    if (!name) return json(res, 400, { success: false, message: 'Name is required.' });
    if (!isValidEmail(email)) return json(res, 400, { success: false, message: 'Valid email is required.' });
    if (!service) return json(res, 400, { success: false, message: 'Service selection is required.' });
    if (!budget) return json(res, 400, { success: false, message: 'Budget selection is required.' });
    if (!desc || desc.length < 20) return json(res, 400, { success: false, message: 'Project description too short (min 20 chars).' });

    const payload = { name, email, company, role, heard, service, budget, timeline, desc, data, whatsapp };

    try {
      await sendAdminContact(payload);
    } catch (err) {
      console.error('[contact.js] Admin email error:', err.message);
    }

    try {
      await sendClientConfirmation(name, email);
    } catch (err) {
      console.error('[contact.js] Client confirmation error:', err.message);
    }

    return json(res, 200, {
      success: true,
      message: `Transmission received. We'll contact ${name.split(' ')[0]} within 24 hours.`,
    });
  } catch (error) {
    console.error('[contact.js] Request error:', error.message);
    return json(res, 500, {
      success: false,
      message: error.message || 'Failed to send. Please email us directly at hello@duneai.in',
    });
  }
};
