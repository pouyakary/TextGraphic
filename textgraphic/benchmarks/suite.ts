
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
    import * as TextGraphic
        from "../source"

//
// ─── ENVIRONMENT ────────────────────────────────────────────────────────────────
//

    const renderer =
        new TextGraphic.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

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
        // ─── PRINT MEASURE HEADER ────────────────────────────────────────
        //

            private printMeasureHeader ( ) {
                process.stdout.write(
                    this.#tests.length === 0
                        ? "\n  "
                        : " • "
                )
            }

        //
        // ─── CLEAR LINE ──────────────────────────────────────────────────
        //

            private clearLine ( ) {
                process.stdout.write("\x1b[1K")
                process.stdout.write("\x1b[0G")
            }

        //
        // ─── MEASURE ─────────────────────────────────────────────────────
        //

            public measure ( title: string, func: ( ) => void ) {
                let times = 0

                this.printMeasureHeader( )

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
                    process.stdout.write( "•" )
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
                this.clearLine( )

                let row = 1
                const rows =
                    this.#tests.map( test => {
                        const rowText =
                            TextGraphic.ShapeView.initWithText( ( row++ ).toString( ),
                                0, renderer, { })
                                .applyMargin( 0, 2, 0, 2 )
                        const title =
                            TextGraphic.ShapeView.initWithText( test.title,
                                0, renderer, { })
                                .applyMargin( 0, 2, 0, 2 )
                        const time =
                            TextGraphic.ShapeView.initWithText( Math.floor( test.averageTime ).toString( ) + " ms",
                                0, renderer, { })
                                .applyMargin( 0, 2, 0, 2 )
                        return [ rowText, title, time ]
                    })


                const table =
                    TextGraphic.Layouts.createShapeViewTableInTextForm(
                        rows, renderer, {
                            horizontalAligns: [
                                TextGraphic.HorizontalAlign.Left,
                                TextGraphic.HorizontalAlign.Left,
                                TextGraphic.HorizontalAlign.Right,
                            ]
                        }
                    )

                const runsTextTitle =
                    TextGraphic.ShapeView.initWithText( ` ${ this.#runs } runs/measure `, 0, renderer, { })
                const runsText =
                    runsTextTitle.frame( TextGraphic.Presets.LightBox )

                const canvas =
                    new TextGraphic.CanvasView( table.width, table.height + 2, renderer )

                canvas.add( runsText, 0, 0, 0 )
                canvas.add( table, 0, 2, 0 )
                canvas.fineTuneBoxIntersections( )

                const finalView =
                    canvas.applyMargin( 0, 0, 1, 2 )

                console.log( finalView.styledForm )
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────

