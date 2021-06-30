

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { MonoStyledViews }
        from ".."
    import { ShapeView }
        from "../shape-view/main"
    import { createEmptyStringLine }
        from "../../../tools/string"

//
// ─── APPLY MARGIN ───────────────────────────────────────────────────────────────
//

    export function applyMarginToShapeView ( box: MonoStyledViews,
                                             top: number,
                                           right: number,
                                          bottom: number,
                                            left: number ): ShapeView {
        //
        const topBottomSpaceLines =
            createEmptyStringLine( left + box.width + right )
        const leftSpaceLines =
            createEmptyStringLine( left )
        const rightSpaceLines =
            createEmptyStringLine( right )
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
        return new ShapeView( lines, box.baseline + top )
    }

// ────────────────────────────────────────────────────────────────────────────────
