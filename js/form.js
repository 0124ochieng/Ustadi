document.getElementById('booking-form-el').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const data = new FormData(e.target);
  const body = Object.fromEntries(data.entries());

  try {
    // TODO: Replace with production n8n webhook URL before deploy
    await fetch('http://localhost:5678/webhook/ustadi-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    btn.textContent = 'Booking Received ✓';
    btn.style.background = '#10b981';
    btn.style.color = '#ffffff';
    e.target.reset();
  } catch (err) {
    btn.textContent = 'Something went wrong. Try again.';
    btn.disabled = false;
  }
});
