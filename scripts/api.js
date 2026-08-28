(() => {
  const groups = {
    'Application and state': ['LumaFlow', 'MountHandle', 'Widget', 'WidgetKey', 'KeyedSubtree', 'KeyedChild', 'StatelessWidget', 'StatefulWidget', 'WidgetState', 'State', 'ReactiveBuilder', 'BuildContext', 'AsyncAction', 'AsyncActionScope', 'AsyncActionStatus', 'AsyncButton'],
    'Layout and structure': ['Row', 'Column', 'Stack', 'Positioned', 'Align', 'Alignment', 'Center', 'Padding', 'Margin', 'Container', 'Card', 'SizedBox', 'ConstrainedBox', 'BoxConstraints', 'LayoutBuilder', 'LayoutConstraints', 'Expanded', 'Flexible', 'FlexFit', 'Spacer', 'ScrollView', 'Axis', 'MainAxisAlignment', 'CrossAxisAlignment', 'Opacity'],
    'Controls and forms': ['Text', 'TextStyle', 'TextOverflow', 'Icon', 'IconData', 'IconButton', 'Image', 'ImageFit', 'CircleAvatar', 'Button', 'ButtonStyle', 'ButtonStateStyle', 'ButtonTheme', 'ButtonVariant', 'Pressable', 'PointerCursor', 'TextField', 'TextFieldStyle', 'TextFieldStateStyle', 'TextFieldTheme', 'Checkbox', 'CheckboxStyle', 'CheckboxTheme', 'Radio', 'RadioStyle', 'RadioTheme', 'Switch', 'SwitchStyle', 'SwitchTheme', 'Slider', 'SliderStyle', 'SliderTheme', 'Dropdown', 'DropdownStyle', 'DropdownTheme', 'Form', 'FormState', 'FormField', 'FormFieldMessage', 'FormValidationMode', 'FocusNode', 'FocusTraversalGroup', 'TabBar', 'TabItem', 'TabView', 'SegmentedControl', 'SegmentedControlItem', 'SegmentedControlStyle', 'SegmentedControlTheme', 'LinearProgressIndicator', 'LinearProgressIndicatorStyle', 'ProgressIndicatorTheme', 'ListTile'],
    'Navigation and overlays': ['Navigator', 'NavigatorHost', 'Route', 'RouteTransition', 'RouteTransitionKind', 'NavigationSnapshot', 'NavigationBar', 'NavigationDestination', 'NavigationRail', 'NavigationRailMode', 'AdaptiveScaffold', 'Scaffold', 'BackNavigation', 'OverlayController', 'OverlayHost', 'OverlayHandle', 'ModalOptions', 'Dialog', 'ConfirmDialog', 'Toast', 'Tooltip', 'TooltipAnchor', 'ContextMenu', 'ContextMenuItem', 'DrawerPlacement', 'PopoverPlacement'],
    'Lists, themes and media': ['ListView', 'ListViewController', 'ListSelectionMode', 'Theme', 'ThemeData', 'ColorScheme', 'TypographyTheme', 'SpacingTheme', 'RadiusTheme', 'IconThemeData', 'WidgetStates', 'WidgetStateProperty', 'WidgetStatePropertyAll', 'BoxDecoration', 'Border', 'BorderSide', 'BorderRadius', 'EdgeInsets', 'LumaIcons'],
    'Animation, accessibility and diagnostics': ['Curve', 'Cubic', 'Curves', 'Tween', 'FloatTween', 'ColorTween', 'EdgeInsetsTween', 'BorderRadiusTween', 'AnimationSpec', 'AnimationBehavior', 'TweenAnimationBuilder', 'TweenWidgetBuilder', 'AnimatedOpacity', 'MediaQuery', 'MediaQueryData', 'Locale', 'Localizations', 'TextScaler', 'TextScale', 'Semantics', 'SemanticsProperties', 'SemanticsRole', 'SemanticsService', 'ExcludeSemantics', 'LumaFlowDiagnostics', 'LumaFlowDiagnostic', 'LumaFlowDiagnosticSeverity', 'WidgetDiagnosticsNode', 'WidgetTreeDiagnostics']
  };
  const core = {
    LumaFlow: 'Static entry point for mounting a LumaFlow application into a caller-owned UI Toolkit root.', MountHandle: 'Owns one mounted tree. Dispose it at the host lifecycle boundary; use it for explicit rebuild, restart and diagnostics.', Widget: 'Immutable base description for every rendered LumaFlow element.', State: 'Explicit observable value. A branch that reads it can rebuild without refreshing unrelated UI.', ReactiveBuilder: 'A local reactive boundary that builds from a State value.', ListView: 'Maps a typed source to Unity UI Toolkit’s native virtualized ListView.', Navigator: 'Owns a retained route stack; create it outside Build and mount it through NavigatorHost.', OverlayController: 'Owns a separate transient overlay stack for dialogs, drawers, popovers and toasts.', ThemeData: 'Immutable application theme: semantic colors, typography, spacing, radii and component defaults.', Semantics: 'Adds application-defined accessibility meaning to a subtree.', Localizations: 'Scopes a Locale and strongly typed application resources to descendants.', WidgetTreeDiagnostics: 'Immutable, non-owning snapshot of a mounted tree for tooling and issue reports.'
  };
  const base = name => name.replace(/<.*$/, '');
  const categoryOf = type => Object.keys(groups).find(group => groups[group].includes(base(type.name))) || 'Other public API';
  const describe = type => {
    const name = base(type.name);
    if (core[name]) return core[name];
    if (type.kind === 'enum') return `Named options used by the ${name} API.`;
    if (type.kind === 'struct') return `Immutable value used to configure or describe ${name}.`;
    if (type.kind === 'delegate') return `Callback contract used by ${name}.`;
    if (name.endsWith('Style')) return `Visual configuration for ${name.replace(/Style$/, '')}; explicit fields take precedence over theme defaults.`;
    if (name.endsWith('Theme')) return `Theme wrapper that supplies defaults for ${name.replace(/Theme$/, '')}.`;
    if (name.endsWith('Tween')) return `Typed interpolation between two ${name.replace(/Tween$/, '')} values.`;
    return `Public ${type.kind} in LumaFlow’s ${categoryOf(type).toLowerCase()} surface.`;
  };
  const esc = value => value.replace(/[&<>]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' })[char]);
  const render = types => {
    const host = document.querySelector('[data-api-results]');
    host.innerHTML = types.map(type => `<article class="api-type"><div class="api-type-heading"><span>${esc(categoryOf(type))}</span><h2><code>${esc(type.name)}</code></h2><p>${esc(describe(type))}</p></div><details><summary>${type.members.length} public member${type.members.length === 1 ? '' : 's'}</summary><pre><code>${esc(type.signature)}\n${type.members.map(member => `  ${member}`).join('\n')}</code></pre></details></article>`).join('');
    document.querySelector('[data-api-result-count]').textContent = `${types.length} public type${types.length === 1 ? '' : 's'}`;
  };
  fetch('data/api-index.json').then(response => response.json()).then(types => {
    document.querySelector('[data-api-count]').textContent = `${types.length} public types`;
    const select = document.querySelector('[data-api-category]');
    const navigation = document.querySelector('[data-api-navigation]');
    Object.keys(groups).forEach(group => { select.insertAdjacentHTML('beforeend', `<option value="${group}">${group}</option>`); navigation.insertAdjacentHTML('beforeend', `<a href="#" data-category="${group}">${group}</a>`); });
    const update = () => { const query = document.querySelector('[data-api-search]').value.toLowerCase(); const group = select.value; render(types.filter(type => (group === 'all' || categoryOf(type) === group) && `${type.name} ${type.members.join(' ')}`.toLowerCase().includes(query))); };
    select.addEventListener('change', update); document.querySelector('[data-api-search]').addEventListener('input', update);
    navigation.addEventListener('click', event => { const link = event.target.closest('[data-category]'); if (!link) return; event.preventDefault(); select.value = link.dataset.category; update(); document.querySelector('[data-api-search]').focus(); });
    render(types);
  }).catch(() => { document.querySelector('[data-api-results]').textContent = 'The API index could not be loaded.'; });
})();
