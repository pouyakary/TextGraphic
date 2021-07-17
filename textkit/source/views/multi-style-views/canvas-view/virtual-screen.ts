
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//


    import { ScreenMatrixPixel, StyleRendererProtocol, PortableStyle }
        from "../../../protocols"
    import { EMPTY_STRING, LINE_BREAK_CHARACTER, WHITE_SPACE_CHARACTER }
        from "../../../constants/characters"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    // char top left bottom right
    export type ScreenMatrixPixelSurroundings =
        string

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const PIXEL_ARRAY_SIZE =
        3
    const PIXEL_LEFT_INFO_OFFSET =
        0
    const PIXEL_CHARACTER_OFFSET =
        1
    const PIXEL_RIGHT_INFO_OFFSET =
        2

//
// ─── SCREEN MATRIX ──────────────────────────────────────────────────────────────
//

    export class VirtualScreen <EnvironmentStyleSettings extends PortableStyle<any>> {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            #matrix:    string[ ]
            #width:     number
            #height:    number

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( width: number, height: number, leftInfo: string ) {
                const matrixSize =
                    width * PIXEL_ARRAY_SIZE * height

                this.#width =
                    width
                this.#height =
                    height
                this.#matrix =
                    new Array<string> ( matrixSize )

                for ( let index = 0; index < matrixSize; index += PIXEL_ARRAY_SIZE ) {
                    this.#matrix[ index + PIXEL_LEFT_INFO_OFFSET ] =
                        leftInfo
                    this.#matrix[ index + PIXEL_CHARACTER_OFFSET ] =
                        WHITE_SPACE_CHARACTER
                    this.#matrix[ index + PIXEL_RIGHT_INFO_OFFSET ] =
                        EMPTY_STRING
                }
            }

        //
        // ─── CHECK BOUNDARY ──────────────────────────────────────────────
        //

            private checkCoordinateBoundary ( x: number, y: number ): void {
                if ( x < 0 || x > this.#width ) {
                    throw new Error(
                        `Virtual Screen - X: ${ x } is out of boundary (0 - ${ this.#width })`
                    )
                }
                if ( y < 0 || y > this.#height ) {
                    throw new Error(
                        `Virtual Screen - Y: ${ y } is out of boundary (0 - ${ this.#height })`
                    )
                }
            }

        //
        // ─── INDEX ───────────────────────────────────────────────────────
        //

            //                     X: 1
            //                     ▲
            //                     │
            //                     │
            //              ┌──┬──┬┼───┬──┬──┬──┐  ▲
            //              │00│01││02 │03│04│05│  │
            //              ├──┼──┼┴───┼──┼──┼──┤  │
            //              │06│07│ 08 │09│10│11│  │ Height: 3
            //     Y: 1 ◀───┼──┼──┤    │  │  │  │  │
            //              ├──┼──┼────┼──┼──┼──┤  │
            //              │12│13│ 14 │15│16│17│  │
            //              └──┴──┴────┴──┴──┴──┘  ▼
            //
            //              ◀───────────────────▶
            //                    Width: 3

            private computeIndex ( x: number, y: number ): number {
                return PIXEL_ARRAY_SIZE * ( y * this.#width + x )
            }

        //
        // ─── SET ─────────────────────────────────────────────────────────
        //

            public write ( x: number, y: number, value: ScreenMatrixPixel ): void {
                this.checkCoordinateBoundary( x, y )

                const index =
                    this.computeIndex( x, y )

                this.#matrix[ index + PIXEL_LEFT_INFO_OFFSET ] =
                    value[ PIXEL_LEFT_INFO_OFFSET ]

                this.#matrix[ index + PIXEL_CHARACTER_OFFSET ] =
                    value[ PIXEL_CHARACTER_OFFSET ]

                this.#matrix[ index + PIXEL_RIGHT_INFO_OFFSET ] =
                    value[ PIXEL_RIGHT_INFO_OFFSET ]
            }


            public writeChar ( x: number, y: number, text: string ): void {
                const index =
                    this.computeIndex( x, y )
                this.#matrix[ index + PIXEL_CHARACTER_OFFSET ] =
                    text
            }

        //
        // ─── GET ─────────────────────────────────────────────────────────
        //

            public read ( x: number, y: number ): ScreenMatrixPixel {
                this.checkCoordinateBoundary( x, y )

                const index =
                    this.computeIndex( x, y )
                const leftStylingInfo =
                    this.#matrix[ index + PIXEL_LEFT_INFO_OFFSET ]
                const char =
                    this.#matrix[ index + PIXEL_CHARACTER_OFFSET ]
                const rightStylingInfo =
                    this.#matrix[ index + PIXEL_RIGHT_INFO_OFFSET ]

                return [ leftStylingInfo, char, rightStylingInfo ]
            }

            public readChar ( x: number, y: number ): string {
                return this.read( x, y )[ PIXEL_CHARACTER_OFFSET ]
            }

        //
        // ─── ITERATE ON ROW ──────────────────────────────────────────────
        //

            public * iterateOnRow ( row: number ): Generator<ScreenMatrixPixel> {
                const startingIndex =
                    this.#width * PIXEL_ARRAY_SIZE * row
                const endingIndex =
                    this.#width * PIXEL_ARRAY_SIZE * ( row + 1 )

                for ( let i = startingIndex; i < endingIndex; i += PIXEL_ARRAY_SIZE ) {
                    yield this.#matrix.slice( i, i + 3 ) as ScreenMatrixPixel
                }
            }

        //
        // ─── GET TERMINAL ROW ────────────────────────────────────────────
        //

            public getWholeStyledRow (
                    row:    number,
                    styler: StyleRendererProtocol<EnvironmentStyleSettings>
                ): string {

                //
                const EMPTY_STYLE =
                    styler.renderLeftStylingInfo( styler.defaultStyle )
                let line =
                    EMPTY_STRING
                let previousLeftInfo =
                    EMPTY_STYLE
                const closingTagStack =
                    new Array<string> ( )

                function closeWithRightInfoIfPresent ( ) {
                    const previousRightInfo =
                        closingTagStack.pop( )
                    if ( previousRightInfo ) {
                        line += previousRightInfo
                    }
                }

                function checkAndAddNewLeftInfo ( leftStylingInfo: string ,
                                                 rightStylingInfo: string ) {
                    if ( leftStylingInfo !== previousLeftInfo ) {
                        closeWithRightInfoIfPresent( )
                        if ( leftStylingInfo !== EMPTY_STYLE ) {
                            closingTagStack.push( rightStylingInfo )
                            line += leftStylingInfo
                        }
                        previousLeftInfo = leftStylingInfo
                    }
                }


                for ( const [ leftStylingInfo, character, rightStylingInfo ] of this.iterateOnRow( row ) ) {
                    checkAndAddNewLeftInfo( leftStylingInfo, rightStylingInfo )
                    line += styler.encodeCharacterForStyledRender( character )
                }

                closeWithRightInfoIfPresent( )

                return line
            }

        //
        // ─── GET ROW IN PLAIN TEXT ───────────────────────────────────────
        //

            public getWholePlainTextRow ( row: number ): string {
                let line =
                    EMPTY_STRING
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

            public renderPlainTextForm ( ): string {
                const lines =
                    new Array<string>( this.#height )
                for ( let row = 0; row < this.#height; row++ ) {
                    lines[ row ] =
                        this.getWholePlainTextRow( row )
                }
                return lines.join( LINE_BREAK_CHARACTER )
            }

        //
        // ─── TERMINAL FORM ───────────────────────────────────────────────
        //

            public renderStyledForm ( styler: StyleRendererProtocol<EnvironmentStyleSettings> ): string {
                const lines =
                    new Array<string> ( this.#height )

                for ( let row = 0; row < this.#height; row++ ) {
                    lines[ row ] =
                        this.getWholeStyledRow( row, styler )
                }

                return styler.wrapRootLinesAndFinalizeRender(
                    this.#width, lines
                )
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
