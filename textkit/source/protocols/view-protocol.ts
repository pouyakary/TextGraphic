
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ANSITerminalSetStyleOptions }
        from "../environments/ansi-terminal"

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
     * | Index &nbsp;&nbsp; | Information                       |
     * | :----------------- | :-------------------------------- |
     * | 0                  | ANSI Terminal Color Starting Tag  |
     * | 1                  | Character                         |
     */
    export type ScreenMatrixPixel =
        [ string, string ]

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export interface ViewProtocol {

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
             * Shows and sets the transparency of the view.
             */
            transparent: boolean

        //
        // ─── RENDER ACCESSORS ────────────────────────────────────────────
        //

            /**
             * Returns the final render of the view with the ANSI Terminal
             * escape codes that in printing to the TTY results in styled
             * prints that contains information such as color, text
             * transformations and cetera.
             */
            readonly ANSITerminalForm: string


            /**
             * Returns the plain text render of the view that contains nothing
             * but the characters of the box. No other information is inserted
             * between the characters of the box.
             */
            readonly plainTextForm: string

        //
        // ─── ANSI TERMINAL STYLE ─────────────────────────────────────────
        //

            /**
             * Sets the style for the ANSI Terminal Renderer.
             * @param options ANSI Terminal stylings
             */
            setANSITerminalStyle ( options: ANSITerminalSetStyleOptions ): ViewProtocol

        //
        // ─── COMMON TOOLS FOR THE RENDERING PROTOCOL ─────────────────────
        //

            /**
             * __⚠️ UNSAFE__ &mdash; TextKit implements no runtime checks for this function.
             *
             * ---
             *
             * Returns a character as a TextKit `ScreenMatrixPixel` with the
             * positions provided by the parent `PaneView`.
             *
             * @param left Distance from the left in the parent pane
             * @param top  Distance from the top in the parent pane
             * @param x    Distance from the left in self
             * @param y    Distance from the top in self
             */
            getCharAtRelativePosition( left: number ,
                                        top: number ,
                                        x: number ,
                                        y: number ): ScreenMatrixPixel


            /**
             * __⚠️ UNSAFE__ &mdash; TextKit implements no runtime checks for this function.
             *
             * ---
             *
             * Ray traces a pixel for the `ParentPane`. This function is
             * a protocol that enables the core renderer of the parent `PaneView`.
             *
             * In the leaf views (the ones that have no nesting children) the system
             * returns the character at the given position and the style associated
             * with the character. But in the branch views (the ones that do have
             * nested children), function looks at all the children that might have
             * a character at the specified position and then the ray tracers picks
             * the most front children (or if absent the empty background).
             *
             * The use of this function is for a branches that also include branch
             * children. Therefore the renderer can ask all the children to ray trace
             * their children as well.
             *
             * @param left Distance from the left in the parent pane
             * @param top  Distance from the top in the parent pane
             * @param x    Distance from the left in self
             * @param y    Distance from the top in self
             */
            rayTrace ( left: number, top: number, x: number, y: number ): ScreenMatrixPixel


            /**
             * Returns the generated ANSI Terminal Escape Sequence that
             * represents the style for the current box. This is used for
             * the core renderer of the `PaneView` to efficiently insert
             * style information in the render form.
             */
            readonly terminalStartTag: string

        //
        // ─── COMMON SHAPING TOOLS ────────────────────────────────────────
        //

            cloneWithAppliedMargin ( topMargin: number ,
                                   rightMargin: number ,
                                  bottomMargin: number ,
                                    leftMargin: number ): ViewProtocol


        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
