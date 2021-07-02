
//
// ─── IMPORT ─────────────────────────────────────────────────────────────────────
//

    import { CanvasView }
        from "./canvas-view/main"
//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export type MultiStyleView <EnvironmentStyleSettings extends Object> =
        CanvasView<EnvironmentStyleSettings>

//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//

    export * from
        "./canvas-view/main"

// ────────────────────────────────────────────────────────────────────────────────
