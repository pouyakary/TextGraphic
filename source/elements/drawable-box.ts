
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ANSITerminalSetStyleOptions }
        from "../environments/ansi-terminal"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//


    export interface DrawableBox {
        /**
         * The universally unique identifier for the drawable boxes.
         */
        readonly uuid: string

        /**
         * Specifies the baseline of the text box. The baseline indicates
         * where the DrawableBoxes should be aligned vertically together.
         * The baseline is defined as a line from the top of the box.
         */
        readonly baseline:  number
        /**
         * Number of the lines a given DrawableBox has.
         */
        readonly height:    number
        /**
         * Character length of a line in the DrawableBox
         */
        readonly width:     number

        readonly lines:     string[ ]

        readonly terminalStartTag: string

        readonly ANSITerminalForm: string

        readonly plainTextForm: string

        /**
         * Sets theQ$
         * @param options ANSI Terminal stylings
         */
        setANSITerminalStyle ( options: ANSITerminalSetStyleOptions ): void

        getCharAtRelativePosition( left: number, top: number, x: number, y: number ): string
    }

// ────────────────────────────────────────────────────────────────────────────────
