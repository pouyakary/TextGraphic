
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
    import * as Tools from
        "./tools"

//
// ─── RENDERER ───────────────────────────────────────────────────────────────────
//

    const renderer =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )


//
// ─── GRAPH VIEW ─────────────────────────────────────────────────────────────────
//

    async function generateGraph ( iteration: number ) {
        const HPadding = 6
        const VPadding = 2
        const WIDTH = process.stdout.columns - HPadding * 2
        const HEIGHT = process.stdout.rows - VPadding * 2 - 1
        const GRAPH_COLOR = "cyan"
        const GUIDES_COLOR = "red"

        const graph = new TextKit.GraphView({
            renderer,
            width:      WIDTH,
            height:     HEIGHT,
            style:      { textColor: GRAPH_COLOR },
            zoom:       Math.PI * 3,
            formula:    ( x, y, width ) => {
                const thickness =
                    0.12
                const theta =
                    Math.sin( ( x - 0.5 ) * iteration / width )
                return ( y < theta + thickness ) && ( y > theta - thickness )
            }
        })


        const hLine =
            new TextKit.LineView( "─".repeat(WIDTH - 1) + "▶︎", renderer, { textColor: GUIDES_COLOR })
        const vLineLines =
            [ "▲" ]
        for ( let row = 1; row < HEIGHT; row++ ) {
            vLineLines.push( "│" )
        }
        const vLine =
            new TextKit.ShapeView( vLineLines, 0, renderer, { textColor: GUIDES_COLOR }, false )

        const canvas =
            new TextKit.CanvasView( WIDTH, HEIGHT, renderer )
        const background =
            new TextKit.CanvasView( WIDTH, HEIGHT, renderer )

        background.add( hLine, 0, Math.floor( HEIGHT / 2 ) + 1, 1 )
        background.add( vLine, Math.floor( WIDTH / 2 ), 0, 2 )
        background.fineTuneBoxIntersections( )

        canvas.add( background, 0, 0, 1 )
        canvas.add( graph, 0, 0, 2 )

        const margined =
            canvas.applyMargin( VPadding, HPadding, 0, HPadding )

        console.clear( )
        console.log( margined.styledForm )
        Tools.setCursorToBottomRight( "TextKit GraphView Demo " )
        await Tools.sleep( 100 )
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    Tools.runRenderLoop( 1, 20, generateGraph )

// ────────────────────────────────────────────────────────────────────────────────
