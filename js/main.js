/* ============================================================
   MOBILE MENU
   ============================================================ */

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenuBtn = document.querySelector('.menu-close');

function openMenu() {
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
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
