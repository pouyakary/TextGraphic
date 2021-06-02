
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "./spaced-box"
    import { DrawableBox }
        from "./drawable-box"
    import { ANSITerminalResetEscapeSequence, ANSITerminalStyling
           , getDefaultTerminalStyle, ANSITerminalSetStyleOptions
           , generateStartingANSITerminalEscapeSequenceOfTerminalStyling
           , mergeTerminalStyleWithOptions
           }
        from "../environments/ansi-terminal"
    import { v4 }
        from "uuid"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    interface PaneChildrenProfile {
        x:      number
        y:      number
        zIndex: number
        child:  DrawableBox
    }

    type GenericLineRendererTagGetter =
        ( child: DrawableBox ) => string

//
// ─── DRAW PANE ──────────────────────────────────────────────────────────────────
//

    export class LayeredPane implements DrawableBox {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            public  readonly    height:                 number
            public  readonly    width:                  number
            public  readonly    lines:                  string[ ]
            public  readonly    uuid:                   string
            private             _cachedPlainTextRender: string[ ]
            private             _terminalStyling:       ANSITerminalStyling
            private             _terminalStartTag:      string
            private             _baseline:              number
            private             children:               PaneChildrenProfile[ ]

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( lines: string[ ], baseline = 0 ) {
                this.uuid =
                    v4( )
                this.height =
                    lines.length
                this.width =
                    lines[ 0 ].length
                this.lines =
                    lines
                this._baseline =
                    baseline
                this._terminalStyling =
                    getDefaultTerminalStyle( )
                this._terminalStartTag =
                    ""
                this._cachedPlainTextRender =
                    lines
                this.children =
                    [ ]
            }

            public static initWithSpacedBox ( background: SpacedBox ): LayeredPane {
                return new LayeredPane( background.lines, background.baseline )
            }

        //
        // ─── BASELINE ────────────────────────────────────────────────────
        //

            public get baseline ( ): number {
                return this.baseline
            }

            public moveBaselineTo ( place: number ) {
                if ( place >= 0 && place < this.height ) {
                    this._baseline = place
                } else {
                    throw `Could not move the baseline to ${ place }. (box height of ${ this.height })`
                }
            }

        //
        // ─── ADD CHILD ───────────────────────────────────────────────────
        //

            public insertChildAt<X> ( child: DrawableBox, x: number, y: number, zIndex: number ) {
                this.children.push({ x, y, zIndex, child })
                this.updatePlainTextCache( )
                return this
            }

        //
        // ─── TERMINAL STYLE ──────────────────────────────────────────────
        //

            public setANSITerminalStyle ( options: ANSITerminalSetStyleOptions ) {
                this._terminalStyling =
                    mergeTerminalStyleWithOptions( this._terminalStyling, options )

                this._terminalStartTag =
                    generateStartingANSITerminalEscapeSequenceOfTerminalStyling(
                        this._terminalStyling
                    )

                return this
            }

            public get terminalStartTag ( ): string {
                return this._terminalStartTag
            }

        //
        // ─── RAY TRACE BOX ───────────────────────────────────────────────
        //

            private rayTraceForChildAt ( x: number, y: number ): false | PaneChildrenProfile {
                let answer: null | PaneChildrenProfile =
                    null
                for ( const childProfile of this.children ) {
                    const leftBoundary =
                        x >= childProfile.x
                    const rightBoundary =
                        x < ( childProfile.x + childProfile.child.width )
                    const topBoundary =
                        y >= childProfile.y
                    const bottomBoundary =
                        y < ( childProfile.y + childProfile.child.height )


                    if ( leftBoundary && rightBoundary && bottomBoundary && topBoundary ) {
                        if ( answer == null || answer.zIndex < childProfile.zIndex ) {
                            answer = childProfile
                        }
                    }
                }

                return answer ? answer : false
            }

        //
        // ─── TERMINAL FORM ───────────────────────────────────────────────
        //

            public get ANSITerminalForm ( ): string {
                const lines =
                    new Array<string> ( )
                for ( let y = 0; y < this.height; y++ ) {
                    lines.push( this.renderLineForANSITerminal( y ) )
                }
                return lines.join("\n")
            }

        //
        // ─── PLAIN TEXT FORM ─────────────────────────────────────────────
        //

            public get plainTextForm ( ): string {
                return this._cachedPlainTextRender.join( "\n" )
            }

            private updatePlainTextCache ( ) {
                const lines =
                    new Array<string> ( )
                for ( let y = 0; y < this.height; y++ ) {
                    lines.push( this.renderLineForPlainText( y ) )
                }
                this._cachedPlainTextRender =
                    lines
            }

        //
        // ─── RENDER LINE FOR PLAIN TEXT ──────────────────────────────────
        //

            private renderLineForPlainText ( line: number ): string {
                return this.renderLineGeneric( line, child => "", child => "", "" )
            }

        //
        // ─── RENDER LINE FOR TERMINAL ────────────────────────────────────
        //

            private renderLineForANSITerminal ( line: number ): string {
                return this.renderLineGeneric( line,
                    child => child.terminalStartTag,
                    child => ANSITerminalResetEscapeSequence,
                    ANSITerminalResetEscapeSequence
                )
            }

        //
        // ─── RENDER ONE LINE ─────────────────────────────────────────────
        //

            private renderLineGeneric ( y: number,
                           startTagGetter: GenericLineRendererTagGetter,
                             endTagGetter: GenericLineRendererTagGetter,
                                 resetTag: string ): string {
                let constructedLine =
                    "" + this._terminalStartTag
                const backgroundLine =
                    this.lines[ y ]
                let currentChildId: string | null =
                    null
                let previousCharWasBackground =
                    true

                for ( let x = 0; x < this.width; x++ ) {
                    const source =
                        this.rayTraceForChildAt( x, y )

                    if ( source ) {
                        if ( source.child.uuid !== currentChildId ) {
                            currentChildId =
                                source.child.uuid
                            const startTag =
                                startTagGetter( source.child )
                            constructedLine +=
                                endTagGetter( source.child ) + startTag
                        }

                        constructedLine +=
                            source.child.getCharAtRelativePosition( source.x, source.y, x, y )

                        previousCharWasBackground =
                            false
                    }

                    else {
                        const reset =
                            previousCharWasBackground ? "" : resetTag
                        constructedLine +=
                            reset + backgroundLine[ x ]
                        previousCharWasBackground =
                            true
                    }
                }

                constructedLine += resetTag

                return constructedLine
            }

        //
        // ─── GET RELATIVE POSITION ───────────────────────────────────────
        //

            public getCharAtRelativePosition( left: number ,
                                               top: number ,
                                                 x: number ,
                                                 y: number ): string {

                return this._cachedPlainTextRender[ y - top ][ x - left ]
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
