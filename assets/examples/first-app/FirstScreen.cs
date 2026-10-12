#nullable enable
using System.Collections;
using LumaFlow;
using UnityEngine;
using UIDocument = UnityEngine.UIElements.UIDocument;
using Framework = LumaFlow.LumaFlow;

namespace LumaFlowDocs.Minimal {
    [RequireComponent(typeof(UIDocument))]
    [DisallowMultipleComponent]
    public sealed class FirstScreen : MonoBehaviour {
        private readonly State<int> _count = new(0);
        private MountHandle? _mount;
        private Coroutine? _startup;

        private void OnEnable() => _startup = StartCoroutine(MountWhenReady());

        private IEnumerator MountWhenReady() {
            yield return null;
            var document = GetComponent<UIDocument>();
            if (document.panelSettings == null) {
                Debug.LogError("Assign Panel Settings on the UIDocument.", this);
                _startup = null;
                yield break;
            }
            while (document.rootVisualElement?.panel == null) yield return null;
            _mount = Framework.Mount(BuildScreen(), document.rootVisualElement);
            _startup = null;
        }

        private Widget BuildScreen() => new Scaffold(new Center(new Padding(
            new Column(new Widget[] {
                new Text("My first LumaFlow app"),
                new ReactiveBuilder<int>(_count,
                    value => new Text($"Projects: {value}")),
                new Button("Add project", () => _count.Value++)
            }, gap: 12f), EdgeInsets.All(24f))));

        private void OnDisable() {
            if (_startup != null) StopCoroutine(_startup);
            _startup = null;
            _mount?.Dispose();
            _mount = null;
        }
    }
}
