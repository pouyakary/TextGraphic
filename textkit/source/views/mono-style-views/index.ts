
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { LineView }
        from "./views/line-view"
    import { ShapeView }
        from "./views/shape-view"

//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//

    export type MonoStyleViews<EnvironmentStyleSettings extends Object> =
        ShapeView<EnvironmentStyleSettings> | LineView<EnvironmentStyleSettings>

    export * from "./views/line-view"
    export * from "./views/shape-view"

// ────────────────────────────────────────────────────────────────────────────────
