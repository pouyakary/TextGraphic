
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { describe }
        from "mocha"
    import * as TextKit
        from "../../source"
    import { strict as assert } from
        "assert"
    import { tenNumbersInRange }
        from "../commons/range"

//
// ─── SPACED BOX TESTING ─────────────────────────────────────────────────────────
//

    export function runSpacedBoxTestSuite ( ) {
        describe( "SpacedBox Class",  function ( ) {

            //
            // ─── INITIATING ──────────────────────────────────────────────────
            //

                describe( "Initiation", function ( ) {

                    //

                    it ( "When initiating on the Unsafe mode, it should not check for line width correctness", function ( ) {
                        const box =
                            new TextKit.SpacedBox( [ "*", "**", "***" ], 1 )
                        const expected =
                            [ "*", "**", "***" ]

                        assert.deepEqual( box.lines, expected )
                    })

                    //

                    it ( "When initiating with '.initWithSpaceCheck()', it should fix spaces", function ( ) {
                        const box =
                            TextKit.SpacedBox.initWithSpaceCheck( [ "*", "**", "***" ], 1 )
                        const expected =
                            [ "*  ", "** ", "***" ]

                        assert.deepEqual( box.lines, expected )
                    })

                    //

                    it ( "When initiating with '.initWithText()', it should fix spaces", function ( ) {
                        const box =
                            TextKit.SpacedBox.initWithText( "*\n**\n***", 1 )
                        const expected =
                            [ "*  ", "** ", "***" ]

                        assert.deepEqual( box.lines, expected )
                    })

                    //

                    it ( "When initiating with '.initWithText()', it should detect lines correctly", function ( ) {
                        const box =
                            TextKit.SpacedBox.initWithText( "*\n\r\n***", 1 )
                        const expected =
                            [ "*  ", "   ", "***" ]

                        assert.deepEqual( box.lines, expected )
                    })

                    //

                    it ( "When initiating, baseline should not be out of boundary (upper boundary)", function ( done ) {
                        try {
                            new TextKit.SpacedBox( [ "", "" ], 2 )
                            throw new Error(
                                "Upper boundary problem."
                            )
                        } catch {
                            done( )
                        }
                    })

                    //

                    it ( "When initiating, baseline should not be out of boundary (lower boundary)", function ( done ) {
                        try {
                            new TextKit.SpacedBox( [ "" ], -1 )
                            throw new Error(
                                "Lower boundary problem."
                            )
                        } catch {
                            done( )
                        }
                    })

                    //

                    it ( "When initiating blank rectangle, the width of the rectangle should match the passed width", function ( ) {
                        for ( const width of tenNumbersInRange( 0, 100 ) ) {
                            const rectangle =
                                TextKit.SpacedBox.initBlankRectangle( width, 1 )
                            assert.equal( rectangle.lines[ 0 ].length, width )
                        }
                    })

                    //

                    it ( "When initiating blank rectangle, the height of the rectangle should match the passed height", function ( ) {
                        for ( const height of tenNumbersInRange( 1, 100 ) ) {
                            const rectangle =
                                TextKit.SpacedBox.initBlankRectangle( 1, height )
                            assert.equal( rectangle.lines.length, height )
                        }
                    })

                    //

                    it ( "When initiating blank rectangle, the background character of the rectangle should match the passed background character", function ( ) {
                        const box =
                            TextKit.SpacedBox.initBlankRectangle( 6, 1, "+" )
                        const expected =
                            "++++++"
                        assert.equal( box.lines[ 0 ], expected )
                    })

                    //

                    it ( "When initiating a blank box, the height should be 1", function ( ) {
                        const box =
                            TextKit.SpacedBox.initEmptyBox( )
                        assert.equal( box.lines.length, 1 )
                    })

                    //

                    it ( "When initiating a blank box, the width should be 0", function ( ) {
                        const box =
                            TextKit.SpacedBox.initEmptyBox( )
                        assert.equal( box.lines[ 0 ].length, 0 )
                    })
                })

            //
            // ─── WIDTH ATTRIBUTE ─────────────────────────────────────────────
            //

                describe ( ".width", function ( ) {
                    it ( "Should return correctly", function ( ) {
                        for ( const width of tenNumbersInRange( 0, 100 ) ) {
                            const line =
                                "*".repeat( width )
                            const box =
                                new TextKit.SpacedBox( [ line ], 0 )
                            assert.equal( box.width, width )
                        }
                    })
                })

            //
            // ─── HEIGHT ATTRIBUTE ────────────────────────────────────────────
            //

                describe ( ".height", function ( ) {
                    it ( "Should return correctly", function ( ) {
                        for ( const height of tenNumbersInRange( 1, 100 ) ) {
                            const line =
                                "*".repeat( height )
                            const box =
                                new TextKit.SpacedBox( [ line ], 0 )
                            assert.equal( box.width, height )
                        }
                    })
                })

            //
            // ─── BASELINE ATTRIBUTE ──────────────────────────────────────────
            //

                describe ( ".baseline", function ( ) {
                    it ( "Should return correctly", function ( ) {
                        const baseline =
                            3
                        const lines =
                            [ "", "", "", "", "" ]
                        const box =
                            new TextKit.SpacedBox( lines, baseline )
                        assert.equal( box.baseline, baseline )
                    })
                })

            // ─────────────────────────────────────────────────────────────────

        })

    }

// ────────────────────────────────────────────────────────────────────────────────
