(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.focus();
    }
  });
  document.addEventListener('click', event => {
    if (nav?.classList.contains('is-open') && !nav.contains(event.target) && !toggle?.contains(event.target)) {
      nav.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(link => {
    const linkedPage = new URL(link.href, location.href).pathname.split('/').pop() || 'index.html';
    if (!link.hash && linkedPage === currentPage) link.classList.add('is-current');
  });
  nav?.addEventListener('click', event => {
    if (event.target.matches('a')) { nav.classList.remove('is-open'); toggle?.setAttribute('aria-expanded', 'false'); }
  });

  document.querySelectorAll('.copy-code').forEach(copy => copy.addEventListener('click', async () => {
    const source = copy.dataset.copySource;
    const code = source
      ? document.getElementById(source)?.innerText
      : copy.closest('.code-panel')?.querySelector('code')?.innerText;
    if (!code || !navigator.clipboard) return;
    await navigator.clipboard.writeText(code);
    const originalLabel = copy.textContent;
    copy.textContent = document.documentElement.lang === 'ru' ? 'Скопировано' : 'Copied';
    window.setTimeout(() => { copy.textContent = originalLabel; }, 1500);
  }));

  const sidebarLinks = [...document.querySelectorAll('.docs-sidebar a[href^="#"]')];
  if (sidebarLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sidebarLinks.forEach(link => link.classList.toggle('is-active', link.hash === `#${visible.target.id}`));
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, .2, .6] });
    sidebarLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section) sectionObserver.observe(section);
    });
  }

  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.type = 'button';
  backToTop.textContent = '↑';
  backToTop.setAttribute('aria-label', document.documentElement.lang === 'ru' ? 'Наверх' : 'Back to top');
  document.body.append(backToTop);
  const updateBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 640);
  updateBackToTop();
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));

  document.querySelector('[data-year]').textContent = new Date().getFullYear();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
})();
