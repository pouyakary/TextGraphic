
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { MonoStyledViews }
        from "../../../views/mono-styled-views"
    import { ShapeView }
        from "../../../views/mono-styled-views/shape-view/main"
    import { BoxFrameCharSet }
        from "../../presets/box-frames"

//
// ─── FRAME SHAPE VIEW ───────────────────────────────────────────────────────────
//

    export function frameMonoStyledViews ( box: MonoStyledViews, charSet: BoxFrameCharSet ) {
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
            new ShapeView( lines, box.baseline + 1 )
        return result
    }