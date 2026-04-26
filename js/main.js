// Always scroll to top on page load
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

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

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

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
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ============================================================
   SCROLL ANIMATIONS (bidirectional — do not unobserve)
   ============================================================ */

(function() {
  const animatables = document.querySelectorAll('.animate, .faq-item, .why__point');
  if (!animatables.length) return;

  animatables.forEach(el => {
    if (!el.classList.contains('why__point')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
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
            el.style.opacity = '0';
            el.style.transform = 'translateY(-20px)';
            el.classList.remove('in-view');
            if (el.classList.contains('why__point')) {
              el.classList.add('fading-past');
              el.classList.remove('revealed');
            }
          } else {
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
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  animatables.forEach(el => {
    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(
        parent.querySelectorAll(':scope > .animate, :scope > .why__point')
      );
      const idx = siblings.indexOf(el);
      if (idx > 0) el.style.transitionDelay = `${idx * 0.08}s`;
    }
    observer.observe(el);
  });

  animatables.forEach(el => {
    el.addEventListener('transitionend', () => {
      if (el.style.opacity === '1') {
        setTimeout(() => { el.style.transitionDelay = '0s'; }, 100);
      }
    });
  });
})();

/* ============================================================
   FAQ ACCORDION
   ============================================================ */

document.querySelectorAll('.faq-question').forEach(question => {
  const item = question.parentElement;

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
    }
  });

  question.addEventListener('mousedown', () => { question.style.transform = 'scale(0.99)'; });
  question.addEventListener('mouseup', () => { question.style.transform = ''; });
  question.addEventListener('mouseleave', () => { question.style.transform = ''; });
});

/* ============================================================
   SERVICES CARDS — response panel
   ============================================================ */

(function() {
  const grid = document.querySelector('.services__grid');
  const cards = document.querySelectorAll('.services__card');
  const responsePanel = document.querySelector('.response-panel');
  const allPanels = document.querySelectorAll('.panel-content');

  if (!grid || !cards.length) return;

  function showPanel(panelNumber) {
    allPanels.forEach(p => { p.hidden = true; p.classList.remove('visible'); });
    const target = document.querySelector(`.panel-content[data-panel="${panelNumber}"]`);
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
    if (!responsePanel) return;
    responsePanel.classList.remove('active');
    setTimeout(() => {
      allPanels.forEach(p => { p.hidden = true; p.classList.remove('visible'); });
    }, 500);
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
    if (!e.target.closest('.services__card') && !e.target.closest('.response-panel')) {
      cards.forEach(c => c.classList.remove('selected'));
      grid.classList.remove('has-selection');
      hidePanel();
    }
  });

  const servicesSection = document.querySelector('.services');
  if (servicesSection) {
    new IntersectionObserver(
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
    ).observe(servicesSection);
  }
})();

/* ============================================================
   TRUST BUBBLES — magnetic cursor (desktop only)
   ============================================================ */

(function() {
  if ('ontouchstart' in window) return;

  const bubbles = document.querySelectorAll('.trust__bubble');
  if (!bubbles.length) return;

  const PULL_STRENGTH = 0.25;
  const ACTIVATION_RADIUS = 160;

  function applyMagnet(bubble, clientX, clientY) {
    const rect = bubble.getBoundingClientRect();
    const distX = clientX - (rect.left + rect.width / 2);
    const distY = clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < ACTIVATION_RADIUS) {
      const pull = (ACTIVATION_RADIUS - distance) / ACTIVATION_RADIUS;
      bubble.classList.add('magnetic');
      bubble.classList.remove('returning');
      bubble.style.transform = `translate(${distX * pull * PULL_STRENGTH}px, ${distY * pull * PULL_STRENGTH}px)`;
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

  bubbles.forEach(bubble => {
    bubble.addEventListener('mousemove', (e) => applyMagnet(bubble, e.clientX, e.clientY));
    bubble.addEventListener('mouseleave', () => releaseMagnet(bubble));
  });

  const trustArea = document.querySelector('.trust-area');
  if (!trustArea) return;

  trustArea.addEventListener('mousemove', (e) => {
    bubbles.forEach(bubble => {
      if (bubble.classList.contains('magnetic')) return;
      const activated = applyMagnet(bubble, e.clientX, e.clientY);
      if (!activated && bubble.classList.contains('magnetic')) releaseMagnet(bubble);
    });
  });

  trustArea.addEventListener('mouseleave', () => bubbles.forEach(releaseMagnet));
})();

/* ── Scroll storytelling engine ── */
(function() {

  let initialized = false;

  function init() {
    if (window.innerWidth >= 1024 && !initialized) {
      initialized = true;
      runStoryEngine();
    }
  }

  window.addEventListener('resize', init, { passive: true });
  init();

  function runStoryEngine() {

    const storySections = [
      {
        section: document.getElementById('why-ustadi'),
        track: document.getElementById('whyTrack'),
        items: [
          document.getElementById('whyItem1'),
          document.getElementById('whyItem2'),
          document.getElementById('whyItem3')
        ],
        progress: document.getElementById('whyProgress')
      }
    ].filter(s => s.section && s.track && s.items.every(Boolean));

    if (!storySections.length) return;

    const STEP_HEIGHT = 0.6;

    function setHeights() {
      storySections.forEach(s => {
        const count = s.items.length;
        const totalH = (0.5 + (count * STEP_HEIGHT) + 0.5) * window.innerHeight;
        s.track.style.height = (totalH - window.innerHeight) + 'px';
      });
    }

    function getActiveIndex(s) {
      const rect = s.section.getBoundingClientRect();
      const scrolled = -rect.top;
      const trackH = parseFloat(s.track.style.height || 0);
      const count = s.items.length;

      if (scrolled < 0) return -1;
      if (scrolled > trackH) return count;

      const progress = scrolled / trackH;
      return Math.min(Math.floor(progress * count), count - 1);
    }

    function updateSection(s) {
      const activeIndex = getActiveIndex(s);
      const dots = s.progress
        ? s.progress.querySelectorAll('.story-progress__dot')
        : [];

      s.items.forEach((item, i) => {
        if (i === activeIndex) {
          item.classList.remove('exit-up');
          item.classList.add('visible');
        } else if (i < activeIndex) {
          item.classList.remove('visible');
          item.classList.add('exit-up');
        } else {
          item.classList.remove('visible', 'exit-up');
        }
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }

    setHeights();
    storySections.forEach(updateSection);

    window.addEventListener('scroll', () => {
      storySections.forEach(updateSection);
    }, { passive: true });

    window.addEventListener('resize', () => {
      setHeights();
      storySections.forEach(updateSection);
    }, { passive: true });

  }

})();

/* ── Section scroll indicator ── */
(function() {

  const indicator = document.getElementById('scrollIndicator');
  if (!indicator) return;

  if (window.innerWidth < 1024) return;

  const dashes = indicator.querySelectorAll('.scroll-indicator__dash');

  const sections = Array.from(dashes).map(dash => ({
    dash,
    id: dash.dataset.section,
    el: document.getElementById(dash.dataset.section)
  })).filter(s => s.el);

  const lightSections = ['services', 'faq'];

  function getActiveSection() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const midpoint = scrollY + windowH * 0.45;

    let active = sections[0];

    sections.forEach(section => {
      const top = section.el.getBoundingClientRect().top + scrollY;
      if (top <= midpoint) active = section;
    });

    return active;
  }

  function updateIndicator() {
    const active = getActiveSection();

    dashes.forEach(dash => dash.classList.remove('active'));
    if (active) active.dash.classList.add('active');

    if (active && lightSections.includes(active.id)) {
      indicator.classList.add('on-light');
    } else {
      indicator.classList.remove('on-light');
    }
  }

  sections.forEach(section => {
    section.dash.addEventListener('click', () => {
      section.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  window.addEventListener('scroll', updateIndicator, { passive: true });

  updateIndicator();

  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) {
      indicator.style.display = 'none';
    } else {
      indicator.style.display = 'flex';
      updateIndicator();
    }
  });

})();

/* ── Floating particle specs ── */
(function() {

  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const PARTICLE_COUNT = 60;
  const particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticle() {
    return {
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      vx: random(-0.12, 0.12),
      vy: random(-0.12, 0.12),
      size: 1,
      opacity: random(0.15, 0.5),
      pulse: random(0, Math.PI * 2),
      pulseSpeed: random(0.003, 0.008)
    };
  }

  resize();
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  let animId;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.pulse += p.pulseSpeed;
      const pulsedOpacity = p.opacity + Math.sin(p.pulse) * 0.08;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(239, 233, 221, ${pulsedOpacity})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -2) p.x = canvas.width + 2;
      if (p.x > canvas.width + 2) p.x = -2;
      if (p.y < -2) p.y = canvas.height + 2;
      if (p.y > canvas.height + 2) p.y = -2;
    });

    animId = requestAnimationFrame(draw);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      draw();
    }
  });

  window.addEventListener('resize', () => {
    resize();
  }, { passive: true });

  draw();

/* ── Why Ustadi sticky label ── */
(function() {
  if (window.innerWidth < 1024) return;

  const label = document.getElementById('whyLabel');
  const section = document.getElementById('why-ustadi');
  if (!label || !section) return;

  const labelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          label.classList.add('label-visible');
        } else {
          label.classList.remove('label-visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  labelObserver.observe(section);
})();

})();
