
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { StyleRendererProtocol, ScreenMatrixPixel, StylableViewProtocol, PortableStyle, PortableColor }
        from "../../../../protocols"

    import { ShapeView }
        from "../shape-view"

    import { includesLineBreak, replaceCharacters }
        from "../../../../tools/string"

    import { applyMarginToMonoStyleView }
        from "../../algorithms/apply-margin"
    import { centerViewProtocolToBoundaryBox }
        from "../../../algorithms/center-to-boundary-box"
    import { frameMonoStyledViews }
        from "../../../../shapes/frame/mono/frame"
    import { BoxFrameCharSet }
        from "../../../../presets/box-frames"

//
// ─── LINE VIEW ──────────────────────────────────────────────────────────────────
//

    export class LineView <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> implements
        StylableViewProtocol <ColorType, EnvironmentStyleSettings> {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly    line:               string
            readonly    width:              number
            readonly    height:             number
            readonly    baseline:           number

            readonly    styleRenderer:      StyleRendererProtocol<ColorType, EnvironmentStyleSettings>

                        transparent:        boolean

                        #style:                 EnvironmentStyleSettings
                        #leftStylingInfoCache:  string
                        #rightStylingInfoCache: string

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( line: string,
                 styleRenderer: StyleRendererProtocol<ColorType, EnvironmentStyleSettings>,
                         style: Partial<EnvironmentStyleSettings> ) {

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
                    true

                this.styleRenderer =
                    styleRenderer
                this.#style =
                    styleRenderer.margeNewStyleOptionsWithPreviosuStyleState(
                        styleRenderer.defaultStyle, style
                    )
                this.#leftStylingInfoCache =
                    styleRenderer.renderLeftStylingInfo( this.#style )
                this.#rightStylingInfoCache =
                    styleRenderer.renderRightStylingInfo( this.#style )
            }

        //
        // ─── GETTERS ─────────────────────────────────────────────────────
        //

            get lines ( ): string[ ] {
                return [ this.line ]
            }

        //
        // ─── STYLE ───────────────────────────────────────────────────────
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
        // ─── RENDERS ─────────────────────────────────────────────────────
        //

            get plainTextForm ( ): string {
                return this.line
            }

            get styledForm ( ): string {
                const encodedLine =
                    replaceCharacters(
                        this.line, this.styleRenderer.encodeCharacterForStyledRender
                    )

                const lines = [
                    this.#leftStylingInfoCache + encodedLine + this.#rightStylingInfoCache
                ]

                return this.styleRenderer.wrapRootLinesAndFinalizeRender (
                    this.width, lines
                )
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

                if ( destY === 0 ) {
                    if ( destX >= 0 && destX < this.width ) {
                        return [
                            this.#leftStylingInfoCache,
                            this.line[ destX ],
                            this.#rightStylingInfoCache
                        ]
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

            public applyMargin ( top: number,
                               right: number,
                              bottom: number,
                                left: number ): ShapeView<ColorType, EnvironmentStyleSettings> {
                //
                return applyMarginToMonoStyleView( this, top, right, bottom, left )
            }

        //
        // ─── CENTER TO BOX ───────────────────────────────────────────────
        //


            public centerToBoundaryBox (
                    width:  number,
                    height: number,
                ): ShapeView<ColorType, EnvironmentStyleSettings> {
                //
                return centerViewProtocolToBoundaryBox( this, width, height ) as ShapeView<ColorType, EnvironmentStyleSettings>
            }

        //
        // ─── FRAME ───────────────────────────────────────────────────────
        //

            public frame ( charSet: BoxFrameCharSet ): ShapeView<ColorType, EnvironmentStyleSettings> {
                return frameMonoStyledViews( this, charSet )
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
