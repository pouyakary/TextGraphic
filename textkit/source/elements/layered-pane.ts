
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "./spaced-box"
    import { DrawableBox, ScreenMatrixPixel }
        from "./drawable-box"
    import { ANSITerminalResetEscapeSequence, ANSITerminalStyling
           , getDefaultTerminalStyle, ANSITerminalSetStyleOptions
           , generateStartingANSITerminalEscapeSequenceOfTerminalStyling
           , mergeTerminalStyleWithOptions
           }
        from "../environments/ansi-terminal"
    import { fineTuneUnicodeBoxCharWithSurroundings }
        from "./tools/fine-tune-unicode-box"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    interface PaneChildrenProfile {
        x:      number
        y:      number
        zIndex: number
        child:  DrawableBox
    }

    // char top left bottom right
    export type ScreenMatrixPixelSurroundings =
        string

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const UNICODE_BOX_CHARACTERS =
        "┌┬┐┏┳┓├┼┤┣╋┫└┴┘┗┻┛┍┯┑┎┒┝┿┥┠╂┨┕┷┙┖┸┚╒╤╕╔╦╗╞╪╡╠╬╣╘╧╛╚╩╝╓╥╖╼╾╟╫╢╽╿╙╨╜┮┱┲┭┡┽╀╁┾┩┟╆╈╇╅┧┞╄╉╊╃┦┢┶┹┺┵┪│┃┊┋┆┇─━┈┉┄┅╎╌╏╍║═"

//
// ─── SCREEN MATRIX ──────────────────────────────────────────────────────────────
//

    class ScreenMatrix {

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

//
// ─── DRAW PANE ──────────────────────────────────────────────────────────────────
//

    export class LayeredPane implements DrawableBox {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly    height:                 number
            readonly    width:                  number
            readonly    background:             SpacedBox
                        #matrix:                ScreenMatrix
                        #baseline:              number
                        #terminalStyling:       ANSITerminalStyling
                        #terminalStartTag:      string
                        #children:              PaneChildrenProfile[ ]

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( background: SpacedBox ) {
                this.height =
                    background.height
                this.width =
                    background.width
                this.background =
                    background
                this.#matrix =
                    new ScreenMatrix( this.width, this.height )
                this.#baseline =
                    background.baseline
                this.#terminalStyling =
                    getDefaultTerminalStyle( )
                this.#terminalStartTag =
                    ""
                this.#children =
                    [ ]
            }

        //
        // ─── BASELINE ────────────────────────────────────────────────────
        //

            public get baseline ( ): number {
                return this.baseline
            }

            public moveBaselineTo ( place: number ) {
                if ( place >= 0 && place < this.height ) {
                    this.#baseline = place
                } else {
                    throw `Could not move the baseline to ${ place }. (box height of ${ this.height })`
                }
            }

        //
        // ─── ADD CHILD ───────────────────────────────────────────────────
        //

            public add ( child: DrawableBox, x: number, y: number, zIndex: number ) {
                this.#children.push({ x, y, zIndex, child })
                this.updateScreenMatrix( )
                return this
            }

        //
        // ─── TERMINAL STYLE ──────────────────────────────────────────────
        //

            public setANSITerminalStyle ( options: ANSITerminalSetStyleOptions ): DrawableBox {
                this.#terminalStyling =
                    mergeTerminalStyleWithOptions( this.#terminalStyling, options )

                this.#terminalStartTag =
                    generateStartingANSITerminalEscapeSequenceOfTerminalStyling(
                        this.#terminalStyling
                    )

                return this
            }

            public get terminalStartTag ( ): string {
                return this.#terminalStartTag
            }

        //
        // ─── RAY TRACER ──────────────────────────────────────────────────
        //

            public rayTrace ( left: number, top: number, x: number, y: number ): ScreenMatrixPixel {
                let result: PaneChildrenProfile | null =
                    null
                const xQuery =
                    x - left
                const yQuery =
                    y - top

                for ( const profile of this.#children ) {
                    const horizontalBoundary =
                        ( xQuery >= profile.x ) && ( xQuery < profile.x + profile.child.width )
                    const verticalBoundary =
                        ( yQuery >= profile.y ) && ( yQuery < profile.y + profile.child.height )

                    if ( horizontalBoundary && verticalBoundary ) {
                        if ( result ) {
                            if ( profile.zIndex > result.zIndex ) {
                                result = profile
                            }
                        } else {
                            result = profile
                        }
                    }
                }

                return ( result
                    ?   result.child.getCharAtRelativePosition(
                            result.x, result.y, x, y
                        )
                    :   this.background.getCharAtRelativePosition(
                            0, 0, x, y
                        )
                    )
            }

        //
        // ─── UPDATE MATRIX ───────────────────────────────────────────────
        //

            private updateScreenMatrix ( ) {
                for ( let x = 0; x < this.width; x++ ) {
                    for ( let y = 0; y < this.height; y++ ) {
                        this.#matrix.write( x, y,
                            this.rayTrace( 0, 0, x, y )
                        )
                    }
                }
            }

        //
        // ─── PLAIN TEXT FORM ─────────────────────────────────────────────
        //

            public get plainTextForm ( ): string {
                return this.#matrix.plainTextForm
            }

        //
        // ─── TERMINAL FOR ────────────────────────────────────────────────
        //

            public get ANSITerminalForm ( ): string {
                return this.#matrix.ANSITerminalForm
            }

        //
        // ─── GET CHAR AT RELATIVE POSITION ───────────────────────────────
        //

            public getCharAtRelativePosition( left: number ,
                                               top: number ,
                                                 x: number ,
                                                 y: number ): ScreenMatrixPixel {
                return this.#matrix.read( x - left, y - top )
            }

        //
        // ─── COMBINE BOXES ───────────────────────────────────────────────
        //

            private getRestOfSurroundingsForFineTunnigUnicodeBoxes ( x: number, y: number ): string {
                let surroundings =
                    ""
                surroundings +=
                    ( y > 0 ? this.#matrix.readChar( x, y - 1 ) : "*" )
                surroundings +=
                    ( x < this.width - 1 ? this.#matrix.readChar( x + 1, y ) : "*" )
                surroundings +=
                    ( y < this.height - 1 ? this.#matrix.readChar( x, y + 1 ) : "*" )
                surroundings +=
                    ( x > 0 ? this.#matrix.readChar( x - 1, y ) : "*" )

                return surroundings
            }

            public fineTuneUnicodeBoxes ( ) {
                const { width, height } =
                    this
                for ( let y = 0; y < height; y++ ) {
                    for ( let x = 0; x < width; x++ ) {
                        let char =
                            this.#matrix.readChar( x, y )
                        if ( UNICODE_BOX_CHARACTERS.includes( char ) ) {
                            const surroundings =
                                this.getRestOfSurroundingsForFineTunnigUnicodeBoxes( x, y )
                            const newChar =
                                fineTuneUnicodeBoxCharWithSurroundings( char, surroundings )
                            this.#matrix.writeChar( x, y, newChar )
                        }
                    }
                }
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
