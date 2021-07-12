
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "../views/shape-view"
    import { MonoStyleViews }
        from ".."
    import { PortableStyle }
        from "../../../protocols"

//
// ─── CONCAT VERTICALLY ──────────────────────────────────────────────────────────
//

    export function concatMonoStyledViewsVertically <ColorType, EnvironmentStyleSettings extends PortableStyle<any>> (
            boxes:      MonoStyleViews<ColorType, EnvironmentStyleSettings>[ ],
            baseLine:   number,
        ): ShapeView<ColorType, EnvironmentStyleSettings> {

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
