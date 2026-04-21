document.addEventListener('DOMContentLoaded', () => {

  // ── TOC Active State ─────────────────────────────────────
  const tocLinks = document.querySelectorAll('.toc ul li a');
  if (tocLinks.length) {
    const sections = Array.from(tocLinks)
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    const tocObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(
            `.toc ul li a[href="#${entry.target.id}"]`
          );
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-10% 0px -75% 0px' });

    sections.forEach(s => tocObserver.observe(s));
  }

  // ── Scroll Fade-in ───────────────────────────────────────
  const fadeTargets = document.querySelectorAll(
    '.project-intro, .project-meta, .content-section, #section-outcome'
  );
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });

  fadeTargets.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // ── Index：Section Header fade-in ───────────────────────
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // ── Index：Project Cards stagger fade-in ─────────────────
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length) {
    const cardObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    projectCards.forEach((card, i) => {
      card.classList.add('fade-in');
      card.style.transitionDelay = `${i * 0.08}s`;
      cardObserver.observe(card);
    });
  }

  // ── Mobile：卡片進入視窗自動顯示 overlay ─────────────────
  if (window.matchMedia('(max-width: 640px)').matches) {
    const mobileCards = document.querySelectorAll('.project-card');
    if (mobileCards.length) {
      const mobileOverlayObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('overlay-active', entry.isIntersecting);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px 80px 0px' });
      mobileCards.forEach(card => mobileOverlayObserver.observe(card));
    }
  }

  // ── Hero Stats count-up ──────────────────────────────────
  const statNums = document.querySelectorAll('.hero-stat-num');
  if (statNums.length) {
    const countObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        const el = entry.target;
        const raw = el.textContent.trim();
        const suffix = raw.replace(/[0-9]/g, '');
        const target = parseInt(raw, 10);
        const duration = 800;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => countObserver.observe(el));
  }

});
