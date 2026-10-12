#nullable enable
using LumaFlow;

namespace LumaFlowDocs.NextSteps {
    public sealed class ProjectFormDemo : StatefulWidget<ProjectFormDemoState> { }

    public sealed class ProjectFormDemoState : WidgetState {
        private readonly State<string> _name = new("");
        private readonly State<bool> _updates = new(false);
        private readonly State<string> _status = new("Not saved");
        private readonly State<int> _userChanges = new(0);
        private readonly FormState _form = new(FormValidationMode.OnSubmit);
        private FormField<string> _nameField = null!;
        private string _savedName = "";
        private bool _savedUpdates;

        protected override void InitState() {
            _nameField = new FormField<string>(_name, value =>
                value.Trim().Length >= 3 ? null : "Use at least 3 characters.");
        }

        public override Widget Build(BuildContext context) => new ScrollView(new Center(
            ConstrainedBox.AtMost(new Padding(
                new Form(_form, new Column(new Widget[] {
                    new Text("Project settings", context.Theme!.Typography.Title),
                    new TextField(_nameField, label: "Project name",
                        placeholder: "Enter a name", onChanged: _ => UserEdited()),
                    new Checkbox(_updates, label: "Email updates",
                        onChanged: _ => UserEdited()),
                    new Button("Save locally", () => { _form.Submit(SaveValidated); }),
                    new Button("Load example", LoadExample),
                    new Button("Restore saved", RestoreSaved),
                    new ReactiveBuilder<string>(_status, value => new Text(value)),
                    new ReactiveBuilder<int>(_userChanges,
                        value => new Text($"User changes: {value}"))
                }, gap: 16f), onSubmit: SaveValidated),
                EdgeInsets.All(24f)), width: 520f)));

        private void UserEdited() {
            _userChanges.Value++;
            _status.Value = "Unsaved changes";
        }

        // Form.Submit invokes this only after mounted fields pass validation.
        private void SaveValidated() {
            _savedName = _name.Value.Trim();
            _savedUpdates = _updates.Value;
            _status.Value = $"Saved locally: {_savedName}";
        }

        private void LoadExample() {
            _name.Value = "Demo project";
            _updates.Value = true;
            _form.ClearValidation();
            _status.Value = "Example loaded (not saved)";
        }

        private void RestoreSaved() {
            _name.Value = _savedName;
            _updates.Value = _savedUpdates;
            _form.ClearValidation();
            _status.Value = "Restored last saved values";
        }
    }
}
