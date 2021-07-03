
//
// ─── IMPORT ─────────────────────────────────────────────────────────────────────
//

    import { CanvasView }
        from "./canvas-view/main"
    import { PortableStyle }
        from "../../protocols"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export type MultiStyleView <EnvironmentStyleSettings extends PortableStyle<any>> =
        CanvasView<EnvironmentStyleSettings>

//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//

    export * from
        "./canvas-view/main"

// ────────────────────────────────────────────────────────────────────────────────
