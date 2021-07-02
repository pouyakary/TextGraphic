
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "./views/shape-view"
    import { StyleRendererProtocol }
        from "../../protocols/style-renderer-protocol"


//
// ─── BIRD ───────────────────────────────────────────────────────────────────────
//

    export function createShapeViewBirdSample <EnvironmentStyleSettings extends Object> (
            styler: StyleRendererProtocol<EnvironmentStyleSettings>
        ) {

        //
        const lines = [
            "  ██████        ",
            "████  ██        ",
            "  ██████        ",
            "  ████████      ",
            "  ██████████████",
            "  ████████████  ",
            "  ████████      ",
            "    ██          ",
        ]

        return new ShapeView( lines, 4, styler, { }, true )
    }

//
// ─── ALIEN ──────────────────────────────────────────────────────────────────────
//

    export function createShapeViewAlienSample <EnvironmentStyleSettings extends Object> (
            styler: StyleRendererProtocol<EnvironmentStyleSettings>
        ) {

        //
        const lines = [
            "  ██████████  ",
            "  ████  ████  ",
            "  ██████████  ",
            "    ██████    ",
            "██████████████",
            "██  ██  ██  ██",
            "    ██  ██    ",
            "  ████  ████  ",
        ]

        return new ShapeView( lines, 4, styler, { }, true  )
    }

// ────────────────────────────────────────────────────────────────────────────────
