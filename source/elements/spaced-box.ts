
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { insertJoinersInBetweenArrayItems }
        from "../helpers/array"
    import { BoxFrameCharSet }
        from "../shapes/box-frames"
    import { ANSITerminalStyling, generateStartingANSITerminalEscapeSequenceOfTerminalStyling
           , getDefaultTerminalStyle, ANSITerminalResetEscapeSequence
           , ANSITerminalSetStyleOptions, mergeTerminalStyleWithOptions
           }
        from "../environments/ansi-terminal"
    import { HorizontalAlign, VerticalAlign }
        from "../shapes/types"
    import { DrawableBox }
        from "./drawable-box"
    import { RenderEnvironment }
        from "../environments/types"
    import { v4 }
        from "uuid"

//
// ─── SPACED BOX ─────────────────────────────────────────────────────────────────
//

    export class SpacedBox implements DrawableBox {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            private                 _baseline:          number
            private                 _terminalStyling:   ANSITerminalStyling
            private                 _terminalStartTag:  string
            public      readonly    uuid:               string
            public      readonly    lines:              Array<string>
            public      readonly    height:             number
            public      readonly    width:              number

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //i

            constructor ( lines: string[ ], baseLine: number ) {
                this.uuid =
                    v4( )
                this.lines =
                    lines
                this.height =
                    this.lines.length
                this.width =
                    this.lines[ 0 ].length
                this._baseline =
                    0
                this._terminalStyling =
                    getDefaultTerminalStyle( )
                this._terminalStartTag =
                    ""
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

            static initEmptyBox ( ) {
                return new SpacedBox([ "" ], 0 )
            }

            static initEmptySpaceSurface ( width: number, height: number ) {
                const emptyLine =
                    " ".repeat( width )
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
                return this._baseline
            }

            public set baseline ( input: number ) {
                if ( input < 0 && input >= this.height ) {
                    throw `Baseline is set out of bounds. (Box height: ${ this.height }, given baseline: ${ input })`
                }
                this._baseline =
                    input
            }

        //
        // ─── SET TERMINAL STYLE ──────────────────────────────────────────
        //

            public setANSITerminalStyle ( options: ANSITerminalSetStyleOptions ) {
                this._terminalStyling =
                    mergeTerminalStyleWithOptions( this._terminalStyling, options )

                this._terminalStartTag =
                    generateStartingANSITerminalEscapeSequenceOfTerminalStyling(
                        this._terminalStyling
                    )
            }

            public get terminalStartTag ( ): string {
                return this._terminalStartTag
            }

        //
        // ─── GET CHARACTER ───────────────────────────────────────────────
        //

            public getCharAtRelativePosition( left: number ,
                                               top: number ,
                                                 x: number ,
                                                 y: number ): string {

                return this.lines[ y - top ][ x - left ]
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
        // ─── RENDER ──────────────────────────────────────────────────────
        //

            public renderFor ( environment: RenderEnvironment ): string {
                switch ( environment ) {
                    case RenderEnvironment.PlainText:
                        return this.plainTextForm
                    case RenderEnvironment.ANSITerminal:
                        return this.ANSITerminalForm
                }
            }

            public renderLineFor ( line: number, environment: RenderEnvironment ): string {
                switch ( environment ) {
                    case RenderEnvironment.PlainText:
                        return this.lines[ line ]
                    case RenderEnvironment.ANSITerminal:
                        return this.renderLineForANSITerminal( line )
                }
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
                    new Array<string> ( )
                for ( let line = 0; line < this.height; line++ ) {
                    styledLines.push( this.renderLineForANSITerminal( line ) )
                }
                return styledLines.join("\n")
            }

            public renderLineForANSITerminal ( line: number ) {
                return (
                    this._terminalStartTag + this.lines[ line ] +
                    ANSITerminalResetEscapeSequence
                )
            }

        //
        // ─── MARGIN ──────────────────────────────────────────────────────
        //

            public applyMargin ( top: number, right: number,
                                 bottom: number, left: number ): SpacedBox {
                //
                const topBottomSpaceLines =
                    SpacedBox.spaceLineOfSize( left + this.width + right )
                const leftSpaceLines =
                    SpacedBox.spaceLineOfSize( left )
                const rightSpaceLines =
                    SpacedBox.spaceLineOfSize( right )
                const lines =
                    new Array<string> ( )

                // top
                for ( let counter = 0; counter < top; counter++ ) {
                    lines.push( topBottomSpaceLines )
                }

                // middle
                for ( const line of this.lines ) {
                    lines.push( leftSpaceLines + line + rightSpaceLines )
                }

                // bottom
                for ( let counter = 0; counter < bottom; counter++ ) {
                    lines.push( topBottomSpaceLines )
                }

                //
                return new SpacedBox( lines, this.baseline + top )
            }

        //
        // ─── CENTER ──────────────────────────────────────────────────────
        //

            public centerToBox ( width: number, height: number ) {
                const top =
                    Math.floor( height - this.height / 2 )
                const right =
                    Math.floor( width - this.width / 2 )
                const bottom =
                    height - ( top + this.height )
                const left =
                    width - ( right + this.width )

                const box =
                    this.applyMargin( top, right, bottom, left )

                return box
            }

        //
        // ─── CONCAT HORIZONTALLY ─────────────────────────────────────────
        //

            static concatHorizontally ( boxes: SpacedBox[ ], joiner: SpacedBox ): SpacedBox {
                if ( boxes.length === 0 ) {
                    return SpacedBox.initEmptyBox( )
                }
                if ( boxes.length === 1 ) {
                    return boxes[ 0 ]
                }

                // getting the desired box size
                let newBaseline = 0
                let heightBelowNewBaseline = 0
                for ( const box of boxes ) {
                    if ( box.baseline > newBaseline ) {
                        newBaseline =
                            box.baseline
                    }
                    if ( ( box.height - 1 - box.baseline ) > heightBelowNewBaseline ) {
                        heightBelowNewBaseline =
                            box.height - 1 - box.baseline
                    }
                }

                const newHeight =
                    newBaseline + heightBelowNewBaseline + 1

                // boxesWithPadding
                const boxesWithJoiner =
                    insertJoinersInBetweenArrayItems( boxes, joiner )

                // boxesWithPaddings
                const boxesWithAppropriatePaddings =
                    boxesWithJoiner.map( box => {
                        const topPadding =
                            newBaseline - box.baseline
                        const bottomPadding =
                            newHeight - box.height - topPadding
                        return box.applyMargin(
                            topPadding, 0, bottomPadding, 0
                        )
                    })

                // join
                const newLines =
                    new Array<string> ( )
                const rows =
                    boxesWithAppropriatePaddings[ 0 ].lines.length
                const columns =
                    boxesWithAppropriatePaddings.length

                for ( let row = 0; row < rows; row++ ) {
                    const lineColumns =
                        new Array<string> ( )
                    for ( let column = 0; column < columns; column++ ) {
                        lineColumns.push( boxesWithAppropriatePaddings[ column ].lines[ row ] )
                    }
                    newLines.push( lineColumns.join( "" ) )
                }

                // the new space box
                return new SpacedBox( newLines, newBaseline )
            }

        //
        // ─── CONCAT VERTICALLY ───────────────────────────────────────────
        //

            static concatVertically ( boxes: SpacedBox[ ], baseLine: number ) {
                const resultWidth =
                    Math.max( ...boxes.map( box => box.width ) )
                const lines =
                    new Array<string> ( )

                for ( const box of boxes ) {
                    const centeredBox =
                        box.centerToBox( resultWidth, box.height )
                    for ( const line of centeredBox.lines ) {
                        lines.push( line )
                    }
                }

                return new SpacedBox( lines, baseLine )
            }

        //
        // ─── FRAME ───────────────────────────────────────────────────────
        //

            public frame ( charSet: BoxFrameCharSet ) {
                const firstLine =
                    charSet.topLeft + charSet.top.repeat( this.width ) + charSet.topRight
                const lastLine =
                    charSet.bottomLeft + charSet.bottom.repeat( this.width ) + charSet.bottomRight
                const middleLines =
                    this.lines.map( line => charSet.left + line + charSet.right )
                const lines: string[ ] =
                    [ firstLine, ...middleLines, lastLine ]
                const result =
                    new SpacedBox( lines, this.baseline + 1 )
                return result
            }

        //
        // ─── ALIGN ───────────────────────────────────────────────────────
        //

            public alignInBox ( boxWidth: number,
                               boxHeight: number,
                         horizontalAlign: HorizontalAlign,
                           verticalAlign: VerticalAlign ) {

                let marginTop = 0, marginRight = 0, marginLeft = 0, marginBottom = 0

                const horizontalEmptySpace =
                    boxWidth - this.width
                const verticalEmptySpace =
                    boxHeight - this.height


                switch ( horizontalAlign ) {
                    case HorizontalAlign.Left:
                        marginRight =
                            horizontalEmptySpace
                        break;
                    case HorizontalAlign.Center:
                        marginLeft =
                            Math.floor( horizontalEmptySpace / 2 )
                        marginRight =
                            horizontalEmptySpace - marginLeft
                        break;
                    case HorizontalAlign.Right:
                        marginLeft =
                            horizontalEmptySpace
                        break;
                }


                switch ( verticalAlign ) {
                    case VerticalAlign.Top:
                        marginBottom =
                            verticalEmptySpace
                        break;
                    case VerticalAlign.Center:
                        marginTop =
                            Math.floor( verticalEmptySpace / 2 )
                        marginBottom =
                            verticalEmptySpace - marginTop
                        break;
                    case VerticalAlign.Bottom:
                        marginTop =
                            verticalEmptySpace
                        break;
                }


                const marginedBox =
                    this.applyMargin( marginTop, marginRight, marginBottom, marginLeft )
                marginedBox.baseline = 0


                return marginedBox
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
