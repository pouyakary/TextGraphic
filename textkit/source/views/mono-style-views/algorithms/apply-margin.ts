
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { MonoStyleViews }
        from ".."
    import { ShapeView }
        from "../views/shape-view"
    import { createEmptyStringLine }
        from "../../../tools/string"
    import { PortableStyle }
        from "../../../protocols"

//
// ─── APPLY MARGIN ───────────────────────────────────────────────────────────────
//

    export function applyMarginToMonoStyleView <ColorType, EnvironmentStyleSettings extends PortableStyle<any>> (
            box:    MonoStyleViews<ColorType, EnvironmentStyleSettings>,
            top:    number,
            right:  number,
            bottom: number,
            left:   number,
        ): ShapeView<ColorType, EnvironmentStyleSettings> {

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
        return new ShapeView(
            lines, box.baseline + top, box.styleRenderer, box.style, false
        )
    }

// ────────────────────────────────────────────────────────────────────────────────
