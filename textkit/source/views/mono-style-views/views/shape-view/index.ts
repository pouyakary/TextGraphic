
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ScreenMatrixPixel, StylableViewProtocol, PortableStyle, PortableColor, StyleRendererProtocol }
        from "../../../../protocols"

    import { MonoStyleViews }
        from "../.."

    import { BoxFrameCharSet }
        from "../../../../presets/box-frames"
    import { HorizontalAlign, VerticalAlign }
        from "../../../../protocols/align"
    import { unifyLineSpaces, breakStringIntoLines, includesLineBreak, replaceCharacters }
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
    import * as Easters
        from "../easters"

//
// ─── SHAPE VIEW ─────────────────────────────────────────────────────────────────
//

    export class ShapeView <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> implements
        StylableViewProtocol <ColorType, EnvironmentStyleSettings> {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly    lines:              Array<string>
            readonly    height:             number
            readonly    width:              number
            readonly    styleRenderer:      StyleRendererProtocol<ColorType, EnvironmentStyleSettings>

                        transparent:        boolean

                        #baseline:                  number
                        #style:                     EnvironmentStyleSettings
                        #leftStylingInfoCache:      string
                        #rightStylingInfoCache:     string

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //i

            constructor ( lines: string[ ],
                       baseline: number,
                  styleRenderer: StyleRendererProtocol<ColorType, EnvironmentStyleSettings>,
                          style: Partial<EnvironmentStyleSettings>,
                    transparent: boolean ) {

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
                this.transparent =
                    transparent

                this.styleRenderer =
                    styleRenderer

                // initiating the style
                this.#style =
                    styleRenderer.margeNewStyleOptionsWithPreviosuStyleState(
                        styleRenderer.defaultStyle, style
                    )
                this.#leftStylingInfoCache =
                    styleRenderer.renderLeftStylingInfo( this.#style )
                this.#rightStylingInfoCache =
                    styleRenderer.renderRightStylingInfo( this.#style )
            }


            static initWithSpaceCheck <ColorType extends PortableColor, StyleSettings extends PortableStyle<ColorType>> (
                    lines:          string[ ],
                    baseLine:       number,
                    styler:         StyleRendererProtocol<ColorType, StyleSettings>,
                    initialStyle:   Partial<StyleSettings>,
                ) {

                //
                const unifiedLines =
                    unifyLineSpaces( lines )
                return new ShapeView( unifiedLines, baseLine, styler, initialStyle, true );
            }


            static initWithText <ColorType extends PortableColor, StyleSettings extends PortableStyle<ColorType>> (
                    text:           string,
                    baseLine:       number,
                    styler:         StyleRendererProtocol<ColorType, StyleSettings>,
                    initialStyle:   Partial<StyleSettings>,
                ): ShapeView<ColorType, StyleSettings> {

                //
                const lines =
                    breakStringIntoLines( text )
                const unifiedLines =
                    unifyLineSpaces( lines )
                return new ShapeView( unifiedLines, baseLine, styler, initialStyle, true )
            }


            static initEmptyBox <ColorType extends PortableColor, StyleSettings extends PortableStyle<any>> (
                    styler: StyleRendererProtocol<ColorType, StyleSettings>
                ) {

                return new ShapeView( [ EMPTY_STRING ], 0, styler, { }, true )
            }


            static initBlankRectangle <ColorType extends PortableColor, StyleSettings extends PortableStyle<ColorType>> (
                    width:          number,
                    height:         number,
                    styler:         StyleRendererProtocol<ColorType, StyleSettings>,
                    backgroundChar: string = WHITE_SPACE_CHARACTER,
                ) {

                //
                const backgroundLine =
                    backgroundChar.repeat( width )
                const lines =
                    new Array<string> ( height )
                for ( let i = 0; i < height; i++ ) {
                    lines[ i ] = backgroundLine
                }

                return new ShapeView ( lines, 0, styler, { }, true )
            }


            static initUtahTeapot <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
                    styler: StyleRendererProtocol<ColorType, EnvironmentStyleSettings>,
                    style:  Partial<EnvironmentStyleSettings> = { },
                ) {
                //
                return Easters.createUtahTeapot(styler, style)
            }

            static initArendelleBird <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
                    styler: StyleRendererProtocol<ColorType, EnvironmentStyleSettings>,
                    style:  Partial<EnvironmentStyleSettings> = { },
                ) {
                //
                return Easters.createArendelleBird(styler, style)
            }

            static initArendelleAlien <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
                    styler: StyleRendererProtocol<ColorType, EnvironmentStyleSettings>,
                    style:  Partial<EnvironmentStyleSettings> = { },
                ) {
                //
                return Easters.createArendelleAlien(styler, style)
            }

        //
        // ─── BASELINE ────────────────────────────────────────────────────
        //

            public get baseline ( ) {
                return this.#baseline
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


            addStyle ( input: Partial<EnvironmentStyleSettings> ) {
                this.applyNewStyle( this.#style, input )
                return this
            }

        //
        // ─── GET PLAIN TEXT ──────────────────────────────────────────────
        //

            public get plainTextForm ( ): string {
                return this.lines.join( LINE_BREAK_CHARACTER )
            }

        //
        // ─── TERMINAL RENDER ─────────────────────────────────────────────
        //

            public get styledForm ( ): string {
                const styledLines =
                    new Array<string> ( this.height )
                const { encodeCharacterForStyledRender } =
                    this.styleRenderer
                const leftInfo =
                    this.#leftStylingInfoCache
                const rightInfo =
                    this.#rightStylingInfoCache

                for ( let row = 0; row < this.height; row++ ) {
                    const encodedLine =
                        replaceCharacters( this.lines[ row ], encodeCharacterForStyledRender )
                    styledLines[ row ] =
                        leftInfo + encodedLine + rightInfo
                }

                return this.styleRenderer.wrapRootLinesAndFinalizeRender(
                    this.width, styledLines
                )
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
        // ─── CONCAT HORIZONTALLY ─────────────────────────────────────────
        //

            static concatHorizontally <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
                    boxes:  ShapeView<ColorType, EnvironmentStyleSettings> [ ],
                    joiner: ShapeView<ColorType, EnvironmentStyleSettings>,
                ): MonoStyleViews<ColorType, EnvironmentStyleSettings> {

                //
                return concatMonoStyledViewsHorizontally( boxes, joiner )
            }

        //
        // ─── CONCAT VERTICALLY ───────────────────────────────────────────
        //

            static concatVertically <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
                    boxes:      ShapeView<ColorType, EnvironmentStyleSettings>[ ],
                    baseLine:   number,
                ): ShapeView<ColorType, EnvironmentStyleSettings> {

                //
                return concatMonoStyledViewsVertically( boxes, baseLine )
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

        //
        // ─── GET AT RELATIVE POSITION ────────────────────────────────────
        //

            public getCharAtRelativePosition ( left: number ,
                                                top: number ,
                                                  x: number ,
                                                  y: number ): ScreenMatrixPixel {
                //
                return [
                    this.#leftStylingInfoCache,
                    this.lines[ y - top ][ x - left ],
                    this.#rightStylingInfoCache
                ]
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
