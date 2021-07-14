
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { performance }
        from "perf_hooks"
    import * as TextKit
        from "../source"

//
// ─── ENVIRONMENT ────────────────────────────────────────────────────────────────
//

    const renderer =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    interface Tests {
        title:          string
        averageTime:    number
    }

//
// ─── BENCHMARKING SUITE ─────────────────────────────────────────────────────────
//

    export class Benchmark {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            #tests: Tests[ ]
            #runs:  number

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( runs: number ) {
                this.#tests =
                    [ ]
                this.#runs =
                    runs
            }

        //
        // ─── MEASURE ─────────────────────────────────────────────────────
        //

            public measure ( title: string, func: ( ) => void ) {
                let times = 0
                for ( let i = 1; i <= this.#runs; i++ ) {
                    const start =
                        performance.now( )
                    func( )
                    const end =
                        performance.now( )
                    const time =
                        end - start
                    times +=
                        time
                }

                const averageTime =
                    times / this.#runs

                this.#tests.push({
                    title, averageTime
                })
            }

        //
        // ─── SORT RESULTS ────────────────────────────────────────────────
        //

            private sortTests ( ) {
                this.#tests.sort(( a, b ) =>
                    a.averageTime - b.averageTime
                )
            }

        //
        // ─── SUMMARY ─────────────────────────────────────────────────────
        //

            public showSummary ( ) {
                this.sortTests( )

                let row = 1
                const rows =
                    this.#tests.map( test => {
                        const rowText =
                            TextKit.ShapeView.initWithText( ( row++ ).toString( ),
                                0, renderer, { })
                                .applyMargin( 0, 2, 0, 2 )
                        const title =
                            TextKit.ShapeView.initWithText( test.title,
                                0, renderer, { })
                                .applyMargin( 0, 2, 0, 2 )
                        const time =
                            TextKit.ShapeView.initWithText( test.averageTime.toString( ),
                                0, renderer, { })
                                .applyMargin( 0, 2, 0, 2 )
                        return [ rowText, title, time ]
                    })


                const table =
                    TextKit.Layouts.createShapeViewTableInTextForm(
                        rows, renderer, { }
                    )

                const runsTextTitle =
                    TextKit.ShapeView.initWithText( ` Sample rate: ${ this.#runs } `, 0, renderer, { })
                const runsText =
                    runsTextTitle.frame( TextKit.Presets.LightBox )

                const canvas =
                    new TextKit.CanvasView( table.width, table.height + 2, renderer )

                canvas.add( runsText, 0, 0, 0 )
                canvas.add( table, 0, 2, 0 )
                canvas.fineTuneBoxIntersections( )

                const finalView =
                    canvas.applyMargin( 1, 0, 1, 2 )

                console.log( finalView.styledForm )
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────

