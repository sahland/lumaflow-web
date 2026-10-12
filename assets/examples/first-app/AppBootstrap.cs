#nullable enable
using System.Collections;
using LumaFlow;
using UnityEngine;
using UIDocument = UnityEngine.UIElements.UIDocument;
using Framework = LumaFlow.LumaFlow;

namespace LumaFlowDocs.Structured {
    [RequireComponent(typeof(UIDocument))]
    [DisallowMultipleComponent]
    public sealed class AppBootstrap : MonoBehaviour {
        private AppDependencies? _app;
        private MountHandle? _mount;
        private Coroutine? _startup;

        private void OnEnable() {
            _app = new AppDependencies();
            _startup = StartCoroutine(MountWhenReady());
        }

        private IEnumerator MountWhenReady() {
            yield return null;
            var document = GetComponent<UIDocument>();
            if (document.panelSettings == null) {
                Debug.LogError("Assign Panel Settings on the UIDocument.", this);
                _startup = null;
                yield break;
            }
            while (document.rootVisualElement?.panel == null) yield return null;
            _mount = Framework.Mount(new AppRoot(_app!), document.rootVisualElement);
            _startup = null;
        }

        private void OnDisable() {
            if (_startup != null) StopCoroutine(_startup);
            _startup = null;
            _mount?.Dispose();
            _mount = null;
            _app = null;
        }
    }
}
