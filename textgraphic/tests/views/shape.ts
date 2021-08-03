
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { describe }
        from "mocha"
    import * as TextGraphic
        from "../../source"
    import { strict as assert } from
        "assert"
    import { tenNumbersInRange }
        from "../commons/range"

//
// ─── SPACED BOX TESTING ─────────────────────────────────────────────────────────
//

    export function runShapeViewTestSuite ( ) {
        describe( "ShapeView Class",  function ( ) {

            //
            // ─── EXAMPLE ENVIRONMENT ─────────────────────────────────────────
            //

                const styler =
                    new TextGraphic.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

            //
            // ─── INITIATING ──────────────────────────────────────────────────
            //

                describe( "Initiation", function ( ) {

                    //

                    it ( "When initiating on the Unsafe mode, it should not check for line width correctness", function ( ) {
                        const box =
                            new TextGraphic.ShapeView( [ "*", "**", "***" ], 1, styler, { }, false )
                        const expected =
                            [ "*", "**", "***" ]

                        assert.deepEqual( box.lines, expected )
                    })

                    //

                    it ( "When initiating with '.initWithSpaceCheck()', it should fix spaces", function ( ) {
                        const box =
                            TextGraphic.ShapeView.initWithSpaceCheck( [ "*", "**", "***" ], 1, styler, { } )
                        const expected =
                            [ "*  ", "** ", "***" ]

                        assert.deepEqual( box.lines, expected )
                    })

                    //

                    it ( "When initiating with '.initWithText()', it should fix spaces", function ( ) {
                        const box =
                            TextGraphic.ShapeView.initWithText( "*\n**\n***", 1, styler, { } )
                        const expected =
                            [ "*  ", "** ", "***" ]

                        assert.deepEqual( box.lines, expected )
                    })

                    //

                    it ( "When initiating with '.initWithText()', it should detect lines correctly", function ( ) {
                        const box =
                            TextGraphic.ShapeView.initWithText( "*\n\r\n***", 1, styler, { } )
                        const expected =
                            [ "*  ", "   ", "***" ]

                        assert.deepEqual( box.lines, expected )
                    })

                    //

                    it ( "When initiating, baseline should not be out of boundary (upper boundary)", function ( done ) {
                        try {
                            new TextGraphic.ShapeView( [ "", "" ], 2, styler, { }, false )
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
                            new TextGraphic.ShapeView( [ "" ], -1, styler, { }, false )
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
                                TextGraphic.ShapeView.initBlankRectangle( width, 1, styler )
                            assert.equal( rectangle.lines[ 0 ].length, width )
                        }
                    })

                    //

                    it ( "When initiating blank rectangle, the height of the rectangle should match the passed height", function ( ) {
                        for ( const height of tenNumbersInRange( 1, 100 ) ) {
                            const rectangle =
                                TextGraphic.ShapeView.initBlankRectangle( 1, height, styler )
                            assert.equal( rectangle.lines.length, height )
                        }
                    })

                    //

                    it ( "When initiating blank rectangle, the background character of the rectangle should match the passed background character", function ( ) {
                        const box =
                            TextGraphic.ShapeView.initBlankRectangle( 6, 1, styler, "+" )
                        const expected =
                            "++++++"
                        assert.equal( box.lines[ 0 ], expected )
                    })

                    //

                    it ( "When initiating a blank box, the height should be 1", function ( ) {
                        const box =
                            TextGraphic.ShapeView.initEmptyBox( styler )
                        assert.equal( box.lines.length, 1 )
                    })

                    //

                    it ( "When initiating a blank box, the width should be 0", function ( ) {
                        const box =
                            TextGraphic.ShapeView.initEmptyBox( styler )
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
                                new TextGraphic.ShapeView( [ line ], 0, styler, { }, false )
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
                                new TextGraphic.ShapeView( [ line ], 0, styler, { }, false )
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
                            new TextGraphic.ShapeView( lines, baseline, styler, { }, false )
                        assert.equal( box.baseline, baseline )
                    })
                })

            // ─────────────────────────────────────────────────────────────────

        })

    }

// ────────────────────────────────────────────────────────────────────────────────
