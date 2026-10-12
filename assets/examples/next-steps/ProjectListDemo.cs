using System;
using System.Collections.Generic;
using System.Linq;
using LumaFlow;

namespace LumaFlowDocs.NextSteps {
    public sealed class ProjectListDemo : StatefulWidget<ProjectListDemoState> { }

    public sealed class ProjectListDemoState : WidgetState {
        private readonly List<Project> _all = new();
        private readonly State<string> _query = new("");
        private readonly State<IReadOnlyList<Project>> _visible = new(Array.Empty<Project>());
        private readonly State<IReadOnlyList<WidgetKey>> _selected = new(Array.Empty<WidgetKey>());
        private readonly State<string> _order = new("Ascending");
        private readonly ListViewController _scroll = new();
        private bool _descending;
        private int _nextId = 2001;

        protected override void InitState() {
            for (var id = 1; id <= 2000; id++) _all.Add(new Project(id));
            Refresh();
        }

        public override Widget Build(BuildContext context) => SizedBox.Expand(new Padding(
            new Column(new Widget[] {
                new Text("Projects", context.Theme!.Typography.Title),
                new TextField(_query, label: "Search", onChanged: _ => Refresh()),
                new Row(new Widget[] {
                    new Button("Reverse order", ReverseOrder),
                    new Button("Clear search", ClearSearch)
                }, gap: 8f),
                new Row(new Widget[] {
                    new Button("Add project", AddProject),
                    new Button("Delete selected", DeleteSelected)
                }, gap: 8f),
                new ReactiveBuilder<string>(_order, value => new Text(value)),
                new ReactiveBuilder<IReadOnlyList<Project>>(_visible, rows => new Text(
                    rows.Count == 0 ? "No matches. Clear the search." : $"Matches: {rows.Count}")),
                new ReactiveBuilder<IReadOnlyList<WidgetKey>>(_selected, keys => new Text(
                    keys.Count == 0 ? "Selected: none" : $"Selected: {keys[0].Value}")),
                new Expanded(new ListView<Project>(_visible,
                    project => new Padding(new Text(project.Name), EdgeInsets.All(8f)),
                    itemHeight: 44f,
                    itemKey: KeyOf,
                    selectionMode: ListSelectionMode.Single,
                    selectedKeys: _selected,
                    controller: _scroll))
            }, gap: 12f), EdgeInsets.All(24f)));

        private void Refresh() {
            var term = _query.Value.Trim();
            var matches = _all.Where(p => p.Name.IndexOf(term, StringComparison.OrdinalIgnoreCase) >= 0);
            _visible.Value = (_descending ? matches.OrderByDescending(p => p.Id) : matches.OrderBy(p => p.Id)).ToArray();
            _scroll.JumpTo(0f);
        }

        private void ReverseOrder() {
            _descending = !_descending;
            _order.Value = _descending ? "Descending" : "Ascending";
            Refresh();
        }

        private void ClearSearch() {
            _query.Value = "";
            Refresh(); // Programmatic assignment does not replay TextField.onChanged.
        }

        private void AddProject() {
            _all.Add(new Project(_nextId++));
            Refresh();
        }

        private void DeleteSelected() {
            var keys = new HashSet<WidgetKey>(_selected.Value);
            _all.RemoveAll(p => keys.Contains(KeyOf(p)));
            _selected.Value = Array.Empty<WidgetKey>();
            Refresh();
        }

        private static WidgetKey KeyOf(Project project) => new($"project:{project.Id}");

        private sealed class Project {
            public Project(int id) { Id = id; Name = $"Project {id:D4}"; }
            public int Id { get; }
            public string Name { get; }
        }
    }
}
