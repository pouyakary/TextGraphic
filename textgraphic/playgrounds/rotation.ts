
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
// ─── RENDERER ───────────────────────────────────────────────────────────────────
//

    const renderer =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── RENDER GRAPH ───────────────────────────────────────────────────────────────
//

    function renderGraph ( color: string, f: number ) {
        return TextKit.Shapes.Graph.create({
            renderer,
            width:  process.stdout.columns,
            height: process.stdout.rows,
            style: {
                color: color as never
            },
            formula: ( iX, iY ) => {
                // bounds of the 3
                const size = 0.5
                const x =
                    iX * Math.cos( f ) - iY * Math.sin( f )
                const y =
                    iY * Math.cos( f ) + iX * Math.sin( f )
                return (
                    x > -size && x < size && y > -size && y < size
                )
            }
        })
    }

//
// ─── RENDER FRAME ───────────────────────────────────────────────────────────────
//

    async function renderFrame ( f: number ) {
        const canvas =
            new TextKit.CanvasView(
                process.stdout.columns, process.stdout.rows, renderer
            )
        canvas.add(
            renderGraph( "red", f * 1.5 ),
            0, 0, 1
        )
        canvas.add(
            renderGraph( "blue", f ),
            0, 0, 2
        )

        console.clear( )
        console.log( canvas.styledForm )
        Tools.setCursorToBottomRight( "Rotation Matrix Test " )
        await Tools.sleep( 100 )
    }

Tools.runRenderLoop( 0, 180, renderFrame )

// ────────────────────────────────────────────────────────────────────────────────
