// ═══════════════════════════════════════════════════════
//  DuneAI — Frontend API Connector
//  File: api.js  (add to your frontend /js/ folder)
//
//  HOW TO USE:
//  1. Add <script src="/js/api.js"></script> in your index.html
//     (before ContactModal script)
//  2. Set DUNEAI_API_URL below to your backend URL
// ═══════════════════════════════════════════════════════

const DUNEAI_API_URL = 'http://localhost:3001'; // Change to your deployed backend URL in production
// e.g. 'https://api.duneai.in'  or  'https://duneai-backend.onrender.com'

/**
 * Submit the full 3-step contact form
 * Called by the ContactModal on final submit
 */
async function duneSubmitContact(formData) {
  const response = await fetch(`${DUNEAI_API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return response.json();
}

/**
 * Submit a quick enquiry (Book Strategy Call / Start Your Project buttons)
 * type: "strategy_call" | "start_project"
 */
async function duneSubmitEnquiry(formData) {
  const response = await fetch(`${DUNEAI_API_URL}/api/enquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return response.json();
}

/**
 * Subscribe to newsletter
 */
async function duneSubscribeNewsletter(email) {
  const response = await fetch(`${DUNEAI_API_URL}/api/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return response.json();
}
