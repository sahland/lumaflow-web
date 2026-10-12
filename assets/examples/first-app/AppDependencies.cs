using LumaFlow;

namespace LumaFlowDocs.Structured {
    public sealed class AppDependencies {
        public State<int> ProjectCount { get; } = new(0);

        public void AddProject() => ProjectCount.Value++;
    }
}
