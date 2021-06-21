
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
// ─── TOOLS ──────────────────────────────────────────────────────────────────────
//

    describe ( "Tools", function ( ) {

        //
        // ─── STRING ──────────────────────────────────────────────────────
        //

            describe ( "String", function ( ) {
                it ( "createEmptyStringLine( ) should return string with the right size", function ( ) {
                    const expectation =
                        "     "
                    const line =
                        StringTools.createEmptyStringLine( 5 )
                    assert.equal( line, expectation )
                })

                //

                it ( "createEmptyStringLine( ) should not break on sizes =< 0", function ( ) {
                    for ( const size of tenNumbersInRange( -20, 0 ) ) {
                        const line =
                            StringTools.createEmptyStringLine( size )
                        assert.equal( "", line )
                    }
                })

                //

                it ( "perfectLineToSize( ) should pad the line rightly", function ( ) {
                    for ( const lineSize of tenNumbersInRange( 2, 40 ) ) {
                        const sampleLine =
                            "*".repeat( Math.floor( Math.random( ) * lineSize ) + 1 )
                        const paddedLine =
                            StringTools.perfectLineToSize( sampleLine, lineSize )
                        assert.equal( paddedLine.length, lineSize )
                    }
                })

                //

                it ( "unifyLineSpaces( ) should make all the lines have the same length", function ( ) {
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

        // ─────────────────────────────────────────────────────────────────

    })

// ────────────────────────────────────────────────────────────────────────────────
