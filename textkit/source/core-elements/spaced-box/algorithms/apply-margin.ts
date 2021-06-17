

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "../main"

//
// ─── APPLY MARGIN ───────────────────────────────────────────────────────────────
//

    export function applyMarginToSpacedBox ( box: SpacedBox,
                                             top: number,
                                           right: number,
                                          bottom: number,
                                            left: number ): SpacedBox {
        //
        const topBottomSpaceLines =
            SpacedBox.spaceLineOfSize( left + box.width + right )
        const leftSpaceLines =
            SpacedBox.spaceLineOfSize( left )
        const rightSpaceLines =
            SpacedBox.spaceLineOfSize( right )
        const lines =
            new Array<string> ( )

        // top
        for ( let counter = 0; counter < top; counter++ ) {
            lines.push( topBottomSpaceLines )
        }

        // middle
        for ( const line of box.lines ) {
            lines.push( leftSpaceLines + line + rightSpaceLines )
        }

        // bottom
        for ( let counter = 0; counter < bottom; counter++ ) {
            lines.push( topBottomSpaceLines )
        }

        //
        return new SpacedBox( lines, box.baseline + top )
    }

// ────────────────────────────────────────────────────────────────────────────────
