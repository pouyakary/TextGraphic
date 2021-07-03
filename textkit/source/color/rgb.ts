
//
// ─── COLOR CLASS ────────────────────────────────────────────────────────────────
//

    export class RGBColor {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly red:   number
            readonly green: number
            readonly blue:  number

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( red: number, green: number, blue: number ) {
                if ( red >= 0 && red <= 256 ) {
                    this.red =
                        Math.floor( red )
                } else {
                    throw new Error (`24 Bit Color cannot be initiated with red value: ${red}.`)
                }

                if ( blue >= 0 && blue <= 256 ) {
                    this.blue =
                        Math.floor( blue )
                } else {
                    throw new Error (`24 Bit Color cannot be initiated with blue value: ${red}.`)
                }

                if ( green >= 0 && green <= 256 ) {
                    this.green =
                        Math.floor( green )
                } else {
                    throw new Error (`24 Bit Color cannot be initiated with green value: ${red}.`)
                }
            }

        //
        // ─── 24 BIT ──────────────────────────────────────────────────────
        //

            get webRGBForm ( ): string {
                const colorCode =
                    ( "rgb("
                    + this.red.toString( ) + ", " +
                    + this.green.toString( ) + ", " +
                    + this.blue.toString( )
                    + ")"
                    )
                return colorCode
            }

        //
        // ─── HEX VALUE ───────────────────────────────────────────────────
        //

            get hexForm ( ) {
                const red =
                    colorToHexValue( this.red )
                const green =
                    colorToHexValue( this.green )
                const blue =
                    colorToHexValue( this.blue )
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
