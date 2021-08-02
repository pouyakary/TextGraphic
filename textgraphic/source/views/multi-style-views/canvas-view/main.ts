
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ViewProtocol, ScreenMatrixPixel, PortableStyle, PortableColor }
        from "../../../protocols"
    import { VirtualScreen }
        from "./virtual-screen"

    import { fineTuneUnicodeBoxForLayeredCanvas,
             fineTuneUnicodeBoxForLayeredCanvasAtPoint }
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

    export interface CanvasChildrenProfile <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> {
        x:      number
        y:      number
        zIndex: number
        child:  ViewProtocol<ColorType, EnvironmentStyleSettings, StyleRendererProtocol<ColorType, EnvironmentStyleSettings>>
    }

//
// ─── CANVAS VIEW ────────────────────────────────────────────────────────────────
//

    export class CanvasView <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>>
        implements ViewProtocol<ColorType, EnvironmentStyleSettings, StyleRendererProtocol<ColorType, EnvironmentStyleSettings>> {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly    height:                 number
            readonly    width:                  number
            readonly    screen:                 VirtualScreen<ColorType, EnvironmentStyleSettings>
            readonly    styleRenderer:          StyleRendererProtocol<ColorType, EnvironmentStyleSettings>
            readonly    #children:              CanvasChildrenProfile<ColorType, EnvironmentStyleSettings> [ ]

                        transparent:            boolean
                        #baseline:              number

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( width: number,
                         height: number,
                  styleRenderer: StyleRendererProtocol<ColorType, EnvironmentStyleSettings> ) {

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

            static initWithBackground <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
                    background: ViewProtocol<ColorType, EnvironmentStyleSettings, StyleRendererProtocol<ColorType, EnvironmentStyleSettings>>,
                    styler:     StyleRendererProtocol<ColorType, EnvironmentStyleSettings>,
                ): CanvasView<ColorType, EnvironmentStyleSettings> {

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

            public * getChildren ( ): Generator<CanvasChildrenProfile<ColorType, EnvironmentStyleSettings>, null> {
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

            public add ( child: ViewProtocol<ColorType, EnvironmentStyleSettings, StyleRendererProtocol<ColorType, EnvironmentStyleSettings>>,
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

            public fineTuneBoxIntersections ( ): CanvasView<ColorType, EnvironmentStyleSettings> {
                fineTuneUnicodeBoxForLayeredCanvas(
                    this,
                    0, 0, this.width, this.height
                )
                return this
            }


            public fineTuneBoxIntersectionsAtPoint (
                x: number,
                y: number,
            ): CanvasView<ColorType, EnvironmentStyleSettings> {
                //
                if ( x < 0 || x >= this.width ) {
                    throw new Error(
                        `X should be in bounds [0 - ${this.width - 1}] but found: ${x}.`
                    )
                }

                if ( y < 0 || y >= this.height ) {
                    throw new Error(
                        `Y should be in bounds [0 - ${this.height - 1}] but found: ${y}.`
                    )
                }

                fineTuneUnicodeBoxForLayeredCanvasAtPoint(
                    this, x, y
                )

                return this
            }


            public fineTuneBoxIntersectionsInSelectedArea (
                startX: number,
                startY: number,
                endX:   number,
                endY:   number,
            ): CanvasView<ColorType, EnvironmentStyleSettings> {
                //
                if ( startX < 0 || startX >= this.width ) {
                    throw new Error(
                        `Area's Starting X point should be in bounds [0 - ${this.width - 1}] but found: ${startX}.`
                    )
                }

                if ( startY < 0 || startY >= this.height ) {
                    throw new Error(
                        `Area's Starting Y point should be in bounds [0 - ${this.height - 1}] but found: ${startY}.`
                    )
                }

                if ( endX < 0 || endX >= this.width ) {
                    throw new Error(
                        `Area's Ending X point should be in bounds [0 - ${this.width - 1}] but found: ${endX}.`
                    )
                }

                if ( endY < 0 || endY >= this.height ) {
                    throw new Error(
                        `Area's Ending Y point should be in bounds [0 - ${this.height - 1}] but found: ${endY}.`
                    )
                }

                //
                fineTuneUnicodeBoxForLayeredCanvas(
                    this, startX, startY, endX, endY
                )

                return this
            }


        // ─── APPLY MARGIN ────────────────────────────────────────────────
        //

            public applyMargin ( topMargin: number ,
                               rightMargin: number ,
                              bottomMargin: number ,
                                leftMargin: number ): CanvasView<ColorType, EnvironmentStyleSettings> {
                //
                return applyMarginToMultiStyleView(
                    this, topMargin, rightMargin, bottomMargin, leftMargin
                )
            }

        //
        // ─── CENTER TO BOX ───────────────────────────────────────────────
        //

            public centerToBoundaryBox ( width: number,
                                        height: number ): CanvasView<ColorType, EnvironmentStyleSettings> {
                //
                return centerViewProtocolToBoundaryBox( this, width, height ) as CanvasView<ColorType, EnvironmentStyleSettings>
            }


        //
        // ─── CROP VIEW ───────────────────────────────────────────────────
        //

            public createCrop ( x: number, y: number, width: number, height: number ) {
                const cropView =
                    new CanvasView( width, height, this.styleRenderer )
                cropView.add( this, -x, -y, 0 )
                return cropView
            }

        //
        // ─── SLICE HORIZONTALLY ──────────────────────────────────────────
        //

            public sliceHorizontally ( x: number ): [ CanvasView<ColorType, EnvironmentStyleSettings>,
                                                      CanvasView<ColorType, EnvironmentStyleSettings> ] {
                //
                const leftSlice =
                    this.createCrop( 0, 0, x, this.height )
                const rightSlice =
                    this.createCrop( x, 0, this.width - x, this.height )
                return [ leftSlice, rightSlice ]
            }

        //
        // ─── SLICE VERTICALLY ────────────────────────────────────────────
        //

            public sliceVertically ( y: number ): [ CanvasView<ColorType, EnvironmentStyleSettings>,
                                                    CanvasView<ColorType, EnvironmentStyleSettings> ] {
                //
                const topSlice =
                    this.createCrop( 0, 0, this.width, y )
                const bottomSlice =
                    this.createCrop( 0, y, this.width, this.height - y )
                return [ topSlice, bottomSlice ]
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
