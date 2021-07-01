
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { Subset }
        from "../../../tools/types"
    import { ScreenMatrixPixel, ViewProtocol }
        from "../../../protocols/view-protocol"
    import { StyleRendererProtocol }
        from "../../../protocols/style-renderer-protocol"

    import { ShapeView }
        from "./shape-view"

    import { includesLineBreak }
        from "../../../tools/string"

    import { applyMarginToMonoStyleView }
        from "../algorithms/apply-margin"
    import { centerViewProtocolToBoundaryBox }
        from "../../algorithms/center-to-boundary-box"

//
// ─── LINE VIEW ──────────────────────────────────────────────────────────────────
//

    export class LineView <EnvironmentStyleSettings extends Object> implements
        ViewProtocol<EnvironmentStyleSettings, StyleRendererProtocol<EnvironmentStyleSettings>> {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly    line:               string
            readonly    width:              number
            readonly    height:             number
            readonly    baseline:           number

            readonly    styleRenderer:      StyleRendererProtocol<EnvironmentStyleSettings>

                        transparent:        boolean

                        #style:                 EnvironmentStyleSettings
                        #leftStylingInfoCache:  string
                        #rightStylingInfoCache: string

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( line: string,
                 styleRenderer: StyleRendererProtocol<EnvironmentStyleSettings>,
                         style: Subset<EnvironmentStyleSettings> ) {

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
                    false

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


            addStyle (  input: Subset<EnvironmentStyleSettings> ) {
                this.applyNewStyle( this.#style, input )
            }

        //
        // ─── RENDERS ─────────────────────────────────────────────────────
        //

            get plainTextForm ( ): string {
                return this.line
            }

            get styledForm ( ): string {
                return this.#leftStylingInfoCache + this.line + this.#rightStylingInfoCache
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
                if ( y === 0 ) {
                    if ( x >= 0 && x < this.width ) {
                        return [
                            this.#leftStylingInfoCache,
                            this.line[ x ],
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
                                left: number ): ShapeView<EnvironmentStyleSettings> {
                //
                return applyMarginToMonoStyleView( this, top, right, bottom, left )
            }

        //
        // ─── CENTER TO BOX ───────────────────────────────────────────────
        //


            public centerToBoundaryBox ( width: number,
                                        height: number ): ShapeView<EnvironmentStyleSettings> {
                //
                return centerViewProtocolToBoundaryBox( this, width, height ) as ShapeView<EnvironmentStyleSettings>
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
