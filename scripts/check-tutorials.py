"""Validate static tutorial links and ensure copied C# matches downloadable files.

Run: python scripts/check-tutorials.py (no third-party dependencies).
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.copies, self.snippets = set(), [], [], {}
        self.current_code = None
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            assert attrs["id"] not in self.ids, f"Duplicate ID: {attrs['id']}"
            self.ids.add(attrs["id"])
        if tag in ("a", "link", "script", "img"):
            self.links.append(attrs.get("href", attrs.get("src", "")))
        if "data-copy-source" in attrs:
            self.copies.append(attrs["data-copy-source"])
        if tag == "pre" and attrs.get("id", "").startswith("code-"):
            self.current_code = attrs["id"]
            self.snippets[self.current_code] = ""

    def handle_endtag(self, tag):
        if tag == "pre":
            self.current_code = None

    def handle_data(self, data):
        if self.current_code:
            self.snippets[self.current_code] += data


def main():
    checks = 0
    names = ["FirstScreen", "AppDependencies", "AppTheme", "CounterPage", "AppRoot", "AppBootstrap"]
    for name in ["tutorial-ru.html", "tutorial.html", "docs-ru.html", "docs.html", "architecture-ru.html", "architecture.html", "reference-ru.html", "reference.html", "overlays-ru.html", "overlays.html"]:
        page = Page(ROOT / name)
        for raw in page.links:
            url = urlsplit(raw)
            if url.scheme or url.netloc or not raw:
                continue
            target = ROOT / unquote(url.path) if url.path else ROOT / name
            assert target.is_file(), f"{name}: missing local target {raw}"
            if url.fragment:
                assert url.fragment in Page(target).ids, f"{name}: missing anchor {raw}"
            checks += 1
        for copy in page.copies:
            assert copy in page.ids, f"{name}: missing copy target {copy}"
            checks += 1
        examples, folder = [], "next-steps"
        if name.startswith("tutorial"):
            examples, folder = names, "first-app"
        elif name.startswith("architecture"):
            examples = ["LocalCounter"]
        elif name.startswith("reference"):
            examples = ["ResponsiveDashboard"]
        elif name.startswith("overlays"):
            examples = ["NavigationDemo"]
        if examples:
            assert set(page.snippets) == {f"code-{x}" for x in examples}, f"{name}: incomplete examples"
            for example in examples:
                source = (ROOT / f"assets/examples/{folder}/{example}.cs").read_text(encoding="utf-8").strip()
                assert page.snippets[f"code-{example}"].strip() == source, f"{name}: snippet differs from {example}.cs"
                checks += 1
    print(f"Tutorial validation PASSED: {checks} checks; links, anchors, copy targets, nine complete RU/EN examples")


if __name__ == "__main__":
    main()
