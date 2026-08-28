(() => {
  const translations = {
    en: {
      skip: 'Skip to content', openNavigation: 'Open navigation', navOverview: 'Overview', navFeatures: 'Features', navExamples: 'Examples', navDocs: 'Docs',
      eyebrow: 'Documentation / 0.1', heroTitle: 'Build native Unity UI with a clearer mental model.', heroBody: 'A practical guide to installing LumaFlow, mounting an application and composing reactive UI on top of Unity UI Toolkit.',
      languageLabel: 'Language', languageHint: 'English is available now. Russian is prepared next.', onThisPage: 'On this page', sideInstall: 'Install', sideMount: 'Mount an application', sideComposition: 'Compose UI', sideState: 'React to state', sideInspection: 'Inspect a mount', viewGitHub: 'View on GitHub ↗',
      installLabel: 'Install', installTitle: 'Add the package, then import the sample.', installBody: 'LumaFlow is published as <code>com.lumaflow.ui</code>. Add it through Unity Package Manager from your chosen package source, then import the Getting Started sample from Package Manager.', installNoteTitle: 'Current distribution', installNote: 'The public package URL is being prepared. This page avoids inventing an installation command that is not yet available.',
      mountLabel: 'Mount', mountTitle: 'Keep ownership of your UIDocument.', mountBody: 'LumaFlow mounts into a root <code>VisualElement</code> that your application already owns. Pair the mount lifecycle with your MonoBehaviour lifecycle and dispose it when the host is disabled.', copy: 'Copy', copied: 'Copied',
      compositionLabel: 'Compose', compositionTitle: 'Describe the screen, not its update sequence.', compositionBody: 'Widgets are immutable C# descriptions. Compose layouts and controls with familiar typed building blocks; LumaFlow reconciles compatible widget updates against retained UI Toolkit elements.', composeCardTitle: 'Typed layout', composeCardBody: 'Rows, columns, constraints and scrolling follow UI Toolkit’s flexbox model.', retainCardTitle: 'Retained by default', retainCardBody: 'Compatible elements keep their identity instead of being recreated for each update.',
      stateLabel: 'State', stateTitle: 'Let the state-owning branch update itself.', stateBody: '<code>State&lt;T&gt;</code> is an explicit reactive value. A mounted branch that reads it is the branch that updates, keeping change propagation local and visible in source.', stateNoteTitle: 'Design principle', stateNote: 'Keep state close to the UI that owns it. Lift it only when a sibling, route or application boundary genuinely needs to share it.',
      inspectionLabel: 'Inspection', inspectionTitle: 'Inspect the retained tree when behavior needs an explanation.', inspectionBody: 'Open <code>Window › LumaFlow › Widget Inspector</code> in Unity. The inspector captures active mounts with widget and state types, native UI Toolkit identity, resolved layout and lifecycle findings.', backToArchitecture: 'Explore the architecture <span aria-hidden="true">→</span>'
    }
  };

  const setLanguage = language => {
    const dictionary = translations[language] || translations.en;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = dictionary[element.dataset.i18n];
      if (!value) return;
      if (value.includes('<')) element.innerHTML = value;
      else element.textContent = value;
    });
    document.querySelector('[data-language-toggle] span').textContent = language.toUpperCase();
    localStorage.setItem('lumaflow-language', language);
  };

  const saved = localStorage.getItem('lumaflow-language');
  setLanguage(translations[saved] ? saved : 'en');
  document.querySelector('[data-language-toggle]')?.addEventListener('click', () => setLanguage('en'));
  window.LumaFlowI18n = { setLanguage, translations };
})();
