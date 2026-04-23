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

  try {
    const response = await fetch(
      'https://n8n.ochieng.site/webhook/ustadi-booking',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );

    if (response.ok || response.status === 200) {
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
      throw new Error('Server error');
    }

  } catch (err) {
    btn.textContent = 'Something went wrong. Try again.';
    btn.style.opacity = '1';
    btn.disabled = false;

    setTimeout(() => {
      btn.textContent = originalText;
    }, 3000);
  }
});
