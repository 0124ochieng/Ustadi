const WEBHOOK_URL =
  'https://n8n.ochieng.site/webhook/ustadi-booking';
const TIMEOUT_MS = 8000;

async function submitToNetlify(formData) {
  const body = new URLSearchParams(formData).toString();
  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `form-name=ustadi-booking&${body}`
  });
  return response;
}

async function submitToN8n(body) {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    TIMEOUT_MS
  );
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    clearTimeout(timeout);
    return response;
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

document.getElementById('booking-form-el')
  .addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = e.target.querySelector(
    'button[type="submit"]'
  );
  const originalText = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '0.8';

  const data = new FormData(e.target);
  const body = Object.fromEntries(data.entries());

  let submitted = false;

  // Attempt 1 — n8n primary
  try {
    const response = await submitToN8n(body);
    if (response.ok || response.status === 200) {
      submitted = true;
      console.log('Submitted via n8n');
    }
  } catch (err) {
    console.log('n8n unavailable — trying fallback');
  }

  // Attempt 2 — Netlify fallback
  if (!submitted) {
    try {
      await submitToNetlify(body);
      submitted = true;
      console.log('Submitted via Netlify fallback');
    } catch (err) {
      console.log('Both submission methods failed');
    }
  }

  // Show result to user
  if (submitted) {
    btn.textContent = 'Booking Received ✓';
    btn.style.background = '#10b981';
    btn.style.color = '#ffffff';
    btn.style.opacity = '1';
    e.target.reset();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
    }, 4000);

  } else {
    // Both failed — open WhatsApp with pre-filled message
    const name = body.parentName || '';
    const subject = body.subject || '';
    const message = encodeURIComponent(
      `Hello Ustadi Learning, I would like to book a session.\n\nName: ${name}\nSubject: ${subject}`
    );
    const whatsappUrl =
      `https://wa.me/254114628443?text=${message}`;

    btn.textContent = 'Continue on WhatsApp →';
    btn.style.background = '#25d366';
    btn.style.color = '#ffffff';
    btn.style.opacity = '1';
    btn.disabled = false;

    btn.onclick = () => window.open(whatsappUrl, '_blank');
  }
});
