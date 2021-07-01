
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "../views/shape-view"
    import { MonoStyleViews }
        from ".."

//
// ─── CONCAT VERTICALLY ──────────────────────────────────────────────────────────
//

    export function concatMonoStyledViewsVertically ( boxes: MonoStyleViews[ ],
                                                   baseLine: number ): ShapeView {
        const resultWidth =
            Math.max( ...boxes.map( box => box.width ) )
        const lines =
            new Array<string> ( )

        for ( const box of boxes ) {
            const centeredBox =
                box.cloneWithViewCenteredToBoundary( resultWidth, box.height )
            for ( const line of centeredBox.lines ) {
                lines.push( line )
            }
        }

        return new ShapeView( lines, baseLine )
    }

// ────────────────────────────────────────────────────────────────────────────────
