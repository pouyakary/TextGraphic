
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextKit
        from "../source"
    import * as Tools
        from "./tools"

//
// ─── ENVIRONMENT ────────────────────────────────────────────────────────────────
//

    const styler =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── TESTING TRANSPARENCY ───────────────────────────────────────────────────────
//

    const box1 =
        TextKit.ShapeView.initBlankRectangle( 8, 3, styler )
            .frame( TextKit.Presets.LightBox )

    box1.style = {
        color: "blue"
    }

    const box2 =
        TextKit.ShapeView.initBlankRectangle( 8, 3, styler )
            .frame( TextKit.Presets.LightBox )
    box2.style = {
        color: "red"
    }


    const box3 =
        TextKit.ShapeView.initBlankRectangle( 8, 3, styler )
            .frame( TextKit.Presets.LightBox )

    box3.style = {
        color: "green"
    }

    box3.transparent = false


    const canvas =
        new TextKit.CanvasView( 21, 10, styler )

    canvas.add( box1, 0, 1, 1 )
    canvas.add( box2, 5, 2, 2 )
    canvas.add( box3, 11, 3, 3 )

    canvas.fineTuneBoxIntersections( )

    const displayCanvas =
        new TextKit.CanvasView(
            process.stdout.columns,
            process.stdout.rows - 1,
            styler
        )
    displayCanvas.add(
        canvas,
        Math.floor( ( displayCanvas.width - canvas.width ) / 2 ),
        Math.floor( ( displayCanvas.height - canvas.height ) / 2 ),
        0
    )

    console.clear( )
    console.log( displayCanvas.styledForm )

    Tools.setCursorToBottomRight( "Over-lapping Views and Transparency in TextKit " )
    Tools.sleep( 100 * 1000 )

// ────────────────────────────────────────────────────────────────────────────────
