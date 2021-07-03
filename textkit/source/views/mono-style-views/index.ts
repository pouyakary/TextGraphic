
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { LineView }
        from "./views/line-view"
    import { ShapeView }
        from "./views/shape-view"
    import { PortableStyle }
        from "../../protocols"

//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//

    export type MonoStyleViews<EnvironmentStyleSettings extends PortableStyle<any>> =
        ShapeView<EnvironmentStyleSettings> | LineView<EnvironmentStyleSettings>

    export * from "./views/line-view"
    export * from "./views/shape-view"

// ────────────────────────────────────────────────────────────────────────────────
