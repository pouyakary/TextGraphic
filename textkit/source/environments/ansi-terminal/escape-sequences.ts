
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { BasicLabeledColors }
        from "../../protocols/portable-color"
    import { RGBColor }
        from "../../color/rgb"
    import { EMPTY_STRING }
        from "../../constants/characters"

//
// ─── FORMATTER ──────────────────────────────────────────────────────────────────
//

    export function formANSITerminalEscapeSequence ( ...commands: string[ ] ) {
        return "\x1b[" + commands.join( ";" ) + "m"
    }

//
// ─── BASIC ANSI ESCAPE SEQUENCES ────────────────────────────────────────────────
//

    export const ANSITerminalResetEscapeSequence =
        formANSITerminalEscapeSequence( "0" )
    export const ANSITerminalBoldEscapeSequence =
        formANSITerminalEscapeSequence( "1" )
    export const ANSITerminalDimEscapeSequence =
        formANSITerminalEscapeSequence( "2" )
    export const ANSITerminalItalicEscapeSequence =
        formANSITerminalEscapeSequence( "3" )
    export const ANSITerminalUnderlineEscapeSequence =
        formANSITerminalEscapeSequence( "4" )
    export const ANSITerminalBlinkEscapeSequence =
        formANSITerminalEscapeSequence( "5" )
    export const ANSITerminalReversedEscapeSequence =
        formANSITerminalEscapeSequence( "7" )
    export const ANSITerminalHiddenEscapeSequence =
        formANSITerminalEscapeSequence( "8" )

//
// ─── FOREGROUND COLOR LUT ───────────────────────────────────────────────────────
//

    export function getForegroundColorEscapeSequenceForLabledColor ( color: BasicLabeledColors ): string {
        switch ( color ) {
            case "black":
                return formANSITerminalEscapeSequence( "30" )
            case "red":
                return formANSITerminalEscapeSequence( "31" )
            case "green":
                return formANSITerminalEscapeSequence( "32" )
            case "yellow":
                return formANSITerminalEscapeSequence( "33" )
            case "blue":
                return formANSITerminalEscapeSequence( "34" )
            case "magenta":
                return formANSITerminalEscapeSequence( "35" )
            case "cyan":
                return formANSITerminalEscapeSequence( "36" )
            case "white":
                return formANSITerminalEscapeSequence( "37" )
            case "crimson":
                return formANSITerminalEscapeSequence( "38" )
            case "bright-black":
                return formANSITerminalEscapeSequence( "30", "1" )
            case "bright-red":
                return formANSITerminalEscapeSequence( "31", "1" )
            case "bright-green":
                return formANSITerminalEscapeSequence( "32", "1" )
            case "bright-yellow":
                return formANSITerminalEscapeSequence( "33", "1" )
            case "bright-blue":
                return formANSITerminalEscapeSequence( "34", "1" )
            case "bright-magenta":
                return formANSITerminalEscapeSequence( "35", "1" )
            case "bright-cyan":
                return formANSITerminalEscapeSequence( "36", "1" )
            case "bright-white":
                return formANSITerminalEscapeSequence( "37", "1" )
            case "factory":
                return EMPTY_STRING
        }
    }

//
// ─── BACKGROUND COLOR LUT ───────────────────────────────────────────────────────
//

    export function getBackgroundColorEscapeSequenceForLabledColor ( color: BasicLabeledColors ): string {
        switch ( color ) {
            case "black":
                return formANSITerminalEscapeSequence( "40" )
            case "red":
                return formANSITerminalEscapeSequence( "41" )
            case "green":
                return formANSITerminalEscapeSequence( "42" )
            case "yellow":
                return formANSITerminalEscapeSequence( "43" )
            case "blue":
                return formANSITerminalEscapeSequence( "44" )
            case "magenta":
                return formANSITerminalEscapeSequence( "45" )
            case "cyan":
                return formANSITerminalEscapeSequence( "46" )
            case "white":
                return formANSITerminalEscapeSequence( "47" )
            case "crimson":
                return formANSITerminalEscapeSequence( "48" )
            case "bright-black":
                return formANSITerminalEscapeSequence( "40", "1" )
            case "bright-red":
                return formANSITerminalEscapeSequence( "41", "1" )
            case "bright-green":
                return formANSITerminalEscapeSequence( "42", "1" )
            case "bright-yellow":
                return formANSITerminalEscapeSequence( "43", "1" )
            case "bright-blue":
                return formANSITerminalEscapeSequence( "44", "1" )
            case "bright-magenta":
                return formANSITerminalEscapeSequence( "45", "1" )
            case "bright-cyan":
                return formANSITerminalEscapeSequence( "46", "1" )
            case "bright-white":
                return formANSITerminalEscapeSequence( "47", "1" )
            case "factory":
                return EMPTY_STRING
        }
    }

//
// ─── STYLE COLOR FOR ANSI TERMINAL ──────────────────────────────────────────────
//

    export function formatColorTo24BitANSITerminalColor ( color: RGBColor ) {
        if ( typeof color === "string" ) {
            return color
        }

        const colorCode =
            formANSITerminalEscapeSequence( "38", "2",
                color.red.toString( ),
                color.green.toString( ),
                color.blue.toString( ),
            )
        return colorCode

    }

//
// ─── 8 BIT COLOR ────────────────────────────────────────────────────────────────
//

    export function formatMiddleLUTColorTo8BitANSITerminalColor ( color: RGBColor ): string {
        const red =
            Math.floor( color.red / ( 256 / 36 ) )
        const green =
            Math.floor( color.green / ( 256 / 6 ) )
        const blue =
            Math.floor( color.blue / ( 256 / 6 ) )

        const colorCode =
            ( red + green + blue ).toString( )
        const escapeSequence =
            formANSITerminalEscapeSequence( "38", "5", colorCode )

        return escapeSequence
    }

// ────────────────────────────────────────────────────────────────────────────────
