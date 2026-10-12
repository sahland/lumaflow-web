using LumaFlow;

namespace LumaFlowDocs.Structured {
    public sealed class CounterPage : StatelessWidget {
        private readonly AppDependencies _app;

        public CounterPage(AppDependencies app) => _app = app;

        public override Widget Build(BuildContext context) => new Center(new Padding(
            new Column(new Widget[] {
                new Text("Project counter", context.Theme!.Typography.Title),
                new ReactiveBuilder<int>(_app.ProjectCount,
                    value => new Text($"Projects: {value}")),
                new Button("Add project", _app.AddProject)
            }, gap: 16f), EdgeInsets.All(24f)));
    }
}
