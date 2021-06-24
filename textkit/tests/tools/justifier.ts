
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextJustifierTools
        from "../../source/tools/justifier"
    import { describe }
        from "mocha"
    import { strict as assert }
        from "assert"

//
// ─── TEXT JUSTIFIER TESTS ───────────────────────────────────────────────────────
//

    export function runTextJustifierToolsTestSuite ( ) {
        describe ( "Text Justifier", function ( ) {

            //
            // ─── THE WORDS SEPARATOR ─────────────────────────────────────────
            //

                describe ( "separateWordsBySpaceAndIncludeSpacesInResult( )", function ( ) {
                    function test ( title: string, input: string, expectedOutput: string[ ] ) {
                        it ( title, function ( ) {
                            const output =
                                TextJustifierTools.separateWordsBySpaceAndIncludeSpacesInResult( input )
                            assert.deepEqual( output, expectedOutput )
                        })
                    }

                    //

                    test (
                        "Should include spaces in the results",
                        "hello world",
                        [ "hello", " ", "world" ]
                    )

                    //

                    test (
                        "Should not break spaces",
                        "x   y",
                        [ "x", "   ", "y" ]
                    )

                    //

                    test (
                        "Should include trailing spaces",
                        "x   ",
                        [ "x", "   " ]
                    )

                    //

                    test (
                        "Should separate with \\n",
                        "x\ny",
                        [ "x", "\n", "y" ]
                    )

                    //

                    test (
                        "Should not mistake \\n for space",
                        " \n ",
                        [ " ", "\n", " " ]
                    )

                    //

                    test (
                        "Should treat each \\n individually",
                        "\n\n\n",
                        [ "\n", "\n", "\n" ]
                    )

                    //

                    test (
                        "Should include trailing \\n",
                        "x\n",
                        [ "x", "\n" ]
                    )
                })

            // ─────────────────────────────────────────────────────────────────

        })
    }

// ────────────────────────────────────────────────────────────────────────────────
