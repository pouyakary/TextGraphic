
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "../main"

//
// ─── CONCAT VERTICALLY ──────────────────────────────────────────────────────────
//

    export function concatSpacedBoxesVertically ( boxes: SpacedBox[ ], baseLine: number ) {
        const resultWidth =
            Math.max( ...boxes.map( box => box.width ) )
        const lines =
            new Array<string> ( )

        for ( const box of boxes ) {
            const centeredBox =
                box.centerToBox( resultWidth, box.height )
            for ( const line of centeredBox.lines ) {
                lines.push( line )
            }
        }

        return new SpacedBox( lines, baseLine )
    }

// ────────────────────────────────────────────────────────────────────────────────
