
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

    import { ShapeView }
        from "../.."

    import { BoxFrameCharSet }
        from "../../../../presets/box-frames"
    import { HorizontalAlign, VerticalAlign }
        from "../../../../protocols/align"

    import { alignMonoStyleViewWithinNewBoxBoundary }
        from "../../algorithms/align-in-box"
    import { renderStyledFormForMultiLineMonoStyleViews }
        from "../../algorithms/render-styled-form"
    import { frameMonoStyledViews }
        from "../../../../shapes/frame/mono/frame"
    import { centerViewProtocolToBoundaryBox }
        from "../../../algorithms/center-to-boundary-box"
    import { applyMarginToMonoStyleView }
        from "../../algorithms/apply-margin"

    import { LINE_BREAK_CHARACTER, WHITE_SPACE_CHARACTER, BLOCK_CHARACTER }
        from "../../../../constants/characters"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export type GraphFormula =
        ( x: number, y: number, width: number, height: number ) => boolean

    export interface GraphSettings <ColorType, EnvironmentStyleSettings extends PortableStyle<ColorType>> {
        renderer:           StyleRendererProtocol<EnvironmentStyleSettings>,
        width:              number
        height:             number
        formula:            GraphFormula
        originX?:           number
        originY?:           number
        verticalZoom?:      number
        horizontalZoom?:    number
        style?:             Partial<EnvironmentStyleSettings>
        character?:         string
        transparent?:       boolean
    }

    type FixatedSettings <ColorType, EnvironmentStyleSettings extends PortableStyle<ColorType>> =
        Required<GraphSettings<ColorType, EnvironmentStyleSettings>>

//
// ─── THE GRAPH VIEW ─────────────────────────────────────────────────────────────
//

    export class GraphView <ColorType, EnvironmentStyleSettings extends PortableStyle<ColorType>>
        implements StylableViewProtocol <EnvironmentStyleSettings> {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

                        #pixelMatrix:               string[ ]
                        #style:                     EnvironmentStyleSettings
                        #leftStylingInfoCache:      string
                        #rightStylingInfoCache:     string
            readonly    #verticalZoom:              number
            readonly    #horizontalZoom:            number
            readonly    #formula:                   GraphFormula
            readonly    #originX:                   number
            readonly    #originY:                   number
            readonly    #character:                 string
            readonly    width:                      number
            readonly    height:                     number
            readonly    baseline:                   number
            readonly    styleRenderer:              StyleRendererProtocol<EnvironmentStyleSettings>
                        transparent:                boolean

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( settings: GraphSettings<ColorType, EnvironmentStyleSettings> ) {
                const   { width, height, renderer, transparent, style, verticalZoom
                        , horizontalZoom, formula, originX, originY, character
                        } =
                    checkAndCompleteGraphSettings( settings )

                this.#pixelMatrix =
                    new Array<string> ( width * height )

                this.width =
                    width
                this.height =
                    height
                this.baseline =
                    Math.floor( height / 2 )

                this.#formula =
                    formula
                this.#verticalZoom =
                    verticalZoom
                this.#horizontalZoom =
                    horizontalZoom
                this.#originX =
                    originX
                this.#originY =
                    originY

                this.#character =
                    character

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
                const { width: viewPortWidth, height: viewPortHeight } =
                    this
                const graphWidth =
                    2 / this.#horizontalZoom
                const graphHeight =
                    2 / this.#verticalZoom
                const deltaOriginX =
                    graphWidth / 2 - this.#originX
                const deltaOriginY =
                    graphHeight / 2 - this.#originY

                for ( let row = 0; row < viewPortHeight; row++ ) {
                    const y =
                        ( ( ( viewPortHeight - row ) / viewPortHeight ) * graphHeight ) - deltaOriginY

                    for ( let column = 0; column < viewPortWidth; column++ ) {
                        const x =
                            ( column / viewPortWidth ) * graphWidth - deltaOriginX
                        const pixelOffset =
                            row * this.width + column

                        this.#pixelMatrix[ pixelOffset ] =
                            ( this.#formula( x, y, graphWidth, graphHeight )
                                ? this.#character
                                : WHITE_SPACE_CHARACTER
                                )
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
                return renderStyledFormForMultiLineMonoStyleViews(
                    this, this.getRow, this.#leftStylingInfoCache, this.#rightStylingInfoCache
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
// ─── FIXATE STYLE ───────────────────────────────────────────────────────────────
//

    function checkAndCompleteGraphSettings <ColorType, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
            settings:   GraphSettings<ColorType, EnvironmentStyleSettings>
        ): FixatedSettings<ColorType, EnvironmentStyleSettings> {
        //
        const   { renderer, width, height, formula, originX, originY
                , verticalZoom, horizontalZoom, style, transparent, character
                } =
            settings

        // zoom
        if ( verticalZoom && verticalZoom <= 0 ) {
            throw new Error(
                `Graph's vertical zoom cannot be zero or less than zero. (found ${verticalZoom})`
            )
        }

        if ( horizontalZoom && horizontalZoom <= 0 ) {
            throw new Error(
                `Graph's horizontal zoom cannot be zero or less than zero. (found ${horizontalZoom})`
            )
        }

        // character
        let drawingCharacter =
            BLOCK_CHARACTER
        if ( character ) {
            if ( character.length === 1 ) {
                drawingCharacter = character
            } else {
                throw new Error (
                    `Graph's character should be a single character not "${character}".`
                )
            }
        }


        // done
        return { renderer, width, height, formula,
            character:      drawingCharacter,
            originX:        originX         ? originX           : 0,
            originY:        originY         ? originY           : 0,
            verticalZoom:   verticalZoom    ? verticalZoom      : 1,
            horizontalZoom: horizontalZoom  ? horizontalZoom    : 1,
            style:          style           ? style             : { },
            transparent:    transparent     ? transparent       : true,
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
