
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//


    import { Subset }
        from "../../../tools/types"
    import { ScreenMatrixPixel, StylableViewProtocol }
        from "../../../protocols/view-protocol"
    import { StyleRendererProtocol }
        from "../../../protocols/style-renderer-protocol"

    import { MonoStyleViews }
        from ".."

    import { BoxFrameCharSet }
        from "../../../presets/box-frames"
    import { HorizontalAlign, VerticalAlign }
        from "../../../protocols/align"

    import { unifyLineSpaces, breakStringIntoLines, includesLineBreak }
        from "../../../tools/string"

    import { alignMonoStyleViewWithinNewBoxBoundary }
        from "../algorithms/align-in-box"
    import { frameMonoStyledViews }
        from "../../../shapes/frame/mono/frame"
    import { concatMonoStyledViewsVertically }
        from "../algorithms/concat-vertically"
    import { concatMonoStyledViewsHorizontally }
        from "../algorithms/concat-horizontally"
    import { centerViewProtocolToBoundaryBox }
        from "../../algorithms/center-to-boundary-box"
    import { applyMarginToMonoStyleView }
        from "../algorithms/apply-margin"

    import { EMPTY_STRING, LINE_BREAK_CHARACTER, WHITE_SPACE_CHARACTER }
        from "../../../constants/characters"

//
// ─── SHAPE VIEW ─────────────────────────────────────────────────────────────────
//

    export class ShapeView <EnvironmentStyleSettings extends Object> implements
        StylableViewProtocol <EnvironmentStyleSettings> {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly    lines:              Array<string>
            readonly    height:             number
            readonly    width:              number
            readonly    styleRenderer:      StyleRendererProtocol<EnvironmentStyleSettings>

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
                  styleRenderer: StyleRendererProtocol<EnvironmentStyleSettings>,
                          style: Subset<EnvironmentStyleSettings>,
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


            static initWithSpaceCheck <StyleSettings extends Object> (
                    lines:          string[ ],
                    baseLine:       number,
                    styler:         StyleRendererProtocol<StyleSettings>,
                    initialStyle:   Subset<StyleSettings>,
                ) {

                //
                const unifiedLines =
                    unifyLineSpaces( lines )
                return new ShapeView( unifiedLines, baseLine, styler, initialStyle, false );
            }


            static initWithText <StyleSettings extends Object> (
                    text:           string,
                    baseLine:       number,
                    styler:         StyleRendererProtocol<StyleSettings>,
                    initialStyle:   Subset<StyleSettings>,
                ): ShapeView<StyleSettings> {

                //
                const lines =
                    breakStringIntoLines( text )
                const unifiedLines =
                    unifyLineSpaces( lines )
                return new ShapeView( unifiedLines, baseLine, styler, initialStyle, false )
            }


            static initEmptyBox <StyleSettings extends Object> (
                    styler: StyleRendererProtocol<StyleSettings>
                ) {

                return new ShapeView( [ EMPTY_STRING ], 0, styler, { }, true )
            }


            static initBlankRectangle <StyleSettings extends Object> (
                    width:          number,
                    height:         number,
                    styler:         StyleRendererProtocol<StyleSettings>,
                    backgroundChar: string = WHITE_SPACE_CHARACTER,
                ) {

                //
                const emptyLine =
                    backgroundChar.repeat( width )
                const lines =
                    new Array<string> ( )
                for ( let i = 0; i < height; i++ ) {
                    lines.push( emptyLine )
                }

                return new ShapeView ( lines, 0, styler, { }, false )
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
                                        changes: Subset<EnvironmentStyleSettings> ) {
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

            set style ( input: Subset<EnvironmentStyleSettings> ) {
                this.applyNewStyle( this.styleRenderer.defaultStyle, input )
            }


            addStyle ( input: Subset<EnvironmentStyleSettings> ) {
                this.applyNewStyle( this.#style, input )
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
                const { rootLeftStylingInfo, rootRowLeftStylingInfo,
                        rootRowRightStylingInfo, rootRightStylingInfo } =
                    this.styleRenderer

                for ( let row = 0; row < this.height; row++ ) {
                    styledLines[ row ] =
                        ( rootRowLeftStylingInfo
                        + this.#leftStylingInfoCache
                        + this.lines[ row ]
                        + this.#rightStylingInfoCache
                        + rootRowRightStylingInfo
                        )
                }

                return  ( rootLeftStylingInfo
                        + styledLines.join( LINE_BREAK_CHARACTER )
                        + rootRightStylingInfo
                        )
            }

        //
        // ─── MARGIN ──────────────────────────────────────────────────────
        //

            public applyMargin ( top: number,
                               right: number,
                              bottom: number,
                                left: number ): ShapeView<EnvironmentStyleSettings> {
                //
                return applyMarginToMonoStyleView( this, top, right, bottom, left )
            }

        //
        // ─── CENTER ──────────────────────────────────────────────────────
        //

            public centerToBoundaryBox ( width: number,
                                        height: number ): ShapeView<EnvironmentStyleSettings> {
                //
                return centerViewProtocolToBoundaryBox( this, width, height ) as ShapeView<EnvironmentStyleSettings>
            }

        //
        // ─── CONCAT HORIZONTALLY ─────────────────────────────────────────
        //

            static concatHorizontally <EnvironmentStyleSettings extends Object> (
                    boxes:  ShapeView<EnvironmentStyleSettings> [ ],
                    joiner: ShapeView<EnvironmentStyleSettings>,
                ): MonoStyleViews<EnvironmentStyleSettings> {

                //
                return concatMonoStyledViewsHorizontally( boxes, joiner )
            }

        //
        // ─── CONCAT VERTICALLY ───────────────────────────────────────────
        //

            static concatVertically <EnvironmentStyleSettings extends Object> (
                    boxes:      ShapeView<EnvironmentStyleSettings>[ ],
                    baseLine:   number,
                ): ShapeView<EnvironmentStyleSettings> {

                //
                return concatMonoStyledViewsVertically( boxes, baseLine )
            }

        //
        // ─── FRAME ───────────────────────────────────────────────────────
        //

            public frame ( charSet: BoxFrameCharSet ): ShapeView<EnvironmentStyleSettings> {
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
