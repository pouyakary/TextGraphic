
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { LineView }
        from "./line-view/main"
    import { ShapeView }
        from "./shape-view/main"

//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//

    export type MonoStyledViews =
        ShapeView | LineView

    export * from "./line-view/main"
    export * from "./shape-view/main"

// ────────────────────────────────────────────────────────────────────────────────
