

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
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const ITERATION_START       = 5
    const ITERATION_END         = 20
    const GRAPH_COLOR           = "red"
    const GUIDES_COLOR          = "blue"
    const GRAPH_BOX_V_PADDING   = 1
    const GRAPH_BOX_H_PADDING   = 2

//
// ─── GRAPH VIEW ─────────────────────────────────────────────────────────────────
//

    async function renderFrame ( iteration: number ) {
        const progress =
            iteration / 10
        const ellipse_width =
            Math.floor( process.stdout.columns * 0.4 * progress )
        const ellipse_height =
            Math.floor( process.stdout.rows * 0.5 ) + 1
        const titleText =
            ` W${ellipse_width} • H${ellipse_height} `

        const graph =
            TextKit.Shapes.Graph.create({
                renderer,
                width:      ellipse_width,
                height:     ellipse_height,
                style:      { textColor: GRAPH_COLOR },
                formula:    TextKit.Shapes.Graph.Formulas.Ellipse
            })

        const graphBoxBackground =
            TextKit.ShapeView.initBlankRectangle(
                ellipse_width  + 2 * GRAPH_BOX_H_PADDING,
                ellipse_height + 2 * GRAPH_BOX_V_PADDING,
                renderer,
            )
            .frame( TextKit.Presets.HeavyBox )
            .addStyle({ textColor: GUIDES_COLOR })

        const title =
            TextKit.ShapeView.initWithText( titleText, 0, renderer, { } )
                .frame( TextKit.Presets.HeavyBox )
                .addStyle({ textColor: GUIDES_COLOR })

        const graphBox =
            new TextKit.CanvasView(
                ellipse_width  + 2 * GRAPH_BOX_H_PADDING + 2,
                ellipse_height + 2 * GRAPH_BOX_V_PADDING + 2,
                renderer,
            )

        graphBox.add( graphBoxBackground, 0, 0, 1 )
        graphBox.add( title, 0, 0, 2 )
        graphBox.add( graph, 1 + GRAPH_BOX_H_PADDING, 1 + GRAPH_BOX_V_PADDING, 2 )

        const finalView =
            graphBox.centerToBoundaryBox(
                process.stdout.columns,
                process.stdout.rows,
            )

        finalView.fineTuneBoxIntersections( )

        console.clear( )
        console.log( finalView.styledForm )
        Tools.setTerminalTitle( titleText )
        Tools.setCursorToBottomRight( "TextKit Ellipse Demo " )
        await Tools.sleep( 50 )
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    Tools.runRenderLoop( ITERATION_START, ITERATION_END, renderFrame )

// ────────────────────────────────────────────────────────────────────────────────
