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
  const fadeTargets = document.querySelectorAll('.content-section, #section-outcome');
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

});
