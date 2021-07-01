
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ScreenMatrixPixel, ViewProtocol }
        from "../../../protocols/view-protocol"
    import { ShapeView }
        from "./shape-view"

    import { generateStartingANSITerminalEscapeSequenceOfTerminalStyling
           , getDefaultTerminalStyle, ANSITerminalResetEscapeSequence
           , ANSITerminalSetStyleOptions, mergeTerminalStyleWithOptions
           }
        from "../../../environments/ansi-terminal"

    import { includesLineBreak }
        from "../../../tools/string"

    import { applyMarginToMonoStyleView }
        from "../algorithms/apply-margin"
    import { centerMonoStyleViewToBoundaryBox }
        from "../algorithms/center-to-boundary-box"

//
// ─── LINE VIEW ──────────────────────────────────────────────────────────────────
//

    export class LineView implements ViewProtocol {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly    line:               string
            readonly    width:              number
            readonly    height:             number
            readonly    baseline:           number

                        transparent:        boolean

                        #terminalStartTag:  string

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( line: string ) {
                // checks
                if ( typeof line !== "string" ) {
                    throw new Error (
                        `LineView should be constructed with input of type string, but found ${ typeof line }.`
                    )
                }

                if ( includesLineBreak( line ) ) {
                    throw new Error (
                        `Input of LineView should not contain the line break character (\\n).`
                    )
                }

                // constructing
                this.line =
                    line
                this.width =
                    line.length
                this.height =
                    1
                this.baseline =
                    0
                this.transparent =
                    false
                this.#terminalStartTag =
                    ANSITerminalResetEscapeSequence
            }

        //
        // ─── GETTERS ─────────────────────────────────────────────────────
        //

            get lines ( ): string[ ] {
                return [ this.line ]
            }

            get terminalStartTag ( ) {
                return this.#terminalStartTag
            }

        //
        // ─── RENDERS ─────────────────────────────────────────────────────
        //

            get plainTextForm ( ): string {
                return this.line
            }

            get ANSITerminalForm ( ): string {
                return this.terminalStartTag + this.line + ANSITerminalResetEscapeSequence
            }

        //
        // ─── TERMINAL STYLE ──────────────────────────────────────────────
        //

            public setANSITerminalStyle ( options: ANSITerminalSetStyleOptions ): ViewProtocol {
                const style =
                    mergeTerminalStyleWithOptions( getDefaultTerminalStyle( ), options )
                this.#terminalStartTag =
                    generateStartingANSITerminalEscapeSequenceOfTerminalStyling( style )
                return this
            }

        //
        // ─── RAY TRACE ───────────────────────────────────────────────────
        //

            public rayTrace ( left: number,
                               top: number,
                                 x: number,
                                 y: number ): ScreenMatrixPixel {
                //
                return this.getCharAtRelativePosition( left, top, x, y )
            }

        //
        // ─── CHAR AT RELATIVE POSITION ───────────────────────────────────
        //

            public getCharAtRelativePosition ( left: number,
                                                top: number,
                                                  x: number,
                                                  y: number ): ScreenMatrixPixel {
                //
                const destX =
                    x - left
                const destY =
                    y - top
                if ( y === 0 ) {
                    if ( x >= 0 && x < this.width ) {
                        return [ this.#terminalStartTag, this.line[ x ] ]
                    }
                }

                //
                throw Error (
                    `Character resolution failed. Position out of boundary: (X: ${ destX }, Width: ${ this.width }), (Y: ${ destY }, Height: 1).`
                )
            }

        //
        // ─── APPLY MARGIN ────────────────────────────────────────────────
        //

            public cloneWithAppliedMargin ( top: number,
                                          right: number,
                                         bottom: number,
                                           left: number ): ShapeView {
                //
                return applyMarginToMonoStyleView( this, top, right, bottom, left )
            }

        //
        // ─── CENTER TO BOX ───────────────────────────────────────────────
        //


            public cloneWithViewCenteredToBoundary ( width: number,
                                                    height: number ): ShapeView{
                //
                return centerMonoStyleViewToBoundaryBox( this, width, height )
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
