// ============================================================
// Suman Prajapati — Portfolio interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // close menu when a link is tapped (mobile)
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Highlight current page in nav ---- */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const target = a.getAttribute('href');
    if (target === here || (here === '' && target === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ---- Footer year ---- */
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Reveal-on-scroll + skill bar fill, single IntersectionObserver ---- */
  const revealTargets = document.querySelectorAll('.reveal');
  const skillFills = document.querySelectorAll('.skill-fill');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        if (entry.target.classList.contains('skill-fill')) {
          const target = entry.target.getAttribute('data-fill');
          entry.target.style.width = target + '%';
        }
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealTargets.forEach(el => io.observe(el));
  skillFills.forEach(el => io.observe(el));

  /* ---- Project card "Details" toggle ---- */
  document.querySelectorAll('.project-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const detail = btn.parentElement.querySelector('.project-detail');
      if (!detail) return;
      const open = detail.classList.toggle('open');
      btn.textContent = open ? 'Hide details' : 'View details';
    });
  });

  /* ---- Copy to clipboard (email / phone) ---- */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(value);
        const original = btn.textContent;
        btn.textContent = 'Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1600);
      } catch (e) {
        // Clipboard API unavailable (e.g. very old browser) — fail quietly
      }
    });
  });

  /* ---- Contact form: no backend, so show a friendly inline note ---- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-status');
      if (note) {
        note.textContent = 'This form has no backend yet — for now, email or call directly using the details on the left.';
      }
    });
  }

});
