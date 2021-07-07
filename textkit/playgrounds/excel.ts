
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { performance }
        from "perf_hooks"
    import * as TextKit
        from "../source"

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const CELL_WIDTH =
        18
    const CELL_HEIGHT =
        3
    const TABLE_COLUMNS =
        5
    const TABLE_ROWS =
        6
    const LEFT_PADDING =
        4
    const PADDING_VERTICALLY =
        2
    const WAIT_MS =
        120

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    type StyleRenderer =
        TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer

//
// ─── WAIT ───────────────────────────────────────────────────────────────────────
//

    const sleep = ( ) =>
        new Promise( resolve => setTimeout( resolve, WAIT_MS ) )

//
// ─── MAKE THE CELL ──────────────────────────────────────────────────────────────
//

    function createCell ( text: string, active: boolean, styler: StyleRenderer ) {
        const border =
            ( active
                ? TextKit.Presets.HeavyBoxPreset
                : TextKit.Presets.LightBoxPreset
                )

        const box =
            TextKit.ShapeView.initWithText( text, 0, styler, { bold: true })
            .centerToBoundaryBox( CELL_WIDTH - 2, 1 )
            .frame( border )

        box.style = {
            bold: true,
        }

        return box
    }

//
// ─── MAKING THE TABLE ───────────────────────────────────────────────────────────
//

    function renderTable ( activeColumn: number, styler: StyleRenderer ) {
        const canvasWidth =
            ( ( ( CELL_WIDTH - 1 ) * TABLE_COLUMNS ) + 2 ) + LEFT_PADDING
        const canvasHeight =
            ( ( ( CELL_HEIGHT - 1 ) * TABLE_ROWS ) + 1 ) + 1 * PADDING_VERTICALLY
        const tableCanvas =
            new TextKit.CanvasView( canvasWidth, canvasHeight, styler )

        const ALPHABET =
            [ "A", "B", "C", "D", "E", "F", "G", "H" ]

        for ( let row = 0; row < TABLE_ROWS; row++ ) {
            for ( let column = 0; column < TABLE_COLUMNS; column++ ) {
                const active =
                    row === 1 && column === activeColumn
                const x =
                    ( column * ( CELL_WIDTH - 1 ) ) + 1 + LEFT_PADDING
                const y =
                    ( row * ( CELL_HEIGHT - 1 ) ) + PADDING_VERTICALLY
                const text =
                    `${ALPHABET[column]}${row + 1}`
                const cell =
                    createCell( text, active, styler )

                tableCanvas.add( cell, x, y, active ? 2 : 1 )
            }
        }

        tableCanvas.fineTuneBoxIntersections( )

        console.log( tableCanvas.styledForm )
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    main( ); async function main( ) {
        const styler =
            new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

        while ( true ) {
            for ( const column of [ 0, 1, 2, 3, 4 ] ) {
                renderTable( column, styler )
                const start = performance.now( )
                await sleep( )
                const end = performance.now( )
                process.stdout.write(
                    String.fromCharCode(27) + "]0;" +
                    Math.floor( end - start - WAIT_MS )
                    + "ms" + String.fromCharCode(7)
                )
                console.clear( )
            }
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
