
//
// ─── IMPORT ─────────────────────────────────────────────────────────────────────
//

    import { PaneView }
        from "./pane-view/main"
//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export type MultiStyleView <EnvironmentStyleSettings extends Object> =
        PaneView<EnvironmentStyleSettings>

//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//

    export * from
        "./pane-view/main"

// ────────────────────────────────────────────────────────────────────────────────
