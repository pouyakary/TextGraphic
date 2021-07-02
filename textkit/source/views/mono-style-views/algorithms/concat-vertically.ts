
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

    export function concatMonoStyledViewsVertically <EnvironmentStyleSettings extends Object> (
            boxes:      MonoStyleViews<EnvironmentStyleSettings>[ ],
            baseLine:   number,
        ): ShapeView<EnvironmentStyleSettings> {

        //
        if ( boxes.length === 0 ) {
            throw new Error ("Cannot concat empty list.")
        }

        const resultWidth =
            Math.max( ...boxes.map( box => box.width ) )
        const lines =
            new Array<string> ( )

        for ( const box of boxes ) {
            const centeredBox =
                box.centerToBoundaryBox( resultWidth, box.height )
            for ( const line of centeredBox.lines ) {
                lines.push( line )
            }
        }

        return new ShapeView(
            lines, baseLine, boxes[ 0 ].styleRenderer, { }, true
        )
    }

// ────────────────────────────────────────────────────────────────────────────────
