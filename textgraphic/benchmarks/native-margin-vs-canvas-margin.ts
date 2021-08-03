
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { Benchmark }
        from "./suite"
    import * as TextGraphic
        from "../source"

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const renderer =
        new TextGraphic.Environments.ANSITerminal.ANSITerminalStyleRenderer( )
    const benchmark =
        new Benchmark( 10 )

//
// ─── SAMPLE BACKGROUND ──────────────────────────────────────────────────────────
//

    const SAMPLE_BACKGROUND =
        TextGraphic.ShapeView.initBlankRectangle(
            100, 100, renderer, "*"
        )

//
// ─── MARGIN NATIVELY TO 200 ─────────────────────────────────────────────────────
//

    benchmark.measure( "100 -> 200 / Native", ( ) => {
        const marginedSample =
            SAMPLE_BACKGROUND.applyMargin( 50, 50, 50, 50 )
        marginedSample.styledForm
    })

//
// ─── MARGIN NATIVELY TO 500 ─────────────────────────────────────────────────────
//

    benchmark.measure( "100 -> 500 / Native", ( ) => {
        const marginedSample =
            SAMPLE_BACKGROUND.applyMargin( 200, 200, 200, 200 )
        marginedSample.styledForm
    })

//
// ─── MARGIN NATIVELY TO 1000 ────────────────────────────────────────────────────
//

    benchmark.measure( "100 -> 1000 / Native", ( ) => {
        const marginedSample =
            SAMPLE_BACKGROUND.applyMargin( 450, 450, 450, 450 )
        marginedSample.styledForm
    })

//
// ─── MARGIN NATIVELY TO 5000 ────────────────────────────────────────────────────
//

    benchmark.measure( "100 -> 2000 / Native", ( ) => {
        const marginedSample =
            SAMPLE_BACKGROUND.applyMargin( 950, 950, 950, 950 )
        marginedSample.styledForm
    })

//
// ─── MARGIN WITH CANVAS FROM 100 TO 200 ─────────────────────────────────────────
//

    benchmark.measure( "100 -> 200 / Canvas", ( ) => {
        const canvas =
            new TextGraphic.CanvasView( 200, 200, renderer )
        canvas.add( SAMPLE_BACKGROUND, 50, 50, 0 )
        canvas.styledForm
    })

//
// ─── MARGIN WITH CANVAS FROM 100 TO 500 ─────────────────────────────────────────
//

    benchmark.measure( "100 -> 500 / Canvas", ( ) => {
        const canvas =
            new TextGraphic.CanvasView( 500, 500, renderer )
        canvas.add( SAMPLE_BACKGROUND, 250, 250, 0 )
        canvas.styledForm
    })

//
// ─── MARGIN WITH CANVAS FROM 100 TO 1000 ────────────────────────────────────────
//

    benchmark.measure( "100 -> 1000 / Canvas", ( ) => {
        const canvas =
            new TextGraphic.CanvasView( 1000, 1000, renderer )
        canvas.add( SAMPLE_BACKGROUND, 450, 450, 0 )
        canvas.styledForm
    })

//
// ─── MARGIN WITH CANVAS FROM 100 TO 1000 ────────────────────────────────────────
//

    benchmark.measure( "100 -> 2000 / Canvas", ( ) => {
        const canvas =
            new TextGraphic.CanvasView( 2000, 2000, renderer )
        canvas.add( SAMPLE_BACKGROUND, 950, 950, 0 )
        canvas.styledForm
    })

//
// ─── DONE ───────────────────────────────────────────────────────────────────────
//

    benchmark.showSummary( )

// ────────────────────────────────────────────────────────────────────────────────
