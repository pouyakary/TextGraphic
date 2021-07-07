
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

    const renderer =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── SAMPLE ─────────────────────────────────────────────────────────────────────
//

    function createSample ( ) {
        const background =
            new TextKit.CanvasView( 7, 4, renderer )

        const sampleBox1 =
            TextKit.ShapeView.initBlankRectangle( 3, 1, renderer )
                .frame( TextKit.Presets.LightBoxPreset )

        const sampleBox2 =
            TextKit.ShapeView.initBlankRectangle( 3, 1, renderer )
                .frame( TextKit.Presets.HeavyBoxPreset )

        background.add( sampleBox1, 0, 0, 1 )
        background.add( sampleBox2, 2, 1, 2 )

        return background
    }

//
// ─── SAMPLE BOXES ───────────────────────────────────────────────────────────────
//

    const normalSample =
        createSample( )
    const tunnedSample =
        createSample( )
            .fineTuneBoxIntersections( )
    const arrow =
        new TextKit.LineView( "becomes", renderer, { })
    const spacing =
        3

    const container =
        new TextKit.CanvasView(
            2 * ( spacing + normalSample.width ) + arrow.width,
            normalSample.height,
            renderer,
        )

    container.add( normalSample,
        0,
        0,
        0,
    )

    container.add( arrow,
        normalSample.width + spacing,
        Math.floor( container.height / 2 ),
        0,
    )

    container.add( tunnedSample,
        container.width - tunnedSample.width,
        0,
        0,
    )

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//



    const background =
        new TextKit.CanvasView(
            process.stdout.columns,
            10,
            renderer
        )

    background.add( container,
        Math.floor( ( background.width - container.width ) / 2 ),
        Math.floor( ( background.height - container.height ) / 2 ),
        0,
    )

    console.log( background.styledForm )

// ────────────────────────────────────────────────────────────────────────────────
