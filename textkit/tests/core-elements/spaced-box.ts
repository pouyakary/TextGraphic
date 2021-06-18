
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { describe } from
        "mocha"
    import * as TextKit from
        "../../source"
    import { strict as assert } from
        "assert"

//
// ─── SPACED BOX TESTING ─────────────────────────────────────────────────────────
//

    describe( "TextKit.SpacedBox",  function ( ) {

        //
        // ─── INITIATING ──────────────────────────────────────────────────
        //

            describe( "Initiation", function ( ) {

                it ( "When initiating on the Unsafe mode, it should not check for line width correctness", function ( ) {
                    const box =
                        new TextKit.SpacedBox( [ "*", "**", "***" ], 1 )
                    const expected =
                        [ "*", "**", "***" ]

                    assert.deepEqual( box.lines, expected )
                })


                it ( "When initiating with '.initWithSpaceCheck()', it should fix spaces", function ( ) {
                    const box =
                        TextKit.SpacedBox.initWithSpaceCheck( [ "*", "**", "***" ], 1 )
                    const expected =
                        [ "*  ", "** ", "***" ]

                    assert.deepEqual( box.lines, expected )
                })



                it ( "When initiating with '.initWithText()', it should fix spaces", function ( ) {
                    const box =
                        TextKit.SpacedBox.initWithText( "*\n**\n***", 1 )
                    const expected =
                        [ "*  ", "** ", "***" ]

                    assert.deepEqual( box.lines, expected )
                })



                it ( "When initiating with '.initWithText()', it should detect lines correctly", function ( ) {
                    const box =
                        TextKit.SpacedBox.initWithText( "*\n\r\n***", 1 )
                    const expected =
                        [ "*  ", "   ", "***" ]

                    assert.deepEqual( box.lines, expected )
                })
            })

        // ─────────────────────────────────────────────────────────────────

    })

// ────────────────────────────────────────────────────────────────────────────────
