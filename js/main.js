/* ============================================================
   MOBILE MENU
   ============================================================ */

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenuBtn = document.querySelector('.menu-close');

function openMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu && closeMenuBtn) {
  hamburger.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);

  // Close on any nav link tap
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ============================================================
   NAVBAR — scroll shadow
   ============================================================ */

const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,3,26,0.4)'
      : 'none';
  }, { passive: true });
}

/* ============================================================
   SCROLL ANIMATIONS — Intersection Observer
   ============================================================ */

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate').forEach(el => animObserver.observe(el));

/* ============================================================
   FAQ — staggered scroll entrance
   ============================================================ */

const faqObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.faq-item').forEach(item => {
  faqObserver.observe(item);
});

/* ============================================================
   FAQ — accordion with micro-interactions
   ============================================================ */

document.querySelectorAll('.faq-question').forEach(question => {
  const item = question.parentElement;

  // Click — open / close
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all items
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked item if it was closed
    if (!isOpen) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
    }
  });

  // Subtle press on mousedown
  question.addEventListener('mousedown', () => {
    question.style.transform = 'scale(0.99)';
  });

  question.addEventListener('mouseup', () => {
    question.style.transform = '';
  });

  question.addEventListener('mouseleave', () => {
    question.style.transform = '';
  });
});

/* ============================================================
   SERVICES CARDS — stage lighting selection
   ============================================================ */

(function () {
  const grid = document.querySelector('.services__grid');
  const cards = document.querySelectorAll('.services__card');
  const nudge = document.getElementById('services-nudge');

  if (!grid || !cards.length || !nudge) return;

  function reset() {
    cards.forEach(c => c.classList.remove('selected'));
    grid.classList.remove('has-selection');
    nudge.classList.remove('visible');
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isAlreadySelected = card.classList.contains('selected');

      reset();

      if (!isAlreadySelected) {
        grid.classList.add('has-selection');
        card.classList.add('selected');

        // Nudge slides in after card animation plays
        setTimeout(() => nudge.classList.add('visible'), 180);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Click outside grid resets everything
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.services__card')) reset();
  });
})();

/* ============================================================
   TRUST BUBBLES — magnetic cursor effect (desktop only)
   ============================================================ */

(function () {
  if ('ontouchstart' in window) return;

  const bubbles = document.querySelectorAll('.trust__bubble');
  if (!bubbles.length) return;

  const PULL_STRENGTH = 0.25;
  const ACTIVATION_RADIUS = 160;

  function applyMagnet(bubble, clientX, clientY) {
    const rect = bubble.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = clientX - centerX;
    const distY = clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < ACTIVATION_RADIUS) {
      const pull = (ACTIVATION_RADIUS - distance) / ACTIVATION_RADIUS;
      const moveX = distX * pull * PULL_STRENGTH;
      const moveY = distY * pull * PULL_STRENGTH;
      bubble.classList.add('magnetic');
      bubble.classList.remove('returning');
      bubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
      return true;
    }
    return false;
  }

  function releaseMagnet(bubble) {
    bubble.classList.remove('magnetic');
    bubble.classList.add('returning');
    bubble.style.transform = '';
    setTimeout(() => bubble.classList.remove('returning'), 800);
  }

  // Direct bubble mousemove — most precise
  bubbles.forEach(bubble => {
    bubble.addEventListener('mousemove', (e) => {
      applyMagnet(bubble, e.clientX, e.clientY);
    });

    bubble.addEventListener('mouseleave', () => {
      releaseMagnet(bubble);
    });
  });

  // Container-level tracking — activates magnet before cursor lands on card
  const trustArea = document.querySelector('.trust-area');
  if (!trustArea) return;

  trustArea.addEventListener('mousemove', (e) => {
    bubbles.forEach(bubble => {
      if (bubble.classList.contains('magnetic')) return;
      const activated = applyMagnet(bubble, e.clientX, e.clientY);
      if (!activated && bubble.classList.contains('magnetic')) {
        releaseMagnet(bubble);
      }
    });
  });

  trustArea.addEventListener('mouseleave', () => {
    bubbles.forEach(bubble => releaseMagnet(bubble));
  });
})();
