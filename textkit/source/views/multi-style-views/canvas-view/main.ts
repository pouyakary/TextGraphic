
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ViewProtocol, ScreenMatrixPixel, PortableStyle }
        from "../../../protocols"
    import { VirtualScreen }
        from "./virtual-screen"

    import { fineTuneUnicodeBoxForLayeredCanvas }
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

    export interface CanvasChildrenProfile <EnvironmentStyleSettings extends PortableStyle<any>> {
        x:      number
        y:      number
        zIndex: number
        child:  ViewProtocol<EnvironmentStyleSettings, StyleRendererProtocol<EnvironmentStyleSettings>>
    }

//
// ─── CANVAS VIEW ────────────────────────────────────────────────────────────────
//

    export class CanvasView <EnvironmentStyleSettings extends PortableStyle<any>> implements
        ViewProtocol<EnvironmentStyleSettings, StyleRendererProtocol<EnvironmentStyleSettings>> {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly    height:                 number
            readonly    width:                  number
            readonly    screen:                 VirtualScreen<EnvironmentStyleSettings>
            readonly    styleRenderer:          StyleRendererProtocol<EnvironmentStyleSettings>
            readonly    #children:              CanvasChildrenProfile<EnvironmentStyleSettings> [ ]

                        transparent:            boolean
                        #baseline:              number

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( width: number,
                         height: number,
                  styleRenderer: StyleRendererProtocol<EnvironmentStyleSettings> ) {

                this.height =
                    height
                this.width =
                    width
                const baseStyle =
                    styleRenderer.renderLeftStylingInfo( styleRenderer.defaultStyle )
                this.screen =
                    new VirtualScreen( this.width, this.height, baseStyle )
                this.transparent =
                    true
                this.#baseline =
                    0
                this.#children =
                    [ ]

                this.styleRenderer =
                    styleRenderer
            }

        //
        // ─── INITIATION SHORTCUTS ────────────────────────────────────────
        //

            static initWithBackground <EnvironmentStyleSettings extends PortableStyle<any>> (
                    background: ViewProtocol<EnvironmentStyleSettings, StyleRendererProtocol<EnvironmentStyleSettings>>,
                    styler:     StyleRendererProtocol<EnvironmentStyleSettings>,
                ): CanvasView<EnvironmentStyleSettings> {

                //
                const canvas =
                    new CanvasView(
                        background.width, background.height, styler )
                    .add( background, 0, 0, 0 )

                return canvas
            }

        //
        // ─── CHILDREN ────────────────────────────────────────────────────
        //

            public * getChildren ( ): Generator<CanvasChildrenProfile<EnvironmentStyleSettings>, null> {
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
        // ─── RAY TRACER ──────────────────────────────────────────────────
        //

            public rayTrace ( left: number,
                               top: number,
                                 x: number,
                                 y: number ): ScreenMatrixPixel {
                //
                return rayTraceScreenPixel(
                    this, left, top, x, y,
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
                return this.screen.renderPlainTextForm( )
            }

        //
        // ─── TERMINAL FOR ────────────────────────────────────────────────
        //

            public get styledForm ( ): string {
                return this.screen.renderStyledForm( this.styleRenderer )
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
                fineTuneUnicodeBoxForLayeredCanvas( this )
            }

        //
        // ─── APPLY MARGIN ────────────────────────────────────────────────
        //

            public applyMargin ( topMargin: number ,
                               rightMargin: number ,
                              bottomMargin: number ,
                                leftMargin: number ): CanvasView<EnvironmentStyleSettings> {
                //
                return applyMarginToMultiStyleView(
                    this, topMargin, rightMargin, bottomMargin, leftMargin
                )
            }

        //
        // ─── CENTER TO BOX ───────────────────────────────────────────────
        //

            public centerToBoundaryBox ( width: number,
                                        height: number ): CanvasView<EnvironmentStyleSettings> {
                //
                return centerViewProtocolToBoundaryBox( this, width, height ) as CanvasView<EnvironmentStyleSettings>
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
