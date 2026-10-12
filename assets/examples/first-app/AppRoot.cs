using LumaFlow;

namespace LumaFlowDocs.Structured {
    public sealed class AppRoot : StatelessWidget {
        private readonly AppDependencies _app;

        public AppRoot(AppDependencies app) => _app = app;

        public override Widget Build(BuildContext context) => new Theme(
            AppTheme.Data,
            new Scaffold(new CounterPage(_app)));
    }
}
