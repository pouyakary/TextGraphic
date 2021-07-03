
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { formANSITerminalEscapeSequence }
        from "../environments/ansi-terminal/ansi-terminal"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export type ColorBitRate =
        8 | 24

//
// ─── COLOR CLASS ────────────────────────────────────────────────────────────────
//

    export class Color {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            #red:   number
            #green: number
            #blue:  number

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( red: number, green: number, blue: number ) {
                this.#red =
                    red
                this.#green =
                    green
                this.#blue =
                    blue
            }

        //
        // ─── FORMAT 8 BIT OUTPUT ─────────────────────────────────────────
        //

            get ANSITerminal8BitColor ( ): string {
                const red =
                    Math.floor( this.#red / ( 256 / 36 ) )
                const green =
                    Math.floor( this.#green / ( 256 / 6 ) )
                const blue =
                    Math.floor( this.#blue / ( 256 / 6 ) )

                const colorCode =
                    ( red + green + blue ).toString( )
                const escapeSequence =
                    formANSITerminalEscapeSequence( "38", "5", colorCode )

                return escapeSequence
            }

        //
        // ─── 24 BIT ──────────────────────────────────────────────────────
        //

            get ANSITerminal24BitColorForm ( ): string {
                const colorCode =
                    formANSITerminalEscapeSequence( "38", "2",
                        this.#red.toString( ),
                        this.#green.toString( ),
                        this.#blue.toString( ),
                    )
                return colorCode
            }

            get webRGBForm ( ): string {
                const colorCode =
                    ( "rgb("
                    + this.#red.toString( ) + ", " +
                    + this.#green.toString( ) + ", " +
                    + this.#blue.toString( )
                    + ")"
                    )
                return colorCode
            }

        //
        // ─── HEX VALUE ───────────────────────────────────────────────────
        //

            get hexForm ( ) {
                const red =
                    colorToHexValue( this.#red )
                const green =
                    colorToHexValue( this.#green )
                const blue =
                    colorToHexValue( this.#blue )
                return "#" + red + green + blue
            }

        // ─────────────────────────────────────────────────────────────────

    }

//
// ─── TOOLS ──────────────────────────────────────────────────────────────────────
//

    function colorToHexValue ( color: number ) {
        const hex =
            color.toString( 16 )
        return hex.length === 1 ? "0" + hex : hex
    }

// ────────────────────────────────────────────────────────────────────────────────
