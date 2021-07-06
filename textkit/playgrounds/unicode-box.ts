
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
        from "../source/index"

//
// ─── ENVIRONMENTS ───────────────────────────────────────────────────────────────
//

    const styler =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── CONST BACKGROUND ───────────────────────────────────────────────────────────
//

    const background =
        new TextKit.CanvasView( 7, 4, styler )

    const sampleBox1 =
        TextKit.ShapeView.initBlankRectangle( 3, 1, styler )
            .frame( TextKit.Presets.LightBoxPreset )

    const sampleBox2 =
        TextKit.ShapeView.initBlankRectangle( 3, 1, styler )
            .frame( TextKit.Presets.HeavyBoxPreset )

    background.add( sampleBox1, 0, 0, 1 )
    background.add( sampleBox2, 2, 1, 2 )

    background.fineTuneUnicodeBoxes( )

    console.log( background.styledForm )

// ────────────────────────────────────────────────────────────────────────────────
