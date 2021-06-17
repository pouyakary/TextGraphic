
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "../main"
    import { BoxFrameCharSet }
        from "../../../shapes/box-frames"

//
// ─── FRAME SPACED BOX ───────────────────────────────────────────────────────────
//

    export function frameSpacedBox ( box: SpacedBox, charSet: BoxFrameCharSet ) {
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
            new SpacedBox( lines, box.baseline + 1 )
        return result
    }