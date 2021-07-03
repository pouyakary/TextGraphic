
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "./views/shape-view"
    import { StyleRendererProtocol, PortableStyle }
        from "../../protocols"


//
// ─── BIRD ───────────────────────────────────────────────────────────────────────
//

    export function createShapeViewBirdSample <EnvironmentStyleSettings extends PortableStyle<any>> (
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

    export function createShapeViewAlienSample <EnvironmentStyleSettings extends PortableStyle<any>> (
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
