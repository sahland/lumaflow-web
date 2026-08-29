(() => {
  const russian = document.documentElement.lang === 'ru';
  const groups = {
    'Application and state': ['LumaFlow', 'MountHandle', 'Widget', 'WidgetKey', 'KeyedSubtree', 'KeyedChild', 'StatelessWidget', 'StatefulWidget', 'WidgetState', 'State', 'ReactiveBuilder', 'BuildContext', 'AsyncAction', 'AsyncActionScope', 'AsyncActionStatus', 'AsyncButton'],
    'Layout and structure': ['Row', 'Column', 'Stack', 'Positioned', 'Align', 'Alignment', 'Center', 'Padding', 'Margin', 'Container', 'Card', 'SizedBox', 'ConstrainedBox', 'BoxConstraints', 'LayoutBuilder', 'LayoutConstraints', 'Expanded', 'Flexible', 'FlexFit', 'Spacer', 'ScrollView', 'Axis', 'MainAxisAlignment', 'CrossAxisAlignment', 'Opacity'],
    'Controls and forms': ['Text', 'TextStyle', 'TextOverflow', 'Icon', 'IconData', 'IconButton', 'Image', 'ImageFit', 'CircleAvatar', 'Button', 'ButtonStyle', 'ButtonStateStyle', 'ButtonTheme', 'ButtonVariant', 'Pressable', 'PointerCursor', 'TextField', 'TextFieldStyle', 'TextFieldStateStyle', 'TextFieldTheme', 'Checkbox', 'CheckboxStyle', 'CheckboxTheme', 'Radio', 'RadioStyle', 'RadioTheme', 'Switch', 'SwitchStyle', 'SwitchTheme', 'Slider', 'SliderStyle', 'SliderTheme', 'Dropdown', 'DropdownStyle', 'DropdownTheme', 'Form', 'FormState', 'FormField', 'FormFieldMessage', 'FormValidationMode', 'FocusNode', 'FocusTraversalGroup', 'TabBar', 'TabItem', 'TabView', 'SegmentedControl', 'SegmentedControlItem', 'SegmentedControlStyle', 'SegmentedControlTheme', 'LinearProgressIndicator', 'LinearProgressIndicatorStyle', 'ProgressIndicatorTheme', 'ListTile'],
    'Navigation and overlays': ['Navigator', 'NavigatorHost', 'Route', 'RouteTransition', 'RouteTransitionKind', 'NavigationSnapshot', 'NavigationBar', 'NavigationDestination', 'NavigationRail', 'NavigationRailMode', 'AdaptiveScaffold', 'Scaffold', 'BackNavigation', 'OverlayController', 'OverlayHost', 'OverlayHandle', 'ModalOptions', 'Dialog', 'ConfirmDialog', 'Toast', 'Tooltip', 'TooltipAnchor', 'ContextMenu', 'ContextMenuItem', 'DrawerPlacement', 'PopoverPlacement'],
    'Lists, themes and media': ['ListView', 'ListViewController', 'ListSelectionMode', 'Theme', 'ThemeData', 'ColorScheme', 'TypographyTheme', 'SpacingTheme', 'RadiusTheme', 'IconThemeData', 'WidgetStates', 'WidgetStateProperty', 'WidgetStatePropertyAll', 'BoxDecoration', 'Border', 'BorderSide', 'BorderRadius', 'EdgeInsets', 'LumaIcons'],
    'Animation, accessibility and diagnostics': ['Curve', 'Cubic', 'Curves', 'Tween', 'FloatTween', 'ColorTween', 'EdgeInsetsTween', 'BorderRadiusTween', 'AnimationSpec', 'AnimationBehavior', 'TweenAnimationBuilder', 'TweenWidgetBuilder', 'AnimatedOpacity', 'MediaQuery', 'MediaQueryData', 'Locale', 'Localizations', 'TextScaler', 'TextScale', 'Semantics', 'SemanticsProperties', 'SemanticsRole', 'SemanticsService', 'ExcludeSemantics', 'LumaFlowDiagnostics', 'LumaFlowDiagnostic', 'LumaFlowDiagnosticSeverity', 'WidgetDiagnosticsNode', 'WidgetTreeDiagnostics']
  };
  const core = {
    LumaFlow: 'Static entry point for mounting a LumaFlow application into a caller-owned UI Toolkit root.',
    MountHandle: 'Owns one mounted tree. Dispose it at the native host lifecycle boundary; use it for explicit rebuild, restart and diagnostics.',
    Widget: 'Immutable base description for every rendered LumaFlow element. A widget is configuration, not a mutable native view.',
    WidgetKey: 'Stable, local identity for one sibling collection. Use it when a stateful child can move, be inserted or be removed.',
    KeyedSubtree: 'Associates a stable WidgetKey with a child subtree without making that key part of the child constructor.',
    StatelessWidget: 'Base class for a widget whose output comes entirely from constructor input and inherited context.',
    StatefulWidget: 'Base class for a widget that creates mount-local WidgetState retained across compatible updates.',
    WidgetState: 'Mount-local state object owned by a compatible StatefulWidget node; it is not a global application store.',
    State: 'Explicit observable value. A branch that reads it can rebuild without refreshing unrelated UI.',
    ReactiveBuilder: 'A local reactive boundary that rebuilds from one State value and scopes change propagation to its returned branch.',
    BuildContext: 'Read-only access to inherited LumaFlow configuration while a widget builds.',
    AsyncAction: 'Owns one cancellable asynchronous operation and exposes its running state, failure and completion callbacks.',
    AsyncButton: 'Button bound to AsyncAction state, with built-in running, retry and cancellation behavior.',
    Row: 'Horizontal flex layout. Put Expanded, Flexible and Spacer directly beneath it when distributing bounded width.',
    Column: 'Vertical flex layout. Put Expanded, Flexible and Spacer directly beneath it when distributing bounded height.',
    LayoutBuilder: 'Builds from resolved local constraints, making responsive decisions at the point where width and height are known.',
    ListView: 'Maps a typed source to Unity UI Toolkit’s native virtualized ListView. Only realized and recycle-range rows are mounted.',
    ListViewController: 'Retained controller for a single mounted ListView, including scroll offset restoration and keyed scrolling.',
    Theme: 'Scopes immutable ThemeData to descendants; compatible descendants update without being remounted.',
    ThemeData: 'Immutable application theme: semantic colors, typography, spacing, radii and component defaults.',
    Navigator: 'Owns a retained route stack; create it outside Build and mount it through NavigatorHost.',
    Route: 'A keyed route description with an optional activation transition. Keys are unique within its Navigator stack.',
    OverlayController: 'Owns a separate transient overlay stack for dialogs, drawers, popovers and toasts.',
    OverlayHandle: 'Disposable handle for one overlay entry. Disposing it closes the entry and releases its native resources.',
    MediaQuery: 'Scopes local screen metrics and motion policy, including DisableAnimations, to descendants.',
    Localizations: 'Scopes a Locale and strongly typed application resources to descendants without requiring a specific loading package.',
    Semantics: 'Adds application-defined accessibility meaning to a subtree, including label, hint, role, value and action.',
    SemanticsProperties: 'Immutable semantic configuration consumed by Semantics and projected to Unity accessibility nodes where supported.',
    Form: 'Scopes FormState around controlled FormField values and their validation lifecycle.',
    FormField: 'Externally controlled form value with validation and user-intent callbacks.',
    TextField: 'Controlled text input that synchronizes an external value without replaying onChanged for programmatic updates.',
    Pressable: 'Composable interactive surface with pointer, keyboard, focus, disabled and button-semantics behavior but no required painting.',
    TweenAnimationBuilder: 'General local implicit animation boundary. Compatible end-value updates retarget from the displayed value.',
    AnimatedOpacity: 'Concise state-bound opacity transition using the same retargeting and reduced-motion policy as local tweens.',
    LumaFlowDiagnostics: 'Static access to snapshots of currently active mounts; snapshots do not retain live UI Toolkit or LumaFlow nodes.',
    WidgetTreeDiagnostics: 'Immutable, non-owning snapshot of a mounted tree for tooling and issue reports.',
    Native: 'Embeds a detached UI Toolkit VisualElement at an integration edge. The borrowed element must not be reparented while mounted.'
  };
  const categoryLabelsRu = {
    'Application and state': 'Приложение и состояние',
    'Layout and structure': 'Компоновка и структура',
    'Controls and forms': 'Контролы и формы',
    'Navigation and overlays': 'Навигация и оверлеи',
    'Lists, themes and media': 'Списки, темы и медиа',
    'Animation, accessibility and diagnostics': 'Анимация, доступность и диагностика',
    'Other public API': 'Прочий публичный API'
  };
  const guideForCategory = {
    'Application and state': ['architecture.html', 'architecture-ru.html', 'Architecture guide', 'Архитектура'],
    'Layout and structure': ['reference.html#layout', 'reference-ru.html#constraints', 'Layout contract', 'Контракт layout'],
    'Controls and forms': ['controls.html', 'controls-ru.html', 'Controls guide', 'Контролы и формы'],
    'Navigation and overlays': ['overlays.html', 'overlays-ru.html', 'Navigation guide', 'Навигация и оверлеи'],
    'Lists, themes and media': ['lists.html', 'lists-ru.html', 'Lists guide', 'Списки и Key'],
    'Animation, accessibility and diagnostics': ['accessibility.html', 'accessibility-ru.html', 'Accessibility guide', 'Доступность']
  };
  const coreRu = {
    LumaFlow: 'Точка входа для монтирования приложения в принадлежащий вызывающему коду корень UI Toolkit.',
    MountHandle: 'Управляет одним смонтированным деревом: Dispose, Rebuild, Restart и диагностика.',
    Widget: 'Неизменяемое описание элемента интерфейса. Widget — конфигурация, а не нативное представление.',
    WidgetKey: 'Стабильная локальная идентичность ребёнка внутри одного набора соседей.',
    State: 'Явное наблюдаемое значение. Зависимая ветвь может обновиться без перестроения несвязанного UI.',
    ReactiveBuilder: 'Локальная реактивная граница, перестраиваемая при изменении одного State.',
    BuildContext: 'Доступ к унаследованной конфигурации LumaFlow во время Build.',
    Row: 'Горизонтальная flex-компоновка.', Column: 'Вертикальная flex-компоновка.',
    LayoutBuilder: 'Строит ветвь по фактическим локальным constraints.',
    ListView: 'Типизированная обёртка над нативным виртуализированным ListView UI Toolkit.',
    ListViewController: 'Сохраняемый controller прокрутки и перехода к строке по ключу.',
    Theme: 'Передаёт неизменяемый ThemeData дочернему дереву.',
    Navigator: 'Управляет сохраняемым стеком маршрутов; создаётся вне Build.',
    OverlayController: 'Управляет отдельным стеком диалогов, drawer, popover и toast.',
    Localizations: 'Передаёт Locale и типизированные ресурсы приложения дочернему дереву.',
    Semantics: 'Добавляет label, hint, role, value и action для accessibility.',
    Form: 'Область FormState для управляемых значений и валидации.',
    TextField: 'Управляемое текстовое поле без повторного onChanged при программном обновлении.',
    Native: 'Встраивает отдельный VisualElement UI Toolkit на границе интеграции.'
  };
  const base = name => name.replace(/<.*$/, '');
  const categoryOf = type => Object.keys(groups).find(group => groups[group].includes(base(type.name))) || 'Other public API';
  const describe = type => {
    const name = base(type.name);
    if (russian && coreRu[name]) return coreRu[name];
    if (russian) {
      if (type.kind === 'enum') return `Набор именованных вариантов для API ${name}.`;
      if (name.endsWith('Style')) return `Визуальная конфигурация ${name.replace(/Style$/, '')}; заданные поля переопределяют активную тему.`;
      if (name.endsWith('Theme')) return `Тема со значениями по умолчанию для дочерних ${name.replace(/Theme$/, '')}.`;
      return `Публичный ${type.kind} из раздела «${categoryLabelsRu[categoryOf(type)] || categoryOf(type)}». Точные поддерживаемые сигнатуры приведены ниже.`;
    }
    if (core[name]) return core[name];
    if (type.kind === 'enum') return `Named options used by the ${name} API. Choose a value explicitly when the default does not express the intended behavior.`;
    if (type.kind === 'struct') return `Immutable value used to configure or describe ${name}. Treat it as a value object and replace it rather than mutating mounted UI.`;
    if (type.kind === 'delegate') return `Callback contract used by ${name}. It is invoked by the owning LumaFlow boundary rather than retained as application state.`;
    if (name.endsWith('Style')) return `Visual configuration for ${name.replace(/Style$/, '')}. Explicit fields take precedence over the matching component theme while unspecified fields continue to inherit defaults.`;
    if (name.endsWith('Theme')) return `Theme wrapper that supplies default styling for ${name.replace(/Theme$/, '')} descendants.`;
    if (name.endsWith('Tween')) return `Typed interpolation between two ${name.replace(/Tween$/, '')} values for local implicit animation.`;
    const category = categoryOf(type);
    if (category === 'Layout and structure') return `Composable ${name} widget or helper for expressing a UI Toolkit layout relationship in the declarative tree.`;
    if (category === 'Controls and forms') return `Public ${name} control or form primitive. Keep its value and long-lived controller state at the application boundary that owns the interaction.`;
    if (category === 'Navigation and overlays') return `Public ${name} type used to model retained application flow or transient content above a route.`;
    if (category === 'Lists, themes and media') return `Public ${name} type for virtualized collection behavior, reusable visual tokens or application media composition.`;
    if (category === 'Animation, accessibility and diagnostics') return `Public ${name} type for motion, accessibility, localization or non-owning development diagnostics.`;
    return `Public ${type.kind} in LumaFlow’s runtime surface. Review its constructor and members below for the supported configuration boundary.`;
  };
  const esc = value => value.replace(/[&<>]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' })[char]);
  const slug = value => base(value).replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
  const render = types => {
    const host = document.querySelector('[data-api-results]');
    host.innerHTML = types.length ? types.map(type => { const category = categoryOf(type); const guide = guideForCategory[category]; return `<article class="api-type" id="type-${slug(type.name)}"><div class="api-type-heading"><span>${esc(russian ? categoryLabelsRu[category] : category)}</span><h2><a href="#type-${slug(type.name)}"><code>${esc(type.name)}</code></a></h2><p>${esc(describe(type))}</p>${guide ? `<a class="api-guide-link" href="${guide[russian ? 1 : 0]}">${esc(guide[russian ? 3 : 2])} →</a>` : ''}</div><details><summary>${russian ? `Публичных members: ${type.members.length}` : `${type.members.length} public member${type.members.length === 1 ? '' : 's'}`}</summary><pre><code>${esc(type.signature)}\n${type.members.map(member => `  ${member}`).join('\n')}</code></pre></details></article>`; }).join('') : `<div class="api-empty"><strong>${russian ? 'Ничего не найдено' : 'No matching API'}</strong><p>${russian ? 'Измените запрос или выберите все категории.' : 'Change the query or return to all categories.'}</p></div>`;
    document.querySelector('[data-api-result-count]').textContent = russian ? `Найдено типов: ${types.length}` : `${types.length} public type${types.length === 1 ? '' : 's'}`;
  };
  fetch('data/api-index.json').then(response => response.json()).then(types => {
    document.querySelector('[data-api-count]').textContent = russian ? `${types.length} публичных типов` : `${types.length} public types`;
    const select = document.querySelector('[data-api-category]');
    const navigation = document.querySelector('[data-api-navigation]');
    Object.keys(groups).forEach(group => { const label = russian ? categoryLabelsRu[group] : group; select.insertAdjacentHTML('beforeend', `<option value="${group}">${label}</option>`); navigation.insertAdjacentHTML('beforeend', `<a href="#" data-category="${group}">${label}</a>`); });
    const search = document.querySelector('[data-api-search]');
    const clear = document.createElement('button');
    clear.type = 'button'; clear.className = 'api-search-clear'; clear.textContent = russian ? 'Очистить' : 'Clear'; clear.hidden = true;
    search.closest('label').append(clear);
    const params = new URLSearchParams(location.search);
    search.value = params.get('q') || '';
    if ([...select.options].some(option => option.value === params.get('category'))) select.value = params.get('category');
    const update = () => {
      const query = search.value.trim().toLowerCase(); const group = select.value;
      clear.hidden = !query && group === 'all';
      render(types.filter(type => (group === 'all' || categoryOf(type) === group) && `${type.name} ${type.members.join(' ')}`.toLowerCase().includes(query)));
      const next = new URLSearchParams();
      if (query) next.set('q', search.value.trim());
      if (group !== 'all') next.set('category', group);
      history.replaceState(null, '', `${location.pathname}${next.size ? `?${next}` : ''}${location.hash}`);
    };
    select.addEventListener('change', update); search.addEventListener('input', update);
    clear.addEventListener('click', () => { search.value = ''; select.value = 'all'; update(); search.focus(); });
    navigation.addEventListener('click', event => { const link = event.target.closest('[data-category]'); if (!link) return; event.preventDefault(); select.value = link.dataset.category; update(); document.querySelector('[data-api-search]').focus(); });
    document.addEventListener('keydown', event => {
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName)) { event.preventDefault(); search.focus(); }
      if (event.key === 'Escape' && document.activeElement === search && search.value) { search.value = ''; update(); }
    });
    update();
  }).catch(() => { document.querySelector('[data-api-results]').textContent = russian ? 'Не удалось загрузить индекс API.' : 'The API index could not be loaded.'; });
})();
