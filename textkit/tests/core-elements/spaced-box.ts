
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { describe }
        from "mocha"
    import * as TextKit
        from "../../source"
    import { strict as assert } from
        "assert"

//
// ─── SPACED BOX TESTING ─────────────────────────────────────────────────────────
//

    describe( "TextKit.SpacedBox",  function ( ) {

        //
        // ─── TOOLS ───────────────────────────────────────────────────────
        //

            function generateRandomSize ( min = 1 ): number {
                return Math.floor( Math.random( ) * ( 20 - min ) ) + min
            }

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
                        throw "Upper boundary problem."
                    } catch {
                        done( )
                    }
                })

                //

                it ( "When initiating, baseline should not be out of boundary (lower boundary)", function ( done ) {
                    try {
                        new TextKit.SpacedBox( [ "" ], -1 )
                        throw "Lower boundary problem."
                    } catch {
                        done( )
                    }
                })

                //

                it ( "When initiating blank rectangle, the width of the rectangle should match the passed width", function ( ) {
                    const rectangleWidth =
                        generateRandomSize( )
                    const rectangle =
                        TextKit.SpacedBox.initBlankRectangle( rectangleWidth, 1 )
                    assert.equal( rectangle.lines[ 0 ].length, rectangleWidth )
                })

                //

                it ( "When initiating blank rectangle, the height of the rectangle should match the passed height", function ( ) {
                    const rectangleHeight =
                        generateRandomSize( )
                    const rectangle =
                        TextKit.SpacedBox.initBlankRectangle( 1, rectangleHeight )
                    assert.equal( rectangle.lines.length, rectangleHeight )
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
                it ( ".width should return correctly", function ( ) {
                    for ( let i = 0; i < 10; i++ ) {
                        const width =
                            generateRandomSize( )
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
                it ( ".height should return correctly", function ( ) {
                    for ( let i = 0; i < 10; i++ ) {
                        const height =
                            generateRandomSize( )
                        const lines =
                            new Array<string> ( )
                        for ( let j = 0; j < height; j++ ) {
                            lines.push( "*" )
                        }
                        const box =
                            new TextKit.SpacedBox( lines, 0 )
                        assert.equal( box.height, height )
                    }
                })
            })

        // ─────────────────────────────────────────────────────────────────

    })

// ────────────────────────────────────────────────────────────────────────────────
