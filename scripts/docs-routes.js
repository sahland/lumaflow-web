(() => {
  const routes = document.querySelector('.docs-route-links');
  if (!routes) return;

  const link = document.createElement('a');
  link.href = 'lists.html';
  link.innerHTML = '<span>04</span><strong>Virtualized lists</strong><small>Keep large collections native and bounded</small>';
  routes.append(link);

  const overlays = document.createElement('a');
  overlays.href = 'overlays.html';
  overlays.innerHTML = '<span>05</span><strong>Navigation and overlays</strong><small>Own routes, dialogs and transient UI explicitly</small>';
  routes.append(overlays);

  const controls = document.createElement('a');
  controls.href = 'controls.html';
  controls.innerHTML = '<span>06</span><strong>Controls and forms</strong><small>Own input values, validation and component themes</small>';
  routes.append(controls);

  const accessibility = document.createElement('a');
  accessibility.href = 'accessibility.html';
  accessibility.innerHTML = '<span>07</span><strong>Accessibility and localization</strong><small>Build meaning, focus and user preferences into the tree</small>';
  routes.append(accessibility);
})();
