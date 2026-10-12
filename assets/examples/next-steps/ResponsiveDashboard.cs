using LumaFlow;

namespace LumaFlowDocs.NextSteps {
    public sealed class ResponsiveDashboard : StatelessWidget {
        public override Widget Build(BuildContext context) => SizedBox.Expand(
            new LayoutBuilder((_, constraints) => {
                var narrow = constraints.MaxWidth < 720f;
                Widget content = narrow
                    ? new Column(new Widget[] {
                        new Text("Navigation: Projects"),
                        new Expanded(BuildProjects())
                    }, gap: 16f)
                    : new Row(new Widget[] {
                        new SizedBox(new Text("Navigation: Projects"), width: 180f),
                        new Expanded(BuildProjects())
                    }, gap: 24f);
                return SizedBox.Expand(new Padding(content, EdgeInsets.All(24f)));
            }));

        private static Widget BuildProjects() {
            var rows = new Widget[40];
            for (var i = 0; i < rows.Length; i++)
                rows[i] = new SizedBox(new Text($"Project {i + 1}"), height: 36f);
            return SizedBox.Expand(new Column(new Widget[] {
                new Text("Projects — this heading stays visible"),
                new Expanded(new ScrollView(new Column(rows, gap: 8f)))
            }, gap: 16f));
        }
    }
}
