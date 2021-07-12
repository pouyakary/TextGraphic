
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextKit from
        "../source"

//
// ─── RENDERER ───────────────────────────────────────────────────────────────────
//

    const renderer =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const HPadding = 6
    const VPadding = 2
    const WIDTH = process.stdout.columns - HPadding * 2
    const HEIGHT = process.stdout.rows - 2 - VPadding * 2

//
// ─── GRAPH VIEW ─────────────────────────────────────────────────────────────────
//

    const graph = new TextKit.GraphView({
        renderer,
        width:      WIDTH,
        height:     HEIGHT,
        style:      { textColor: "cyan" },
        scale:      0.01,
        formula:    ( x, y, width ) => {
            const a = ( x / width )
            const s = Math.sin( a ) * 22
            return y < ( Math.sin( s ) / 13 )
        }
    })


    const hLine =
        new TextKit.LineView( "─".repeat(WIDTH - 1) + "▶︎", renderer, { textColor: "blue" })
    const vLineLines =
        [ "▲" ]
    for ( let row = 1; row < HEIGHT; row++ ) {
        vLineLines.push( "│" )
    }
    const vLine =
        new TextKit.ShapeView( vLineLines, 0, renderer, { textColor: "blue" }, false)

    const canvas =
        new TextKit.CanvasView( WIDTH, HEIGHT, renderer )
    const background =
        new TextKit.CanvasView( WIDTH, HEIGHT, renderer )

    background.add( hLine, 0, Math.floor( HEIGHT / 2 ) + 1, 1 )
    background.add( vLine, Math.floor( WIDTH / 2 ), 0, 2 )
    background.fineTuneBoxIntersections( )

    canvas.add( background, 0, 0, 1 )
    canvas.add( graph, 0, 0, 2 )



    const margined = canvas.applyMargin( VPadding, HPadding, VPadding, HPadding )

    console.log( margined.styledForm )

// ────────────────────────────────────────────────────────────────────────────────
