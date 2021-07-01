
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { Subset }
        from "../../../tools/types"
    import { ViewProtocol, ScreenMatrixPixel }
        from "../../../protocols/view-protocol"
    import { VirtualScreen }
        from "./virtual-screen"

    import { fineTuneUnicodeBoxForLayeredPane }
        from "./algorithms/fine-tune-unicode-box"
    import { rayTraceScreenPixel }
        from "./algorithms/ray-trace"

    import { applyMarginToMultiStyleView }
        from "../algorithms/apply-margin"

    import { centerViewProtocolToBoundaryBox }
        from "../../algorithms/center-to-boundary-box"
    import { StyleRendererProtocol }
        from "../../../protocols/style-renderer-protocol"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export interface PaneChildrenProfile <EnvironmentStyleSettings extends Object> {
        x:      number
        y:      number
        zIndex: number
        child:  ViewProtocol<EnvironmentStyleSettings, StyleRendererProtocol<EnvironmentStyleSettings>>
    }

//
// ─── DRAW PANE ──────────────────────────────────────────────────────────────────
//

    export class PaneView <EnvironmentStyleSettings extends Object> implements
        ViewProtocol<EnvironmentStyleSettings, StyleRendererProtocol<EnvironmentStyleSettings>> {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly    height:                 number
            readonly    width:                  number
            readonly    screen:                 VirtualScreen
            readonly    styleRenderer:          StyleRendererProtocol<EnvironmentStyleSettings>
            readonly    #children:              PaneChildrenProfile<EnvironmentStyleSettings> [ ]

                        transparent:                boolean
                        #baseline:                  number
                        #style:                     EnvironmentStyleSettings
                        #leftStylingInfoCache:      string
                        #rightStylingInfoCache:     string

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( width: number,
                         height: number,
                  styleRenderer: StyleRendererProtocol<EnvironmentStyleSettings>,
                          style: Subset<EnvironmentStyleSettings> ) {

                this.height =
                    height
                this.width =
                    width
                this.screen =
                    new VirtualScreen( this.width, this.height )
                this.transparent =
                    false
                this.#baseline =
                    0
                this.#children =
                    [ ]

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
        // ─── INITIATION SHORTCUTS ────────────────────────────────────────
        //

            static initWithBackground <EnvironmentStyleSettings extends Object> (
                    background: ViewProtocol<EnvironmentStyleSettings, StyleRendererProtocol<EnvironmentStyleSettings>>,
                    styler:     StyleRendererProtocol<EnvironmentStyleSettings>,
                ): PaneView<EnvironmentStyleSettings> {

                //
                const pane =
                    new PaneView(
                        background.width, background.height, styler, { } )
                    .add( background, 0, 0, 0 )

                return pane
            }

        //
        // ─── CHILDREN ────────────────────────────────────────────────────
        //

            public * getChildren ( ): Generator<PaneChildrenProfile<EnvironmentStyleSettings>, null> {
                for ( const child of this.#children ) {
                    yield child
                }
                return null
            }

        //
        // ─── BASELINE ────────────────────────────────────────────────────
        //

            public get baseline ( ): number {
                return this.#baseline
            }

            public set baseline ( x: number ) {
                if ( x >= 0 && x < this.height ) {
                    this.#baseline = x
                }
                throw new Error(
                    `Baseline was set out of boundary (given ${ x }, height: ${ this.height })`
                )
            }

        //
        // ─── ADD CHILD ───────────────────────────────────────────────────
        //

            public add ( child: ViewProtocol<EnvironmentStyleSettings, StyleRendererProtocol<EnvironmentStyleSettings>>,
                             x: number,
                             y: number,
                        zIndex: number ) {
                //
                this.#children.push({
                    x, y, zIndex, child
                })
                this.updatePortionOfScreenMatrix(
                    x, y, child.width, child.height
                )
                return this
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
        // ─── RAY TRACER ──────────────────────────────────────────────────
        //

            public rayTrace ( left: number,
                               top: number,
                                 x: number,
                                 y: number ): ScreenMatrixPixel {
                //
                return rayTraceScreenPixel(
                    this, left, top, x, y,
                    this.#leftStylingInfoCache,
                    this.#rightStylingInfoCache
                )
            }

        //
        // ─── UPDATE PORTION OF SCREEN MATRIX ─────────────────────────────
        //

            private updatePortionOfScreenMatrix (  left: number,
                                                    top: number,
                                                  width: number,
                                                 height: number ) {
                //
                for ( let x = left; x < width + left; x++ ) {
                    for ( let y = top; y < height + top; y++ ) {
                        if ( x >= 0 && x < this.width && y >= 0 && y < this.height ) {
                            this.screen.write( x, y,
                                this.rayTrace( 0, 0, x, y )
                            )
                        }
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

            public get styledForm ( ): string {
                return this.screen.styledForm
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

        //
        // ─── APPLY MARGIN ────────────────────────────────────────────────
        //

            public applyMargin ( topMargin: number ,
                               rightMargin: number ,
                              bottomMargin: number ,
                                leftMargin: number ): PaneView<EnvironmentStyleSettings> {
                //
                return applyMarginToMultiStyleView(
                    this, topMargin, rightMargin, bottomMargin, leftMargin
                )
            }

        //
        // ─── CENTER TO BOX ───────────────────────────────────────────────
        //

            public centerToBoundaryBox ( width: number,
                                        height: number ): PaneView<EnvironmentStyleSettings> {
                //
                return centerViewProtocolToBoundaryBox( this, width, height ) as PaneView<EnvironmentStyleSettings>
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
