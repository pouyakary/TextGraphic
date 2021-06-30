
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "../shape-view/main"
    import { MonoStyledViews }
        from ".."

//
// ─── CONCAT VERTICALLY ──────────────────────────────────────────────────────────
//

    export function concatMonoStyledViewsVertically ( boxes: MonoStyledViews[ ],
                                                   baseLine: number ): ShapeView {
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

        return new ShapeView( lines, baseLine )
    }

// ────────────────────────────────────────────────────────────────────────────────
