
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { MonoStyleViews }
        from "../../../views/mono-style-views"
    import { ShapeView }
        from "../../../views/mono-style-views/views/shape-view"
    import { BoxFrameCharSet }
        from "../../../presets/box-frames"
    import { PortableStyle }
        from "../../../protocols"

//
// ─── FRAME SHAPE VIEW ───────────────────────────────────────────────────────────
//

    export function frameMonoStyledViews <EnvironmentStyleSettings extends PortableStyle<any>> (
            box:        MonoStyleViews<EnvironmentStyleSettings>,
            charSet:    BoxFrameCharSet,
        ) {

        //
        const firstLine =
            charSet.topLeft + charSet.top.repeat( box.width ) + charSet.topRight
        const lastLine =
            charSet.bottomLeft + charSet.bottom.repeat( box.width ) + charSet.bottomRight
        const middleLines =
            box.lines.map( line =>
                charSet.left + line + charSet.right )
        const lines: string[ ] =
            [ firstLine, ...middleLines, lastLine ]
        const result =
            new ShapeView(
                lines, box.baseline + 1,
                box.styleRenderer, box.style, box.transparent
            )
        return result
    }

// ────────────────────────────────────────────────────────────────────────────────
