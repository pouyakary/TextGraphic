
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ScreenMatrixPixel }
        from "../protocols/string-box"
    import { ANSITerminalResetEscapeSequence }
        from "../environments/ansi-terminal"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    // char top left bottom right
    export type ScreenMatrixPixelSurroundings =
        string

//
// ─── SCREEN MATRIX ──────────────────────────────────────────────────────────────
//

    export class VirtualScreen {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            #matrix:    string[ ]
            #width:     number
            #height:    number

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( width: number, height: number ) {
                const matrixSize =
                    width * 2 * height

                this.#width =
                    width
                this.#height =
                    height
                this.#matrix =
                    new Array<string> ( matrixSize )

                for ( let index = 0; index < matrixSize; index += 2 ) {
                    this.#matrix[ index ] =
                        ""
                    this.#matrix[ index + 1 ] =
                        " "
                }
            }

        //
        // ─── CHECK BOUNDARY ──────────────────────────────────────────────
        //

            private checkCoordinateBoundary ( x: number, y: number ): void {
                if ( x < 0 || x > this.#width ) {
                    throw `X: ${ x } is out of boundary (0 - ${ this.#width })`
                }
                if ( y < 0 || y > this.#height ) {
                    throw `Y: ${ y } is out of boundary (0 - ${ this.#height })`
                }
            }

        //
        // ─── INDEX ───────────────────────────────────────────────────────
        //

            //                 X: 1
            //                 ▲
            //                 │
            //                 │
            //          ┌──┬──┬┼───┬──┬──┬──┐  ▲
            //          │00│01││02 │03│04│05│  │
            //          ├──┼──┼┴───┼──┼──┼──┤  │
            //          │06│07│ 08 │09│10│11│  │ Height: 3
            // Y: 1 ◀───┼──┼──┤    │  │  │  │  │
            //          ├──┼──┼────┼──┼──┼──┤  │
            //          │12│13│ 14 │15│16│17│  │
            //          └──┴──┴────┴──┴──┴──┘  ▼
            //
            //          ◀───────────────────▶
            //                Width: 3

            private computeIndex ( x: number, y: number ): number {
                return 2 * ( y * this.#width + x )
            }

        //
        // ─── SET ─────────────────────────────────────────────────────────
        //

            public write ( x: number, y: number, value: ScreenMatrixPixel ): void {
                this.checkCoordinateBoundary( x, y )

                const index =
                    this.computeIndex( x, y )

                this.#matrix[ index ] =
                    value[ 0 ]  // color
                this.#matrix[ index + 1 ] =
                    value[ 1 ]  // character
            }

            public writeChar ( x: number, y: number, text: string ): void {
                const index =
                    this.computeIndex( x, y )
                this.#matrix[ index + 1 ] =
                    text
            }

        //
        // ─── GET ─────────────────────────────────────────────────────────
        //

            public read ( x: number, y: number ): ScreenMatrixPixel {
                this.checkCoordinateBoundary( x, y )

                const index =
                    this.computeIndex( x, y )
                const color =
                    this.#matrix[ index ]
                const char =
                    this.#matrix[ index + 1 ]

                return [ color, char ]
            }

            public readChar ( x: number, y: number ): string {
                return this.read( x, y )[ 1 ]
            }

            public readColor ( x: number, y: number ): string {
                return this.read( x, y )[ 0 ]
            }

        //
        // ─── GET TERMINAL ROW ────────────────────────────────────────────
        //

            public getWholeANSITerminalRow ( row: number ): string {
                let line =
                    ""
                let previousColor =
                    ""
                const startingIndex =
                    this.#width * 2 * row
                const endingIndex =
                    this.#width * 2 * ( row + 1 )

                for ( let i = startingIndex; i < endingIndex; i += 2 ) {
                    const color =
                        this.#matrix[ i ]
                    const char =
                        this.#matrix[ i + 1 ]
                    if ( previousColor !== color ) {
                        line +=
                            ( color === ""
                                ? ANSITerminalResetEscapeSequence
                                : color
                                )
                        previousColor =
                            color
                    }
                    line +=
                        char
                }

                return line + ANSITerminalResetEscapeSequence
            }

        //
        // ─── GET ROW IN PLAIN TEXT ───────────────────────────────────────
        //

            public getWholePlainTextRow ( row: number ): string {
                let line =
                    ""
                const startingIndex =
                    this.#width * 2 * row
                const endingIndex =
                    this.#width * 2 * ( row + 1 )

                for ( let i = startingIndex; i < endingIndex; i += 2 ) {
                    line += this.#matrix[ i + 1 ]
                }

                return line
            }

        //
        // ─── PLAIN TEXT FORM ─────────────────────────────────────────────
        //

            public get plainTextForm ( ): string {
                const lines =
                    new Array<string>( this.#height )
                for ( let row = 0; row < this.#height; row++ ) {
                    lines[ row ] =
                        this.getWholePlainTextRow( row )
                }
                return lines.join("\n")
            }

        //
        // ─── TERMINAL FORM ───────────────────────────────────────────────
        //

            public get ANSITerminalForm ( ): string {
                const lines =
                    new Array<string>( this.#height )
                for ( let row = 0; row < this.#height; row++ ) {
                    lines[ row ] =
                        this.getWholeANSITerminalRow( row )
                }
                return lines.join("\n")
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
