
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

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

//
// ─── MAKE THE CELL ──────────────────────────────────────────────────────────────
//

    function createCell ( text: string, active: boolean ) {
        const border =
            ( active
                ? TextKit.BoxFramePresets.HeavyBoxPreset
                : TextKit.BoxFramePresets.LightBoxPreset
                )

        const box =
            TextKit.SpacedBox.initWithText( text, 0 )
            .centerToBox( CELL_WIDTH - 2, 1 )
            .frame( border )
            .setANSITerminalStyle({
                italic: active
            })

        return box
    }

//
// ─── MAKING THE TABLE ───────────────────────────────────────────────────────────
//

    const paneWidth =
        ( ( ( CELL_WIDTH - 1 ) * TABLE_COLUMNS ) + 2 ) + LEFT_PADDING
    const paneHeight =
        ( ( ( CELL_HEIGHT - 1 ) * TABLE_ROWS ) + 1 ) + 2 * PADDING_VERTICALLY
    const tablePane =
        TextKit.LayeredPane.initWithTransparentBackground(
            paneWidth, paneHeight )

    const ALPHABET =
        [ "A", "B", "C", "D", "E", "F", "G", "H" ]

    for ( let row = 0; row < TABLE_ROWS; row++ ) {
        for ( let column = 0; column < TABLE_COLUMNS; column++ ) {
            const active =
                row === 1 && column === 3
            const x =
                ( column * ( CELL_WIDTH - 1 ) ) + 1 + LEFT_PADDING
            const y =
                ( row * ( CELL_HEIGHT - 1 ) ) + PADDING_VERTICALLY
            const text =
                active ? "=SUM(A1:A4)" : `${ALPHABET[column]}${row + 1}`
            const cell =
                createCell( text, active )

            tablePane.add( cell, x, y, active ? 2 : 1 )
        }
    }

    tablePane.fineTuneUnicodeBoxes( )

    console.log( tablePane.ANSITerminalForm )

// ────────────────────────────────────────────────────────────────────────────────
