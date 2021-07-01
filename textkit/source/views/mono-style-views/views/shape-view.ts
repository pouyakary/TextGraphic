
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ViewProtocol, ScreenMatrixPixel }
        from "../../../protocols/view-protocol"

    import { MonoStyleViews }
        from ".."

    import { BoxFrameCharSet }
        from "../../../shapes/presets/box-frames"
    import { HorizontalAlign, VerticalAlign }
        from "../../../shapes/types"

    import { ANSITerminalStyling, generateStartingANSITerminalEscapeSequenceOfTerminalStyling
           , getDefaultTerminalStyle, ANSITerminalResetEscapeSequence
           , ANSITerminalSetStyleOptions, mergeTerminalStyleWithOptions
           }
        from "../../../environments/ansi-terminal"

    import { unifyLineSpaces, breakStringIntoLines, includesLineBreak }
        from "../../../tools/string"

    import { alignMonoStyleViewWithinNewBoxBoundary }
        from "../algorithms/align-in-box"
    import { frameMonoStyledViews }
        from "../../../shapes/frame/mono/frame"
    import { concatMonoStyledViewsVertically }
        from "../algorithms/concat-vertically"
    import { concatMonoStyledViewsHorizontally }
        from "../algorithms/concat-horizontally"
    import { centerMonoStyleViewToBoundaryBox }
        from "../algorithms/center-to-boundary-box"
    import { applyMarginToMonoStyleView }
        from "../algorithms/apply-margin"

//
// ─── SHAPE VIEW ─────────────────────────────────────────────────────────────────
//

    export class ShapeView implements ViewProtocol {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly    lines:              Array<string>
            readonly    height:             number
            readonly    width:              number

                        transparent:        boolean

                        #baseline:          number
                        #terminalStyling:   ANSITerminalStyling
                        #terminalStartTag:  string

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //i

            constructor ( lines: string[ ], baseline: number ) {
                // checking the lines
                if ( lines instanceof Array ) {
                    // for checking the size of the lines
                    let minLineLength =
                        Infinity
                    let maxLineLength =
                        - Infinity

                    for ( const line of lines ) {
                        // checking the type
                        if ( typeof line !== "string" ) {
                            throw new Error(
                                `Elements of the lines array should all be of type string, but found ${ typeof line }.`
                            )
                        }

                        // checking if the lines are really lines
                        if ( includesLineBreak( line ) ) {
                            throw new Error(
                                `Elements of the lines array should not include line breaks.`
                            )
                        }

                        // checking the size of the lines
                        if ( line.length > maxLineLength ) {
                            maxLineLength = line.length
                        }
                        if ( line.length < minLineLength ) {
                            minLineLength = line.length
                        }
                    }
                    if ( minLineLength !== maxLineLength ) {
                        throw new Error(
                            `Lines of the ShapeView are not evenly spaced. (Min line length: ${ minLineLength }, Max line length: ${ maxLineLength })`
                        )
                    }
                } else {
                    throw new Error(
                        "ShapeView should be constructed with an array of strings"
                    )
                }

                // checking the baseline
                if ( typeof baseline !== "number" || baseline < 0 || baseline >= lines.length ) {
                    throw new Error(
                        "Initial ShapeView baseline is out of boundary"
                    )
                }

                // constructing
                this.lines =
                    lines
                this.height =
                    this.lines.length
                this.width =
                    this.lines[ 0 ].length
                this.#baseline =
                    baseline
                this.#terminalStyling =
                    getDefaultTerminalStyle( )
                this.#terminalStartTag =
                    ""
                this.transparent =
                    false
            }


            static initWithSpaceCheck ( lines: string[ ],
                                     baseLine: number ) {
                //
                const unifiedLines =
                    unifyLineSpaces( lines )
                return new ShapeView( unifiedLines, baseLine )
            }


            static initWithText ( text: string, baseLine: number ) {
                const lines =
                    breakStringIntoLines( text )
                const unifiedLines =
                    unifyLineSpaces( lines )
                return new ShapeView( unifiedLines, baseLine )
            }


            static initEmptyBox ( ) {
                return new ShapeView( [ "" ], 0 )
            }


            static initBlankRectangle ( width: number ,
                                       height: number ,
                               backgroundChar: string = " " ) {
                //
                const emptyLine =
                    backgroundChar.repeat( width )
                const lines =
                    new Array<string> ( )
                for ( let i = 0; i < height; i++ ) {
                    lines.push( emptyLine )
                }
                return new ShapeView( lines, 0 )
            }

        //
        // ─── BASELINE ────────────────────────────────────────────────────
        //

            public get baseline ( ) {
                return this.#baseline
            }

        //
        // ─── SET TERMINAL STYLE ──────────────────────────────────────────
        //

            public setANSITerminalStyle ( options: ANSITerminalSetStyleOptions ): ShapeView {
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

            public cloneWithAppliedMargin ( top: number,
                                          right: number,
                                         bottom: number,
                                           left: number ): ShapeView {
                //
                return applyMarginToMonoStyleView( this, top, right, bottom, left )
            }

        //
        // ─── CENTER ──────────────────────────────────────────────────────
        //

            public cloneWithViewCenteredToBoundary ( width: number,
                                                    height: number ): ShapeView{
                return centerMonoStyleViewToBoundaryBox( this, width, height )
            }

        //
        // ─── CONCAT HORIZONTALLY ─────────────────────────────────────────
        //

            static concatHorizontally ( boxes: ShapeView[ ],
                                       joiner: ShapeView ): MonoStyleViews {
                //
                return concatMonoStyledViewsHorizontally( boxes, joiner )
            }

        //
        // ─── CONCAT VERTICALLY ───────────────────────────────────────────
        //

            static concatVertically ( boxes: ShapeView[ ],
                                   baseLine: number ): ShapeView {
                //
                return concatMonoStyledViewsVertically( boxes, baseLine )
            }

        //
        // ─── FRAME ───────────────────────────────────────────────────────
        //

            public frame ( charSet: BoxFrameCharSet ) {
                return frameMonoStyledViews( this, charSet )
            }

        //
        // ─── ALIGN ───────────────────────────────────────────────────────
        //

            public alignInBox ( boxWidth: number,
                               boxHeight: number,
                         horizontalAlign: HorizontalAlign,
                           verticalAlign: VerticalAlign ) {
                //
                return alignMonoStyleViewWithinNewBoxBoundary(
                    this, boxWidth, boxHeight, horizontalAlign, verticalAlign
                )
            }

        //
        // ─── RAY TRACER ──────────────────────────────────────────────────
        //

            public rayTrace ( left: number,
                               top: number,
                                 x: number,
                                 y: number ): ScreenMatrixPixel {
                //
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
                //
                return [
                    this.#terminalStartTag,
                    this.lines[ y - top ][ x - left ],
                ]
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
