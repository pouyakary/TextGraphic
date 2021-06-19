
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "../spaced-box/main"
    import { StringBox, ScreenMatrixPixel }
        from "../../protocols/string-box"
    import { VirtualScreen }
        from "../virtual-screen"
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
        child:  StringBox
    }

//
// ─── DRAW PANE ──────────────────────────────────────────────────────────────────
//

    export class LayeredPane implements StringBox {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly    height:                 number
            readonly    width:                  number
            readonly    background:             SpacedBox
            readonly    screen:                 VirtualScreen
            readonly    #children:               PaneChildrenProfile[ ]
                        transparent:            boolean
                        #baseline:              number
                        #terminalStyling:       ANSITerminalStyling
                        #terminalStartTag:      string

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
                                                         height: number ): LayeredPane {
                const background =
                    SpacedBox.initBlankRectangle( width, height )
                const pane =
                    new LayeredPane( background )
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
                    throw `Could not move the baseline to ${ place }. (box height of ${ this.height })`
                }
            }

        //
        // ─── ADD CHILD ───────────────────────────────────────────────────
        //

            public add ( child: StringBox, x: number, y: number, zIndex: number ) {
                this.#children.push({ x, y, zIndex, child })
                this.updateScreenMatrix( )
                return this
            }

        //
        // ─── TERMINAL STYLE ──────────────────────────────────────────────
        //

            public setANSITerminalStyle ( options: ANSITerminalSetStyleOptions ): StringBox {
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
        // ─── UPDATE MATRIX ───────────────────────────────────────────────
        //

            private updateScreenMatrix ( ) {
                for ( let x = 0; x < this.width; x++ ) {
                    for ( let y = 0; y < this.height; y++ ) {
                        this.screen.write( x, y,
                            this.rayTrace( 0, 0, x, y )
                        )
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
