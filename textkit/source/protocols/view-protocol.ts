
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { StyleRendererProtocol }
        from "./style-renderer-protocol"
    import { PortableStyle }
        from "./portable-style"
    import { PortableColor }
        from "./portable-color"

//
// ─── RAY TRACER RESULT ──────────────────────────────────────────────────────────
//

    /**
     * __⚠️ UNSAFE__ &mdash; TextKit implements no runtime checks for this type.
     *
     * ---
     *
     * This Type is defined for the core system renderer to efficiently
     * pass screen information.
     *
     * | Index &nbsp;&nbsp; | Information                            |
     * | :----------------- | :------------------------------------- |
     * | 0                  | Rendering Information before the text  |
     * | 1                  | Character                              |
     * | 2                  | Rendering Information after the text   |
     */
    export type ScreenMatrixPixel =
        [ string, string, string ]

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export interface ViewProtocol<ColorType extends PortableColor, EnvironmentStylingSettings extends PortableStyle<any>,
                                  RenderStyler extends StyleRendererProtocol<ColorType, EnvironmentStylingSettings>> {

        //
        // ─── GEOMETRIC PROPERTIES ────────────────────────────────────────
        //

            /**
             * Specifies the baseline of the text box. The baseline indicates
             * where the DrawableBoxes should be aligned vertically together.
             * The baseline is defined as a line from the top of the box.
             */
            readonly baseline: number

            /**
             * Number of the lines a given DrawableBox has.
             */
            readonly height: number

            /**
             * Character length of a line in the DrawableBox
             */
            readonly width: number

        //
        // ─── STYLING PROPERTIES ──────────────────────────────────────────
        //

            /**
             * The styler that renders styling information for the environment
             */
            readonly styleRenderer: RenderStyler

            /**
             * Shows and sets the transparency of the view.
             */
            transparent: boolean

        //
        // ─── RENDER ACCESSORS ────────────────────────────────────────────
        //

            /**
             * Returns the rendered version of the view with
             * styling information for the environment
             */
            readonly styledForm: string


            /**
             * Returns the plain text render of the view that contains nothing
             * but the characters of the box. No other information is inserted
             * between the characters of the box.
             */
            readonly plainTextForm: string


        //
        // ─── COMMON TOOLS FOR THE RENDERING PROTOCOL ─────────────────────
        //

            /**
             * __⚠️ UNSAFE__ &mdash; TextKit implements no runtime checks for this function.
             *
             * ---
             *
             * Returns a character as a TextKit `ScreenMatrixPixel` with the
             * positions provided by the parent `CanvasView`.
             *
             * @param left Distance from the left in the parent canvas
             * @param top  Distance from the top in the parent canvas
             * @param x    Distance from the left in self
             * @param y    Distance from the top in self
             */
            getCharAtRelativePosition( left: number ,
                                        top: number ,
                                        x: number ,
                                        y: number ): ScreenMatrixPixel


            /**
             *  __⚠️ UNSAFE__ &mdash; TextKit implements no runtime checks for this function.
             *
             *  ---
             *
             *  Ray traces a pixel for the `ParentCanvas`. This function is
             *  a protocol that enables the core renderer of the parent `CanvasView`.
             *
             *  In the leaf views (the ones that have no nesting children) the system
             *  returns the character at the given position and the style associated
             *  with the character. But in the branch views (the ones that do have
             *  nested children), function looks at all the children that might have
             *  a character at the specified position and then the ray tracers picks
             *  the most front children (or if absent the empty background).
             *
             *  The use of this function is for a branches that also include branch
             *  children. Therefore the renderer can ask all the children to ray trace
             *  their children as well.
             *
             *  @param left Distance from the left in the parent canvas
             *  @param top  Distance from the top in the parent canvas
             *  @param x    Distance from the left in self
             *  @param y    Distance from the top in self
             */
            rayTrace ( left: number, top: number, x: number, y: number ): ScreenMatrixPixel

        //
        // ─── COMMON SHAPING TOOLS ────────────────────────────────────────
        //

            /**
             *  Frames the view with marginal space around the view. Like the
             *  CSS, the margin is written clock-wise from top to left.
             */
            applyMargin ( topMargin: number ,
                        rightMargin: number ,
                       bottomMargin: number ,
                         leftMargin: number ): ViewProtocol<ColorType, EnvironmentStylingSettings, RenderStyler>

            /**
             *  Creates a box with size of `width` and `height` and centers
             *  the view inside of it.
             */
            centerToBoundaryBox ( width: number,
                                 height: number ): ViewProtocol<ColorType, EnvironmentStylingSettings, RenderStyler>

        // ─────────────────────────────────────────────────────────────────

    }

//
// ─── STYLABLE VIEW ──────────────────────────────────────────────────────────────
//

    export interface StylableViewProtocol <ColorType extends PortableColor, EnvironmentStylingSettings extends PortableStyle<any>> extends
        ViewProtocol<ColorType, EnvironmentStylingSettings, StyleRendererProtocol<ColorType, EnvironmentStylingSettings>> {

        /**
         *  Accepts a subset of the render styling settings
         *  and replaces it with the previous style of the
         *  object
         */
        set style ( x: Partial<EnvironmentStylingSettings> )

        /**
         *  returns the style of the view
         */
        get style ( ): EnvironmentStylingSettings

        /**
         *  Appends or overrides the previous styles
         *  @param style
         */
        addStyle ( style: Partial<EnvironmentStylingSettings> ):
            ViewProtocol<ColorType, EnvironmentStylingSettings, StyleRendererProtocol<
                ColorType, EnvironmentStylingSettings>>
    }

// ────────────────────────────────────────────────────────────────────────────────
