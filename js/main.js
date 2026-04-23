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
   NAVBAR — scroll state
   ============================================================ */

const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ============================================================
   UNIVERSAL BIDIRECTIONAL SCROLL ANIMATION SYSTEM
   ============================================================ */

(function() {

  const animatables = document.querySelectorAll(
    '.animate, .faq-item, .why__point'
  );
  if (!animatables.length) return;

  // Set initial state for non-why__point elements
  animatables.forEach(el => {
    if (!el.classList.contains('why__point')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition =
        'opacity 0.65s ease, transform 0.65s ease';
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const rect = el.getBoundingClientRect();

        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.classList.add('in-view');
          if (el.classList.contains('why__point')) {
            el.classList.add('revealed');
            el.classList.remove('fading-past');
          }
        } else {
          if (rect.top < 0) {
            // Scrolled past — exit upward
            el.style.opacity = '0';
            el.style.transform = 'translateY(-20px)';
            el.classList.remove('in-view');
            if (el.classList.contains('why__point')) {
              el.classList.add('fading-past');
              el.classList.remove('revealed');
            }
          } else {
            // Below viewport — reset to base
            el.style.opacity = '0';
            el.style.transform = 'translateY(28px)';
            el.classList.remove('in-view');
            if (el.classList.contains('why__point')) {
              el.classList.remove('revealed', 'fading-past');
            }
          }
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  animatables.forEach(el => {
    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(
        parent.querySelectorAll(
          ':scope > .animate, :scope > .why__point'
        )
      );
      const idx = siblings.indexOf(el);
      if (idx > 0) {
        el.style.transitionDelay = `${idx * 0.08}s`;
      }
    }
    observer.observe(el);
  });

  // Reset delay after animation so re-entry feels fresh
  animatables.forEach(el => {
    el.addEventListener('transitionend', () => {
      if (el.style.opacity === '1') {
        setTimeout(() => {
          el.style.transitionDelay = '0s';
        }, 100);
      }
    });
  });

})();

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
   SERVICES CARDS — stage lighting + response panel
   ============================================================ */

(function () {
  const grid = document.querySelector('.services__grid');
  const cards = document.querySelectorAll('.services__card');
  const responsePanel = document.querySelector('.response-panel');
  const allPanels = document.querySelectorAll('.panel-content');

  if (!grid || !cards.length) return;

  function showPanel(panelNumber) {
    allPanels.forEach(p => {
      p.hidden = true;
      p.classList.remove('visible');
    });
    const target = document.querySelector(
      `.panel-content[data-panel="${panelNumber}"]`
    );
    if (target && responsePanel) {
      target.hidden = false;
      target.classList.add('visible');
      responsePanel.classList.add('active');
      setTimeout(() => {
        responsePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    }
  }

  function hidePanel() {
    if (responsePanel) {
      responsePanel.classList.remove('active');
      setTimeout(() => {
        allPanels.forEach(p => {
          p.hidden = true;
          p.classList.remove('visible');
        });
      }, 500);
    }
  }

  function reset() {
    cards.forEach(c => c.classList.remove('selected'));
    grid.classList.remove('has-selection');
    hidePanel();
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const isAlreadySelected = card.classList.contains('selected');

      cards.forEach(c => c.classList.remove('selected'));
      grid.classList.remove('has-selection');

      if (!isAlreadySelected) {
        grid.classList.add('has-selection');
        card.classList.add('selected');
        showPanel(index + 1);
      } else {
        hidePanel();
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.services__card') &&
        !e.target.closest('.response-panel')) {
      reset();
    }
  });

  // Reset cards when services section leaves the viewport
  const servicesSection = document.querySelector('.services');
  if (servicesSection) {
    const resetObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            cards.forEach(c => c.classList.remove('selected'));
            grid.classList.remove('has-selection');
            hidePanel();
          }
        });
      },
      { threshold: 0, rootMargin: '0px' }
    );
    resetObserver.observe(servicesSection);
  }
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

/* ============================================================
   WHY USTADI CARDS — scroll focus (mobile only)
   ============================================================ */

(function () {
  if (window.innerWidth >= 768) return;

  const whyCards = document.querySelectorAll('.why__card');
  if (!whyCards.length) return;

  const cardFocusObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-focus');
        } else {
          entry.target.classList.remove('in-focus');
        }
      });
    },
    { threshold: 0.55, rootMargin: '0px 0px -15% 0px' }
  );

  whyCards.forEach(card => cardFocusObserver.observe(card));
})();

window.addEventListener('resize', () => {
  const whyCards = document.querySelectorAll('.why__card');
  if (window.innerWidth >= 768) {
    whyCards.forEach(c => c.classList.remove('in-focus'));
  }
});

