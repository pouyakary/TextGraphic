
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
        from "../source"

//
// ─── TESTING SAMPLE ─────────────────────────────────────────────────────────────
//

    //   ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
    //   │ X │ Z │   │   │   │ Y │ Y │ Y │ Y │   │   │ X │
    //   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
    //   │   │   │ [ │ + │ ] │ [ │ + │ ] │   │   │   │   │
    //   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
    //   │ Z │   │   │   │ [ │ * │ ] │ Z │   │ Y │ Y │ Y │
    //   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
    //   │   │   │   │   │   │   │   │   │   │   │   │   │
    //   ├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
    //   │   │ X │   │   │   │   │   │   │   │   │ X │ Z │
    //   └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘

    function createModel ( renderer: any ) {
        const map = [
            "xz   yyyy  x", // x: red color
            "  +  +      ", // z: no style
            "z   *  z yyy", // y: blue color
            "            ", // *: 3 char red color
            " x        x ", // +: 3 char blue italic
        ]

        const width =
            map[0].length
        const height =
            map.length
        const canvas =
            new TextGraphic.CanvasView( width, height, renderer )
        const X =
            new TextGraphic.LineView( "X", renderer, { color: "red" })
        const Z =
            new TextGraphic.LineView( "Z", renderer, { })
        const Y =
            new TextGraphic.LineView( "Z", renderer, { color: "blue" })
        const P =
            new TextGraphic.LineView( "+++", renderer, { color: "blue", italic: true })
        const A =
            new TextGraphic.LineView( "***", renderer, { color: "red" })

        for ( let y = 0; y < height; y++ ) {
            for ( let x = 0; x < width; x++ ) {
                switch ( map[ y ][ x ] ) {
                    case "x":
                        canvas.add( X, x, y, 0 )
                        break
                    case "y":
                        canvas.add( Y, x, y, 0 )
                        break
                    case "z":
                        canvas.add( Z, x, y, 0 )
                        break
                    case "*":
                        canvas.add( A, x, y, 0 )
                        break
                    case "+":
                        canvas.add( P, x, y, 0 )
                        break
                }
            }
        }

        return canvas
    }

//
// ─── RENDERERS ──────────────────────────────────────────────────────────────────
//

    const terminalRenderer =
        new TextGraphic.Environments.ANSITerminal.ANSITerminalStyleRenderer( )
    const terminalRender =
        createModel( terminalRenderer ).styledForm

    console.log( terminalRender )

// ────────────────────────────────────────────────────────────────────────────────
