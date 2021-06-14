
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ANSITerminalSetStyleOptions }
        from "../environments/ansi-terminal"

//
// ─── RAY TRACER RESULT ──────────────────────────────────────────────────────────
//

    /**
     * ```
     * [  ANSI Terminal Color Starting Tag,  Character  ]
     * ```
     */
    export type ScreenMatrixPixel =
        [ string, string ]

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export interface StringBox {

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

        readonly terminalStartTag: string

        readonly ANSITerminalForm: string

        readonly plainTextForm: string

        /**
         * Sets theQ$a
         * @param options ANSI Terminal stylings
         */
        setANSITerminalStyle ( options: ANSITerminalSetStyleOptions ): StringBox

        getCharAtRelativePosition( left: number ,
                                    top: number ,
                                      x: number ,
                                      y: number ): ScreenMatrixPixel

        rayTrace ( distanceToLeftInParent: number ,
                  distanceToRightInParent: number ,
                                        x: number ,
                                        y: number ): ScreenMatrixPixel
    }

// ────────────────────────────────────────────────────────────────────────────────
