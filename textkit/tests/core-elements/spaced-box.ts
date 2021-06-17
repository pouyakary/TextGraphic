
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
                    assert.equal(
                        new TextKit.SpacedBox( [ "*", "**", "***" ], 1 ).plainTextForm,
                        "*\n**\n***"
                    )
                })


                it ( "When initiating with 'initWithText()' it, it should fix spaces", function ( ) {
                    assert.equal(
                        TextKit.SpacedBox.initWithText( "*\n**\n***", 1 ).plainTextForm,
                        "*  \n** \n***"
                    )
                })
            })

        // ─────────────────────────────────────────────────────────────────

    })

// ────────────────────────────────────────────────────────────────────────────────
