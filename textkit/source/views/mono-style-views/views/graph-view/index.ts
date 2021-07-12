
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ScreenMatrixPixel, StylableViewProtocol, PortableStyle, StyleRendererProtocol }
        from "../../../../protocols"

    import { MonoStyleViews, ShapeView }
        from "../.."

    import { BoxFrameCharSet }
        from "../../../../presets/box-frames"
    import { HorizontalAlign, VerticalAlign }
        from "../../../../protocols/align"

    import { unifyLineSpaces, breakStringIntoLines, includesLineBreak }
        from "../../../../tools/string"

    import { alignMonoStyleViewWithinNewBoxBoundary }
        from "../../algorithms/align-in-box"
    import { frameMonoStyledViews }
        from "../../../../shapes/frame/mono/frame"
    import { concatMonoStyledViewsVertically }
        from "../../algorithms/concat-vertically"
    import { concatMonoStyledViewsHorizontally }
        from "../../algorithms/concat-horizontally"
    import { centerViewProtocolToBoundaryBox }
        from "../../../algorithms/center-to-boundary-box"
    import { applyMarginToMonoStyleView }
        from "../../algorithms/apply-margin"

    import { EMPTY_STRING, LINE_BREAK_CHARACTER, WHITE_SPACE_CHARACTER }
        from "../../../../constants/characters"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export type GraphFormula =
        ( x: number, y: number, width: number, height: number ) => boolean

    export interface GraphSettings <ColorType, EnvironmentStyleSettings extends PortableStyle<ColorType>> {
        renderer:       StyleRendererProtocol<EnvironmentStyleSettings>,
        width:          number
        height:         number
        formula:        GraphFormula
        originX?:       number
        originY?:       number
        scale?:         number
        style?:         Partial<EnvironmentStyleSettings>
        transparent?:   boolean
    }

    type FixatedSettings <ColorType, EnvironmentStyleSettings extends PortableStyle<ColorType>> =
        Required<GraphSettings<ColorType, EnvironmentStyleSettings>>

    type Point =
        [ number, number ]

//
// ─── THE GRAPH VIEW ─────────────────────────────────────────────────────────────
//

    export class GraphView <ColorType, EnvironmentStyleSettings extends PortableStyle<ColorType>> { // implements StylableViewProtocol <EnvironmentStyleSettings> {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

                        #pixelMatrix:               string[ ]
                        #style:                     EnvironmentStyleSettings
                        #leftStylingInfoCache:      string
                        #rightStylingInfoCache:     string
            readonly    #scale:                     number
            readonly    #formula:                   GraphFormula
            readonly    #originX:                   number
            readonly    #originY:                   number
            readonly    width:                      number
            readonly    height:                     number
            readonly    baseline:                   number
            readonly    styleRenderer:              StyleRendererProtocol<EnvironmentStyleSettings>
                        transparent:                boolean

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( settings: GraphSettings<ColorType, EnvironmentStyleSettings> ) {
                const { width, height, renderer, transparent, style, scale, formula, originX, originY } =
                    fixSettings( settings )

                this.#pixelMatrix =
                    initScreenMatrix( width, height )

                this.width =
                    width
                this.height =
                    height
                this.baseline =
                    Math.floor( height / 2 )

                this.#formula =
                    formula
                this.#scale =
                    scale
                this.#originX =
                    originX
                this.#originY =
                    originY

                this.styleRenderer =
                    renderer
                this.transparent =
                    transparent
                this.#style =
                    renderer.margeNewStyleOptionsWithPreviosuStyleState(
                        renderer.defaultStyle, style
                    )
                this.#leftStylingInfoCache =
                    renderer.renderLeftStylingInfo( this.#style )
                this.#rightStylingInfoCache =
                    renderer.renderRightStylingInfo( this.#style )

                this.renderGraph( )
            }

        //
        // ─── RENDER THE GRAPH ────────────────────────────────────────────
        //

            private renderGraph ( ) {
                const { width, height } =
                    this
                const formula =
                    this.#formula
                const graphWidth =
                    width * this.#scale
                const graphHeight =
                    height * this.#scale

                for ( let row = 0; row < height; row++ ) {
                    const y =
                        ( height - row - this.#originY ) * this.#scale

                    for ( let column = 0; column < width; column++ ) {
                        const x =
                            ( column - this.#originX ) * this.#scale
                        const acceptable =
                            formula( x, y, graphWidth, graphHeight )
                        if ( acceptable ) {
                            this.writePixelAt( column, row, "*" )
                        }
                    }
                }
            }

        //
        // ─── COMPATIBILITY ───────────────────────────────────────────────
        //

            public get lines ( ): string[ ] {
                const result =
                    new Array<string> ( this.height )
                for ( let y = 0; y < this.height; y++ ) {
                    result[ y ] = this.getRow( y )
                }
                return result
            }


            private getRow ( y: number ) {
                let line =
                    new Array<string> ( this.width )
                const destY =
                    y * this.width
                for ( let x = 0; x < this.width; x++ ) {
                    line[ x ] =
                        this.#pixelMatrix[ destY + x ]
                }
                return line.join("")
            }

        //
        // ─── STYLER ──────────────────────────────────────────────────────
        //

            private applyNewStyle ( sourceStyle: EnvironmentStyleSettings,
                changes: Partial<EnvironmentStyleSettings> ) {
                //
                this.#style =
                    this.styleRenderer.margeNewStyleOptionsWithPreviosuStyleState(
                        sourceStyle, changes
                    )
                this.#leftStylingInfoCache =
                    this.styleRenderer.renderLeftStylingInfo( this.#style )
                this.#rightStylingInfoCache =
                    this.styleRenderer.renderRightStylingInfo( this.#style )
            }


            get style ( ): EnvironmentStyleSettings {
                return this.#style
            }

            set style ( input: Partial<EnvironmentStyleSettings> ) {
                this.applyNewStyle( this.styleRenderer.defaultStyle, input )
            }


            public addStyle ( input: Partial<EnvironmentStyleSettings> ) {
                this.applyNewStyle( this.#style, input )
                return this
            }

        //
        // ─── RENDERS ─────────────────────────────────────────────────────
        //

            get styledForm ( ): string {
                const styledLines =
                    new Array<string> ( this.height )
                const { rootLeftStylingInfo, rootRowLeftStylingInfo,
                        rootRowRightStylingInfo, rootRightStylingInfo } =
                    this.styleRenderer

                for ( let row = 0; row < this.height; row++ ) {
                    const encodedLine =
                        this.getRow( row )
                            .replace( /./g,
                                this.styleRenderer.encodeCharacterForStyledRender
                            )
                    styledLines[ row ] =
                        ( rootRowLeftStylingInfo
                        + this.#leftStylingInfoCache
                        + encodedLine
                        + this.#rightStylingInfoCache
                        + rootRowRightStylingInfo
                        )
                }

                return  ( rootLeftStylingInfo
                        + styledLines.join( LINE_BREAK_CHARACTER )
                        + rootRightStylingInfo
                        )
            }

            get plainTextForm ( ): string {
                return this.lines.join( LINE_BREAK_CHARACTER )
            }

        //
        // ─── LOCATE CHARACTER ────────────────────────────────────────────
        //

            private getPixelAt ( x: number, y: number ): string {
                return this.#pixelMatrix[ y * this.width + x ]
            }

            private writePixelAt ( x: number, y: number, char: string ): void {
                this.#pixelMatrix[ y * this.width + x ] =
                    char
            }

        //
        // ─── RAY TRACING SUITE ───────────────────────────────────────────
        //

            public getCharAtRelativePosition( left: number,
                                              top: number,
                                              x: number,
                                              y: number ): ScreenMatrixPixel {
                //
                return [
                    this.#leftStylingInfoCache,
                    this.getPixelAt( x - left, y - top ),
                    this.#rightStylingInfoCache,
                ]
            }


        //
        // ─── MARGIN ──────────────────────────────────────────────────────
        //

            public applyMargin ( top: number,
                               right: number,
                              bottom: number,
                                left: number ): ShapeView<ColorType, EnvironmentStyleSettings> {
                //
                return applyMarginToMonoStyleView( this, top, right, bottom, left )
            }

        //
        // ─── CENTER ──────────────────────────────────────────────────────
        //

            public centerToBoundaryBox ( width: number,
                                        height: number ): ShapeView<ColorType, EnvironmentStyleSettings> {
                //
                return centerViewProtocolToBoundaryBox( this, width, height ) as ShapeView<ColorType, EnvironmentStyleSettings>
            }

        //
        // ─── FRAME ───────────────────────────────────────────────────────
        //

            public frame ( charSet: BoxFrameCharSet ): ShapeView<ColorType, EnvironmentStyleSettings> {
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
                return this.getCharAtRelativePosition( left, top, x, y )
            }

        // ─────────────────────────────────────────────────────────────────

    }

//
// ─── INIT ARRAY ─────────────────────────────────────────────────────────────────
//

    function initScreenMatrix ( width: number, height: number ) {
        const size =
            width * height
        const matrix =
            new Array<string> ( size )
        for ( let i = 0; i < size; i++ ) {
            matrix[ i ] = WHITE_SPACE_CHARACTER
        }
        return matrix
    }

//
// ─── FIXATE STYLE ───────────────────────────────────────────────────────────────
//

    function fixSettings <ColorType, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
            settings:   GraphSettings<ColorType, EnvironmentStyleSettings>
        ): FixatedSettings<ColorType, EnvironmentStyleSettings> {
        //
        const { renderer, width, height, formula, originX, originY, scale, style, transparent } =
            settings

        return { renderer, width, height, formula,
            originX:        originX     ? originX       : Math.floor( width / 2 ),
            originY:        originY     ? originY       : Math.floor( height / 2 ),
            scale:          scale       ? scale         : 1 ,
            style:          style       ? style         : {},
            transparent:    transparent ? transparent   : true,
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
