/* ── Toast notification ── */
function showToast(message, type = 'success') {
  const existing = document.querySelector(
    '.booking-toast'
  );
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'booking-toast';
  toast.innerHTML = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('booking-toast--visible');
  });

  setTimeout(() => {
    toast.classList.remove('booking-toast--visible');
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

/* ── Form validation ── */
const form = document.getElementById(
  'booking-form-el'
);
if (form) {
  const fields = form.querySelectorAll(
    '.form-field[required]'
  );

  // Mark field as touched on blur
  fields.forEach(field => {
    field.addEventListener('blur', () => {
      field.classList.add('touched');
    });
  });

  /* ── Form submission ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let valid = true;
    fields.forEach(field => {
      field.classList.add('touched');
      if (!field.value || field.value === '') {
        valid = false;
      }
    });

    if (!valid) {
      // Scroll to first invalid field
      const first = form.querySelector(
        '.form-field.touched:invalid'
      );
      if (first) {
        first.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        first.focus();
      }
      return;
    }

    const btn = form.querySelector(
      'button[type="submit"]'
    );
    const originalText = btn.textContent;
    const originalBg = btn.style.background;

    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.8';

    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());

    // Build WhatsApp fallback message
    const waMessage = encodeURIComponent(
`Hi, I came across Ustadi Learning and I'm interested in a session for my child.

Here's what I had in mind:

Name: ${body.parentName || ''}
Level: ${body.childLevel || ''}
Subject: ${body.subject || ''}
Best time: ${body.preferredTime || ''}
My number: ${body.whatsapp || ''}

I saw that the first session is free — I'd love to know how that works and what the next step looks like.`
    );
    const waUrl = `https://wa.me/254114628443?text=${waMessage}`;

    let submitted = false;

    // Try n8n with 3 second timeout
    try {
      const controller = new AbortController();
      const timeout = setTimeout(
        () => controller.abort(), 3000
      );

      const response = await fetch(
        'https://n8n.ochieng.site/webhook/ustadi-booking',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body),
          signal: controller.signal
        }
      );

      clearTimeout(timeout);

      if (response.ok || response.status === 200) {
        submitted = true;
      }
    } catch (err) {
      // n8n offline or timed out — use WhatsApp
      console.log('n8n unavailable — using WhatsApp');
    }

    if (submitted) {
      // Success — show toast + reset
      btn.textContent = 'Booking Received ✓';
      btn.style.background = '#2d6a4f';
      btn.style.color = 'rgb(239, 233, 221)';
      btn.style.opacity = '1';

      showToast(
        'Booking received. We will contact you within the hour.'
      );

      form.reset();

      // Remove touched classes
      fields.forEach(f => f.classList.remove('touched'));

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 4000);

    } else {
      // n8n offline — WhatsApp fallback
      btn.textContent = 'Continue on WhatsApp →';
      btn.style.background = '#25d366';
      btn.style.color = '#ffffff';
      btn.style.opacity = '1';
      btn.disabled = false;

      btn.onclick = (e) => {
        e.preventDefault();
        window.open(waUrl, '_blank');
        // Reset button after opening WA
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.onclick = null;
        }, 3000);
      };
    }
  });
}
