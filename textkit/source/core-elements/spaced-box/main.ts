
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { StringBox, ScreenMatrixPixel }
        from "../../protocols/string-box"

    import { BoxFrameCharSet }
        from "../../shapes/box-frames"
    import { HorizontalAlign, VerticalAlign }
        from "../../shapes/types"

    import { ANSITerminalStyling, generateStartingANSITerminalEscapeSequenceOfTerminalStyling
           , getDefaultTerminalStyle, ANSITerminalResetEscapeSequence
           , ANSITerminalSetStyleOptions, mergeTerminalStyleWithOptions
           }
        from "../../environments/ansi-terminal"

    import { alignSpacedBoxWithinNewBoxBoundary }
        from "./algorithms/align-in-box"
    import { frameSpacedBox }
        from "./algorithms/frame"
    import { concatSpacedBoxesVertically }
        from "./algorithms/concat-vertically"
    import { concatSpacedBoxesHorizontally }
        from "./algorithms/concat-horizontally"
    import { centerSpacedBoxToBoundaryBox }
        from "./algorithms/center-to-boundary-box"
    import { applyMarginToSpacedBox }
        from "./algorithms/apply-margin"

//
// ─── SPACED BOX ─────────────────────────────────────────────────────────────────
//

    export class SpacedBox implements StringBox {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

                        #baseline:          number
                        #terminalStyling:   ANSITerminalStyling
                        #terminalStartTag:  string
                        transparent:        boolean
            readonly    lines:              Array<string>
            readonly    height:             number
            readonly    width:              number

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //i

            constructor ( lines: string[ ], baseLine: number ) {
                if ( lines instanceof Array ) {
                    for ( const line of lines ) {
                        if ( typeof line !== "string" ) {
                            throw "Elements of the lines array should all be of type string"
                        }
                    }
                } else {
                    throw "SpacedBox should be constructed with an array of strings"
                }

                if ( baseLine < 0 || baseLine >= lines.length ) {
                    throw "Initial SpacedBox baseline is out of boundary"
                }

                this.lines =
                    lines
                this.height =
                    this.lines.length
                this.width =
                    this.lines[ 0 ].length
                this.#baseline =
                    0
                this.#terminalStyling =
                    getDefaultTerminalStyle( )
                this.#terminalStartTag =
                    ""
                this.transparent =
                    false
                this.baseline =
                    baseLine
            }

            static initWithSpaceCheck ( lines: string[ ], baseLine: number ) {
                const unifiedLines =
                    SpacedBox.unifyLineSpaces( lines )
                return new SpacedBox( unifiedLines, baseLine )
            }

            static initWithText ( text: string, baseLine: number ) {
                const lines =
                    text.split( "\n" )
                const unifiedLines =
                    SpacedBox.unifyLineSpaces( lines )
                return new SpacedBox( unifiedLines, baseLine )
            }

            static initWithEmptyBox ( ) {
                return new SpacedBox([ "" ], 0 )
            }

            static initWithEmptySpaceSurface ( width: number, height: number, backgroundChar = " " ) {
                const emptyLine =
                    backgroundChar.repeat( width )
                const lines =
                    new Array<string> ( )
                for ( let i = 0; i < height; i++ ) {
                    lines.push( emptyLine )
                }
                return new SpacedBox( lines, 0 )
            }

        //
        // ─── BASELINE ────────────────────────────────────────────────────
        //

            public get baseline ( ) {
                return this.#baseline
            }

            public set baseline ( input: number ) {
                if ( input < 0 && input >= this.height ) {
                    throw `Baseline is set out of bounds. (Box height: ${ this.height }, given baseline: ${ input })`
                }
                this.#baseline =
                    input
            }

        //
        // ─── SET TERMINAL STYLE ──────────────────────────────────────────
        //

            public setANSITerminalStyle ( options: ANSITerminalSetStyleOptions ): SpacedBox {
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
        // ─── CREATE LINES ────────────────────────────────────────────────
        //

            static unifyLineSpaces ( lines: string[ ] ) {
                const longestLine =
                    SpacedBox.getLongestLineOfArray( lines )
                const perfectLines =
                    lines.map( line =>
                        SpacedBox.perfectLineSize( line, longestLine )
                    )
                return perfectLines
            }

        //
        // ─── TOOLS ───────────────────────────────────────────────────────
        //

            static getLongestLineOfArray ( lines: string[ ] ) {
                return Math.max( ...lines.map( x => x.length ) )
            }

            static perfectLineSize ( line: string, size: number ) {
                return line + SpacedBox.spaceLineOfSize( size - line.length )
            }

            static spaceLineOfSize ( size: number ) {
                return " ".repeat( size )
            }

        //
        // ─── GET PLAIN TEXT ──────────────────────────────────────────────
        //

            public get plainTextForm ( ): string {
                return this.lines.join( "\n" )
            }

        //
        // ─── TERMINAL RENDER ─────────────────────────────────────────────
        //

            public get ANSITerminalForm ( ): string {
                const styledLines =
                    new Array<string> ( this.height )
                for ( let line = 0; line < this.height; line++ ) {
                    styledLines[ line ] =
                        this.renderLineForANSITerminal( line )
                }
                return styledLines.join( "\n" )
            }

            public renderLineForANSITerminal ( line: number ) {
                return (
                    this.#terminalStartTag + this.lines[ line ] +
                    ANSITerminalResetEscapeSequence
                )
            }

        //
        // ─── MARGIN ──────────────────────────────────────────────────────
        //

            public applyMargin ( top: number, right: number,
                                 bottom: number, left: number ): SpacedBox {
                return applyMarginToSpacedBox( this, top, right, bottom, left )
            }

        //
        // ─── CENTER ──────────────────────────────────────────────────────
        //

            public centerToBox ( width: number, height: number ): SpacedBox{
                return centerSpacedBoxToBoundaryBox( this, width, height )
            }

        //
        // ─── CONCAT HORIZONTALLY ─────────────────────────────────────────
        //

            static concatHorizontally ( boxes: SpacedBox[ ], joiner: SpacedBox ): SpacedBox {
                return concatSpacedBoxesHorizontally( boxes, joiner )
            }

        //
        // ─── CONCAT VERTICALLY ───────────────────────────────────────────
        //

            static concatVertically ( boxes: SpacedBox[ ], baseLine: number ): SpacedBox {
                return concatSpacedBoxesVertically( boxes, baseLine )
            }

        //
        // ─── FRAME ───────────────────────────────────────────────────────
        //

            public frame ( charSet: BoxFrameCharSet ) {
                return frameSpacedBox( this, charSet )
            }

        //
        // ─── ALIGN ───────────────────────────────────────────────────────
        //

            public alignInBox ( boxWidth: number,
                               boxHeight: number,
                         horizontalAlign: HorizontalAlign,
                           verticalAlign: VerticalAlign ) {

                return alignSpacedBoxWithinNewBoxBoundary(
                    this, boxWidth, boxHeight, horizontalAlign, verticalAlign
                )
            }

        //
        // ─── RAY TRACER ──────────────────────────────────────────────────
        //

            public rayTrace ( left: number, top: number, x: number, y: number ): ScreenMatrixPixel {
                return [
                    this.#terminalStartTag,
                    this.lines[ y - top ][ x - left ],
                ]
            }

        //
        // ─── GET AT RELATIVE POSITION ────────────────────────────────────
        //

            public getCharAtRelativePosition ( left: number ,
                                                top: number ,
                                                  x: number ,
                                                  y: number ): ScreenMatrixPixel {
                return [
                    this.#terminalStartTag,
                    this.lines[ y - top ][ x - left ],
                ]
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
