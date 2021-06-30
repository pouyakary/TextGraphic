
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "../mono-styled-views/shape-view/main"
    import { ViewProtocol, ScreenMatrixPixel }
        from "../../protocols/view-protocol"
    import { VirtualScreen }
        from "./virtual-screen"
    import { getDefaultTerminalStyle, ANSITerminalSetStyleOptions
           , generateStartingANSITerminalEscapeSequenceOfTerminalStyling
           , mergeTerminalStyleWithOptions, ANSITerminalStyling
           }
        from "../../environments/ansi-terminal"
    import { fineTuneUnicodeBoxForLayeredPane }
        from "./algorithms/fine-tune-unicode-box"
    import { rayTraceScreenPixel }
        from "./algorithms/ray-trace"

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
            readonly    background:             ShapeView
            readonly    screen:                 VirtualScreen
            readonly    #children:               PaneChildrenProfile[ ]
                        transparent:            boolean
                        #baseline:              number
                        #terminalStyling:       ANSITerminalStyling
                        #terminalStartTag:      string

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( background: ShapeView ) {
                this.height =
                    background.height
                this.width =
                    background.width
                this.background =
                    background
                this.screen =
                    new VirtualScreen( this.width, this.height )
                this.transparent =
                    false
                this.#baseline =
                    background.baseline
                this.#terminalStyling =
                    getDefaultTerminalStyle( )
                this.#terminalStartTag =
                    ""
                this.#children =
                    [ ]
            }


            public static initWithTransparentBackground ( width: number,
                                                         height: number ): PaneView {
                const background =
                    ShapeView.initBlankRectangle( width, height )
                const pane =
                    new PaneView( background )
                pane.transparent =
                    true
                return pane
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
                return this.baseline
            }

            public moveBaselineTo ( place: number ) {
                if ( place >= 0 && place < this.height ) {
                    this.#baseline = place
                } else {
                    throw new Error(
                        `Could not move the baseline to ${ place }. (box height of ${ this.height })`
                    )
                }
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

            public rayTrace ( left: number, top: number, x: number, y: number ): ScreenMatrixPixel {
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

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
