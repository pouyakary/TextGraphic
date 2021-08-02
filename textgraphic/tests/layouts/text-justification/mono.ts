
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as MonoTextJustification
        from "../../../source/layouts/test-justification/mono"
    import { describe }
        from "mocha"
    import { strict as assert }
        from "assert"

//
// ─── TEXT JUSTIFICATION TEST SUITE ──────────────────────────────────────────────
//

    export function runMonoTextJustificationTestSuite ( ) {
        describe ( "Mono Text Justification Layout & Tools", function ( ) {

            //
            // ─── THE WORDS SEPARATOR ─────────────────────────────────────────
            //

                describe ( "separateWordsBySpaceAndIncludeSpacesInResult( )", function ( ) {
                    function test ( title: string, input: string, expectedOutput: string[ ] ) {
                        it ( title, function ( ) {
                            const output =
                                MonoTextJustification.separateWordsBySpaceAndIncludeSpacesInResult( input )
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
