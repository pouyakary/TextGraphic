
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextGraphic
        from "../source/index"

//
// ─── ENVIRONMENTS ───────────────────────────────────────────────────────────────
//

    const renderer =
        new TextGraphic.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── SAMPLE ─────────────────────────────────────────────────────────────────────
//

    function createSample ( ) {
        const background =
            new TextGraphic.CanvasView( 7, 4, renderer )

        const sampleBox1 =
            TextGraphic.ShapeView.initBlankRectangle( 3, 1, renderer )
                .frame( TextGraphic.Presets.LightBox )

        const sampleBox2 =
            TextGraphic.ShapeView.initBlankRectangle( 3, 1, renderer )
                .frame( TextGraphic.Presets.HeavyBox )

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
        new TextGraphic.LineView( "becomes", renderer, { })
    const spacing =
        3

    const container =
        new TextGraphic.CanvasView(
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
        new TextGraphic.CanvasView(
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
