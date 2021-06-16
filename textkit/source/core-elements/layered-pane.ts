
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "./spaced-box"
    import { StringBox, ScreenMatrixPixel }
        from "../protocols/string-box"
    import { VirtualScreen }
        from "./virtual-screen"
    import { getDefaultTerminalStyle, ANSITerminalSetStyleOptions
           , generateStartingANSITerminalEscapeSequenceOfTerminalStyling
           , mergeTerminalStyleWithOptions, ANSITerminalStyling
           }
        from "../environments/ansi-terminal"
    import { fineTuneUnicodeBoxCharWithSurroundings
           , CHANGEABLE_CHARACTERS_FOR_UNICODE_TUNNING
           }
        from "../tools/fine-tune-unicode-box"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    interface PaneChildrenProfile {
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
                        transparent:            boolean
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
                                if ( profile.child.transparent ) {
                                    const [ ___, character ] =
                                        profile.child.getCharAtRelativePosition(
                                            profile.x, profile.y, x, y
                                        )
                                    if ( character !== " " ) {
                                        result = profile
                                    }
                                } else {
                                    result = profile
                                }
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

            private getRestOfSurroundingsForFineTunnigUnicodeBoxes ( x: number, y: number ): string {
                let surroundings =
                    ""
                surroundings +=
                    ( y > 0 ? this.screen.readChar( x, y - 1 ) : "*" )
                surroundings +=
                    ( x < this.width - 1 ? this.screen.readChar( x + 1, y ) : "*" )
                surroundings +=
                    ( y < this.height - 1 ? this.screen.readChar( x, y + 1 ) : "*" )
                surroundings +=
                    ( x > 0 ? this.screen.readChar( x - 1, y ) : "*" )

                return surroundings
            }

            public fineTuneUnicodeBoxes ( ) {
                const { width, height } =
                    this
                for ( let y = 0; y < height; y++ ) {
                    for ( let x = 0; x < width; x++ ) {
                        let char =
                            this.screen.readChar( x, y )
                        if ( CHANGEABLE_CHARACTERS_FOR_UNICODE_TUNNING.includes( char ) ) {
                            const surroundings =
                                this.getRestOfSurroundingsForFineTunnigUnicodeBoxes( x, y )
                            const newChar =
                                fineTuneUnicodeBoxCharWithSurroundings( char, surroundings )
                            this.screen.writeChar( x, y, newChar )
                        }
                    }
                }
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
