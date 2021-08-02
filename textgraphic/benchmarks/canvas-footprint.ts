
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
    import * as TextKit
        from "../source"

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const VIEW_PORT_WIDTH =
        1000
    const VIEW_PORT_HEIGHT =
        1000

    const renderer =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )
    const benchmark =
        new Benchmark( 10 )

//
// ─── SAMPLE BACKGROUND ──────────────────────────────────────────────────────────
//

    const SAMPLE_BACKGROUND =
        TextKit.ShapeView.initBlankRectangle(
            VIEW_PORT_WIDTH, VIEW_PORT_HEIGHT, renderer, "*"
        )

//
// ─── NO CANVAS ──────────────────────────────────────────────────────────────────
//

    benchmark.measure ( "Rendering without any canvas", ( ) => {
        SAMPLE_BACKGROUND.styledForm
    })

//
// ─── ONE CANVAS ─────────────────────────────────────────────────────────────────
//

    benchmark.measure ( "Rendering without with 1 canvas", ( ) => {
        const canvas =
            new TextKit.CanvasView( VIEW_PORT_WIDTH, VIEW_PORT_HEIGHT, renderer )
        canvas.add( SAMPLE_BACKGROUND, 0, 0, 0 )
        canvas.styledForm
    })

//
// ─── TWO CANVASES ───────────────────────────────────────────────────────────────
//

    benchmark.measure ( "Rendering without with 2 canvases", ( ) => {
        const canvasOne =
            new TextKit.CanvasView( VIEW_PORT_WIDTH, VIEW_PORT_HEIGHT, renderer )
        canvasOne.add( SAMPLE_BACKGROUND, 0, 0, 0 )

        const canvasTwo =
            new TextKit.CanvasView( VIEW_PORT_WIDTH, VIEW_PORT_HEIGHT, renderer )
        canvasTwo.add( canvasOne, 0, 0, 0 )

        canvasTwo.styledForm
    })

//
// ─── THREE CANVASES ─────────────────────────────────────────────────────────────
//

    benchmark.measure ( "Rendering without with 3 canvases", ( ) => {
        const canvasOne =
            new TextKit.CanvasView( VIEW_PORT_WIDTH, VIEW_PORT_HEIGHT, renderer )
        canvasOne.add( SAMPLE_BACKGROUND, 0, 0, 0 )

        const canvasTwo =
            new TextKit.CanvasView( VIEW_PORT_WIDTH, VIEW_PORT_HEIGHT, renderer )
        canvasTwo.add( canvasOne, 0, 0, 0 )

        const canvasThree =
            new TextKit.CanvasView( VIEW_PORT_WIDTH, VIEW_PORT_HEIGHT, renderer )
        canvasThree.add( canvasTwo, 0, 0, 0 )

        canvasThree.styledForm
    })

//
// ─── FOUR CANVASES ──────────────────────────────────────────────────────────────
//

    benchmark.measure ( "Rendering without with 3 canvases", ( ) => {
        const canvasOne =
            new TextKit.CanvasView( VIEW_PORT_WIDTH, VIEW_PORT_HEIGHT, renderer )
        canvasOne.add( SAMPLE_BACKGROUND, 0, 0, 0 )

        const canvasTwo =
            new TextKit.CanvasView( VIEW_PORT_WIDTH, VIEW_PORT_HEIGHT, renderer )
        canvasTwo.add( canvasOne, 0, 0, 0 )

        const canvasThree =
            new TextKit.CanvasView( VIEW_PORT_WIDTH, VIEW_PORT_HEIGHT, renderer )
        canvasThree.add( canvasTwo, 0, 0, 0 )

        const canvasFour =
            new TextKit.CanvasView( VIEW_PORT_WIDTH, VIEW_PORT_HEIGHT, renderer )
        canvasFour.add( canvasThree, 0, 0, 0 )

        canvasFour.styledForm
    })

//
// ─── DONE ───────────────────────────────────────────────────────────────────────
//

    benchmark.showSummary( )

// ────────────────────────────────────────────────────────────────────────────────
