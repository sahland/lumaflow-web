using LumaFlow;

namespace LumaFlowDocs.NextSteps {
    public sealed class LocalCounter : StatefulWidget<LocalCounterState> { }

    public sealed class LocalCounterState : WidgetState {
        private int _count;

        public override Widget Build(BuildContext context) => new Column(new Widget[] {
            new Text($"Local count: {_count}"),
            new Button("Increment local count", () => SetState(() => _count++))
        }, gap: 12f);
    }
}
