
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as StringTools
        from "../../source/tools/string"
    import { describe, it }
        from "mocha"
    import { strict as assert }
        from "assert"
    import { tenNumbersInRange }
        from "../commons/range"

//
// ─── STRING TOOLS TEST SUITE ────────────────────────────────────────────────────
//

    export function runStringToolsTestSuite ( ) {
        describe ( "String Tools", function ( ) {

            //
            // ─── CREATE EMPTY STRING LINE ────────────────────────────────────
            //

                describe ( "createEmptyStringLine( )", function ( ) {
                    it ( "Should return string with the right size", function ( ) {
                        const expectation =
                            "     "
                        const line =
                            StringTools.createEmptyStringLine( 5 )
                        assert.equal( line, expectation )
                    })

                    //

                    it ( "Should not break on sizes =< 0", function ( ) {
                        for ( const size of tenNumbersInRange( -20, 0 ) ) {
                            const line =
                                StringTools.createEmptyStringLine( size )
                            assert.equal( "", line )
                        }
                    })

                    //

                    it ( "Should not break on decimal sizes", function ( ) {
                        const line =
                            StringTools.createEmptyStringLine( 2.5 )
                        assert.equal( "  ", line )
                    })

                })

            //
            // ─── PERFECT LINE TO SIZE ────────────────────────────────────────
            //

                describe ( "perfectLineToSize( )", function ( ) {
                    it ( "Should pad the line rightly", function ( ) {
                        for ( const lineSize of tenNumbersInRange( 2, 40 ) ) {
                            const sampleLine =
                                "*".repeat( Math.floor( Math.random( ) * lineSize ) + 1 )
                            const paddedLine =
                                StringTools.perfectLineToSize( sampleLine, lineSize )
                            assert.equal( paddedLine.length, lineSize )
                        }
                    })
                })

            //
            // ─── UNIFY LINE SPACES ───────────────────────────────────────────
            //

                describe ( "unifyLineSpaces( )", function ( ) {
                    it ( "Should make all the lines have the same length", function ( ) {
                        for ( let i = 0; i < 10; i++ ) {
                            const lines =
                                new Array<string> ( )
                            for ( let line = 0; line < 10; line++ ) {
                                lines.push( "*".repeat( Math.floor( Math.random( ) * 10 ) ) )
                            }

                            const expectedLineSize =
                                Math.max( ...lines.map( x => x.length ) )
                            const unifiedLines =
                                StringTools.unifyLineSpaces( lines )

                            for ( const line of unifiedLines ) {
                                assert.equal( expectedLineSize, line.length )
                            }
                        }
                    })

                })

            //
            // ─── BREAK STRING INTO LINES ─────────────────────────────────────
            //

                describe ( "breakStringIntoLines( )", function ( ) {
                    const samples = [
                        { text: "\\r\\n", joint: "\r\n" },
                        { text: "\\r", joint: "\r" },
                        { text: "\\n\\r", joint: "\n\r" },
                        { text: "\\n", joint: "\n" },
                    ]

                    for ( const joint of samples ) {
                        it ( `Should break on ${ joint.text } right`, function () {
                            const input =
                                "x" + joint.joint + "y"
                            const expectation =
                                [ "x", "y" ]
                            const result =
                                StringTools.breakStringIntoLines( input )
                            assert.deepEqual( expectation, result )
                        })
                    }

                    //

                    it ( `Should break a sequence of "\\n"s as one`, function () {
                        const input =
                            "x\n\ny"
                        const expectation =
                            [ "x", "", "y" ]
                        const result =
                            StringTools.breakStringIntoLines( input )
                        assert.deepEqual( expectation, result )
                    })

                    //

                    it ( `Should break a sequence of "\\r"s as one`, function () {
                        const input =
                            "x\r\ry"
                        const expectation =
                            [ "x", "", "y" ]
                        const result =
                            StringTools.breakStringIntoLines( input )
                        assert.deepEqual( expectation, result )
                    })
                })

            // ─────────────────────────────────────────────────────────────────

        })

    }

// ────────────────────────────────────────────────────────────────────────────────
