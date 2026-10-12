#nullable enable
using System;
using LumaFlow;

namespace LumaFlowDocs.NextSteps {
    public sealed class NavigationDemo : StatefulWidget<NavigationDemoState> { }

    public sealed class NavigationDemoState : WidgetState {
        private Navigator _navigator = null!;
        private readonly OverlayController _overlay = new();

        protected override void InitState() {
            _navigator = new Navigator(new HomePage(OpenDetails));
        }

        private void OpenDetails() => _navigator.Push(new Route(
            new WidgetKey("project-1"),
            new DetailsPage(() => { _navigator.Pop(); }),
            RouteTransition.Fade(TimeSpan.FromMilliseconds(180))));

        public override Widget Build(BuildContext context) => new BackNavigation(
            new OverlayHost(new NavigatorHost(_navigator), _overlay),
            _navigator, _overlay);

        private sealed class HomePage : StatelessWidget {
            private readonly Action _open;
            public HomePage(Action open) => _open = open;
            public override Widget Build(BuildContext context) => new Padding(
                new Column(new Widget[] {
                    new Text("Project list"),
                    new LocalCounter(),
                    new Button("Open project 1", _open)
                }, gap: 16f), EdgeInsets.All(24f));
        }

        private sealed class DetailsPage : StatelessWidget {
            private readonly Action _back;
            public DetailsPage(Action back) => _back = back;
            public override Widget Build(BuildContext context) => new Padding(
                new Column(new Widget[] {
                    new Text("Project 1 details"),
                    new Button("Back to projects", _back)
                }, gap: 16f), EdgeInsets.All(24f));
        }
    }
}
