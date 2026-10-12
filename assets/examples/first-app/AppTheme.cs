using LumaFlow;
using UnityEngine;

namespace LumaFlowDocs.Structured {
    public static class AppTheme {
        private static readonly Color Ink = new Color32(44, 48, 62, 255);
        private static readonly Color Paper = new Color32(245, 244, 240, 255);
        private static readonly Color Accent = new Color32(98, 83, 150, 255);

        public static ThemeData Data { get; } = new(
            colors: new ColorScheme(
                canvas: Paper, surface: Color.white, surfaceVariant: Paper,
                primary: Accent, primaryContainer: Paper, onPrimary: Color.white,
                onSurface: Ink, onSurfaceVariant: Color.gray, outline: Color.gray),
            typography: new TypographyTheme(
                title: new TextStyle(Ink, 26f, FontStyle.Bold),
                headline: new TextStyle(Ink, 20f, FontStyle.Bold),
                body: new TextStyle(Ink, 16f),
                label: new TextStyle(Color.white, 16f)),
            spacing: new SpacingTheme(4f, 8f, 12f, 20f, 32f),
            radius: new RadiusTheme(
                BorderRadius.All(8f), BorderRadius.All(12f), BorderRadius.All(20f)),
            buttonTheme: new ButtonTheme(
                primary: new ButtonStyle(background: Accent, foreground: Color.white,
                    padding: EdgeInsets.Symmetric(horizontal: 20f, vertical: 12f),
                    shape: BorderRadius.All(12f), minimumSize: new Vector2(120f, 48f)),
                secondary: new ButtonStyle(background: Paper, foreground: Ink,
                    padding: EdgeInsets.All(12f), shape: BorderRadius.All(12f))));
    }
}
