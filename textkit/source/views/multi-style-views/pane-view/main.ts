
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ViewProtocol, ScreenMatrixPixel }
        from "../../../protocols/view-protocol"
    import { VirtualScreen }
        from "./virtual-screen"

    import { getDefaultTerminalStyle, ANSITerminalSetStyleOptions
           , generateStartingANSITerminalEscapeSequenceOfTerminalStyling
           , mergeTerminalStyleWithOptions, ANSITerminalStyling
           }
        from "../../../environments/ansi-terminal"

    import { fineTuneUnicodeBoxForLayeredPane }
        from "./algorithms/fine-tune-unicode-box"
    import { rayTraceScreenPixel }
        from "./algorithms/ray-trace"

    import { applyMarginToMultiStyleView }
        from "../algorithms/apply-margin"

    import { centerViewProtocolToBoundaryBox }
        from "../../algorithms/center-to-boundary-box"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export interface PaneChildrenProfile {
        x:      number
        y:      number
        zIndex: number
        child:  ViewProtocol
    }

//
// ─── DRAW PANE ──────────────────────────────────────────────────────────────────
//

    export class PaneView implements ViewProtocol {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly    height:                 number
            readonly    width:                  number
            readonly    screen:                 VirtualScreen
            readonly    #children:              PaneChildrenProfile[ ]
                        transparent:            boolean
                        #baseline:              number
                        #terminalStyling:       ANSITerminalStyling
                        #terminalStartTag:      string

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( width: number, height: number) {
                this.height =
                    height
                this.width =
                    width
                this.screen =
                    new VirtualScreen( this.width, this.height )
                this.transparent =
                    false
                this.#baseline =
                    0
                this.#terminalStyling =
                    getDefaultTerminalStyle( )
                this.#terminalStartTag =
                    ""
                this.#children =
                    [ ]
            }

        //
        // ─── CHILDREN ────────────────────────────────────────────────────
        //

            public * getChildren ( ): Generator<PaneChildrenProfile, null> {
                for ( const child of this.#children ) {
                    yield child
                }
                return null
            }

        //
        // ─── BASELINE ────────────────────────────────────────────────────
        //

            public get baseline ( ): number {
                return this.#baseline
            }

            public set baseline ( x: number ) {
                if ( x >= 0 && x < this.height ) {
                    this.#baseline = x
                }
                throw new Error(
                    `Baseline was set out of boundary (given ${ x }, height: ${ this.height })`
                )
            }

        //
        // ─── ADD CHILD ───────────────────────────────────────────────────
        //

            public add ( child: ViewProtocol, x: number, y: number, zIndex: number ) {
                this.#children.push({ x, y, zIndex, child })
                this.updatePortionOfScreenMatrix( x, y, child.width, child.height )
                return this
            }

        //
        // ─── TERMINAL STYLE ──────────────────────────────────────────────
        //

            public setANSITerminalStyle ( options: ANSITerminalSetStyleOptions ): ViewProtocol {
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

            public rayTrace ( left: number,
                               top: number,
                                 x: number,
                                 y: number ): ScreenMatrixPixel {
                return rayTraceScreenPixel( this, left, top, x, y )
            }

        //
        // ─── UPDATE PORTION OF SCREEN MATRIX ─────────────────────────────
        //

            private updatePortionOfScreenMatrix (  left: number,
                                                    top: number,
                                                  width: number,
                                                 height: number ) {
                //
                for ( let x = left; x < width + left; x++ ) {
                    for ( let y = top; y < height + top; y++ ) {
                        if ( x >= 0 && x < this.width && y >= 0 && y < this.height ) {
                            this.screen.write( x, y,
                                this.rayTrace( 0, 0, x, y )
                            )
                        }
                    }
                }
            }

        //
        // ─── PLAIN TEXT FORM ─────────────────────────────────────────────
        //

            public get plainTextForm ( ): string {
                return this.screen.plainTextForm
            }

        //
        // ─── TERMINAL FOR ────────────────────────────────────────────────
        //

            public get ANSITerminalForm ( ): string {
                return this.screen.ANSITerminalForm
            }

        //
        // ─── GET CHAR AT RELATIVE POSITION ───────────────────────────────
        //

            public getCharAtRelativePosition( left: number ,
                                               top: number ,
                                                 x: number ,
                                                 y: number ): ScreenMatrixPixel {
                return this.screen.read( x - left, y - top )
            }

        //
        // ─── COMBINE BOXES ───────────────────────────────────────────────
        //

            public fineTuneUnicodeBoxes ( ) {
                fineTuneUnicodeBoxForLayeredPane( this )
            }

        //
        // ─── APPLY MARGIN ────────────────────────────────────────────────
        //

            public applyMargin ( topMargin: number ,
                               rightMargin: number ,
                              bottomMargin: number ,
                                leftMargin: number ): PaneView {
                //
                return applyMarginToMultiStyleView(
                    this, topMargin, rightMargin, bottomMargin, leftMargin
                )
            }

        //
        // ─── CENTER TO BOX ───────────────────────────────────────────────
        //

            public centerToBoundaryBox ( width: number,
                                        height: number ): PaneView {
                //
                return centerViewProtocolToBoundaryBox( this, width, height ) as PaneView
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
