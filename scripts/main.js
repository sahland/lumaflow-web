(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const copy = document.querySelector('.copy-code');

  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.addEventListener('click', event => {
    if (event.target.matches('a')) { nav.classList.remove('is-open'); toggle?.setAttribute('aria-expanded', 'false'); }
  });

  copy?.addEventListener('click', async () => {
    const code = document.querySelector('.code-panel code')?.innerText;
    if (!code || !navigator.clipboard) return;
    await navigator.clipboard.writeText(code);
    copy.textContent = 'Copied';
    window.setTimeout(() => { copy.textContent = 'Copy'; }, 1500);
  });

  document.querySelector('[data-year]').textContent = new Date().getFullYear();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
})();
