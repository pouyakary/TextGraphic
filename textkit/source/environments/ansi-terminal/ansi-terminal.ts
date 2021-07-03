
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { EMPTY_STRING }
        from "../../constants/characters"
    import { Subset }
            from "../../tools/types"

//
// ─── TERMINAL STYLING ───────────────────────────────────────────────────────────
//

    export interface ANSITerminalStyling {
        foregroundColor:    ANSITerminalForegroundColor
        backgroundColor:    ANSITerminalBackgroundColor
        bold:               boolean
        italic:             boolean
        reversed:           boolean
        blink:              boolean
        underline:          boolean
        dim:                boolean
    }

    export type TerminalStylingComparison = {
        readonly [Property in keyof ANSITerminalStyling]: boolean
    }

    export type ANSITerminalSetStyleOptions =
        Subset<ANSITerminalStyling>

//
// ─── FORM SEQUENCE ──────────────────────────────────────────────────────────────
//

    export function formANSITerminalEscapeSequence ( ...commands: string[ ] ) {
        return "\x1b[" + commands.join( ";" ) + "m"
    }

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//


    export const ANSITerminalResetEscapeSequence =
        formANSITerminalEscapeSequence( "0" )
    export const ANSITerminalBoldEscapeSequence =
        formANSITerminalEscapeSequence( ", "1" )
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
// ─── COLORS ─────────────────────────────────────────────────────────────────────
//

    export enum ANSITerminalForegroundColor {
        Default                 = "default",
        Black                   = "black",
        Red                     = "red",
        Green                   = "green",
        Yellow                  = "yellow",
        Blue                    = "blue",
        Magenta                 = "magenta",
        Cyan                    = "cyan",
        White                   = "white",
        Crimson                 = "crimson",
        BrightBlack             = "bright black",
        BrightRed               = "bright red",
        BrightGreen             = "bright green",
        BrightYellow            = "bright yellow",
        BrightBlue              = "bright blue",
        BrightMagenta           = "bright magenta",
        BrightCyan              = "bright cyan",
        BrightWhite             = "bright white",
    }

    export enum ANSITerminalBackgroundColor {
        Default       = "default",
        Black         = "black",
        Red           = "red",
        Green         = "green",
        Yellow        = "yellow",
        Blue          = "blue",
        Magenta       = "magenta",
        Cyan          = "cyan",
        White         = "white",
        Crimson       = "crimson",
        BrightBlack   = "bright black",
        BrightRed     = "bright red",
        BrightGreen   = "bright green",
        BrightYellow  = "bright yellow",
        BrightBlue    = "bright blue",
        BrightMagenta = "bright magenta",
        BrightCyan    = "bright cyan",
        BrightWhite   = "bright white",
    }

//
// ─── GET CODE ───────────────────────────────────────────────────────────────────
//


    export function getANSITerminalEscapeSequenceForForegroundColor ( color: ANSITerminalForegroundColor ): string {
        switch ( color ) {
            case ANSITerminalForegroundColor.Black:
                return formANSITerminalEscapeSequence( "30" )
            case ANSITerminalForegroundColor.Red:
                return formANSITerminalEscapeSequence( "31" )
            case ANSITerminalForegroundColor.Green:
                return formANSITerminalEscapeSequence( "32" )
            case ANSITerminalForegroundColor.Yellow:
                return formANSITerminalEscapeSequence( "33" )
            case ANSITerminalForegroundColor.Blue:
                return formANSITerminalEscapeSequence( "34" )
            case ANSITerminalForegroundColor.Magenta:
                return formANSITerminalEscapeSequence( "35" )
            case ANSITerminalForegroundColor.Cyan:
                return formANSITerminalEscapeSequence( "36" )
            case ANSITerminalForegroundColor.White:
                return formANSITerminalEscapeSequence( "37" )
            case ANSITerminalForegroundColor.Crimson:
                return formANSITerminalEscapeSequence( "38" )
            case ANSITerminalForegroundColor.BrightBlack:
                return formANSITerminalEscapeSequence( "30", "1" )
            case ANSITerminalForegroundColor.BrightRed:
                return formANSITerminalEscapeSequence( "31", "1" )
            case ANSITerminalForegroundColor.BrightGreen:
                return formANSITerminalEscapeSequence( "32", "1" )
            case ANSITerminalForegroundColor.BrightYellow:
                return formANSITerminalEscapeSequence( "33", "1" )
            case ANSITerminalForegroundColor.BrightBlue:
                return formANSITerminalEscapeSequence( "34", "1" )
            case ANSITerminalForegroundColor.BrightMagenta:
                return formANSITerminalEscapeSequence( "35", "1" )
            case ANSITerminalForegroundColor.BrightCyan:
                return formANSITerminalEscapeSequence( "36", "1" )
            case ANSITerminalForegroundColor.BrightWhite:
                return formANSITerminalEscapeSequence( "37", "1" )
            case ANSITerminalForegroundColor.Default:
                return EMPTY_STRING
        }
    }

    export function getANSITerminalEscapeSequenceForBackgroundColor ( color: ANSITerminalBackgroundColor ): string {
        switch ( color ) {
            case ANSITerminalBackgroundColor.Black:
                return formANSITerminalEscapeSequence( "40" )
            case ANSITerminalBackgroundColor.Red:
                return formANSITerminalEscapeSequence( "41" )
            case ANSITerminalBackgroundColor.Green:
                return formANSITerminalEscapeSequence( "42" )
            case ANSITerminalBackgroundColor.Yellow:
                return formANSITerminalEscapeSequence( "43" )
            case ANSITerminalBackgroundColor.Blue:
                return formANSITerminalEscapeSequence( "44" )
            case ANSITerminalBackgroundColor.Magenta:
                return formANSITerminalEscapeSequence( "45" )
            case ANSITerminalBackgroundColor.Cyan:
                return formANSITerminalEscapeSequence( "46" )
            case ANSITerminalBackgroundColor.White:
                return formANSITerminalEscapeSequence( "47" )
            case ANSITerminalBackgroundColor.Crimson:
                return formANSITerminalEscapeSequence( "48" )
            case ANSITerminalBackgroundColor.BrightBlack:
                return formANSITerminalEscapeSequence( "40", "1" )
            case ANSITerminalBackgroundColor.BrightRed:
                return formANSITerminalEscapeSequence( "41", "1" )
            case ANSITerminalBackgroundColor.BrightGreen:
                return formANSITerminalEscapeSequence( "42", "1" )
            case ANSITerminalBackgroundColor.BrightYellow:
                return formANSITerminalEscapeSequence( "43", "1" )
            case ANSITerminalBackgroundColor.BrightBlue:
                return formANSITerminalEscapeSequence( "44", "1" )
            case ANSITerminalBackgroundColor.BrightMagenta:
                return formANSITerminalEscapeSequence( "45", "1" )
            case ANSITerminalBackgroundColor.BrightCyan:
                return formANSITerminalEscapeSequence( "46", "1" )
            case ANSITerminalBackgroundColor.BrightWhite:
                return formANSITerminalEscapeSequence( "47", "1" )
            case ANSITerminalBackgroundColor.Default:
                return EMPTY_STRING
        }
    }

//
// ─── DEFAULT STYLE ──────────────────────────────────────────────────────────────
//

    export function getDefaultTerminalStyle ( ): ANSITerminalStyling {
        return {
            foregroundColor:    ANSITerminalForegroundColor.Default,
            backgroundColor:    ANSITerminalBackgroundColor.Default,
            bold:               false,
            italic:             false,
            reversed:           false,
            blink:              false,
            underline:          false,
            dim:                false,
        }
    }

//
// ─── STYLES EQUALS ──────────────────────────────────────────────────────────────
//

    export function terminalStylesEquals (
            a: ANSITerminalStyling,
            b: ANSITerminalStyling,
        ): true | TerminalStylingComparison {

        //
        let allElementsAreEquals =
            true

        const foregroundColor =
            a.foregroundColor == b.foregroundColor
        allElementsAreEquals = allElementsAreEquals && foregroundColor

        const backgroundColor =
            a.backgroundColor == b.backgroundColor
        allElementsAreEquals = allElementsAreEquals && backgroundColor

        const bold =
            a.bold == b.bold
        allElementsAreEquals = allElementsAreEquals && bold

        const italic =
            a.italic == b.italic
        allElementsAreEquals = allElementsAreEquals && italic

        const reversed =
            a.reversed == b.reversed
        allElementsAreEquals = allElementsAreEquals && reversed

        const dim =
            a.dim == b.dim
        allElementsAreEquals = allElementsAreEquals && dim

        const underline =
            a.underline == b.underline
        allElementsAreEquals = allElementsAreEquals && underline

        const blink =
            a.blink == b.blink
        allElementsAreEquals = allElementsAreEquals && blink


        if ( allElementsAreEquals ) {
            return true
        }

        const report: TerminalStylingComparison = {
            foregroundColor, backgroundColor, bold, italic,
            reversed, blink, underline, dim,
        }

        return report
    }

//
// ─── GENERATE TERMINAL ESCAPE SEQUENCES ─────────────────────────────────────────
//

    export function generateStartingANSITerminalEscapeSequenceOfTerminalStyling (
            style: ANSITerminalStyling
        ): string {

        //
        const bold =
            style.bold ? ANSITerminalBoldEscapeSequence : EMPTY_STRING
        const italic =
            style.italic ? ANSITerminalItalicEscapeSequence : EMPTY_STRING
        const reversed =
            style.reversed ? ANSITerminalReversedEscapeSequence : EMPTY_STRING
        const blink =
            style.blink ? ANSITerminalBlinkEscapeSequence : EMPTY_STRING
        const underline =
            style.underline ? ANSITerminalUnderlineEscapeSequence : EMPTY_STRING
        const dim =
            style.dim ? ANSITerminalDimEscapeSequence : EMPTY_STRING

        const backgroundColor =
            getANSITerminalEscapeSequenceForBackgroundColor( style.backgroundColor )
        const foregroundColor =
            getANSITerminalEscapeSequenceForForegroundColor( style.foregroundColor )

        return (
            bold + italic + dim + reversed + blink + underline +
            backgroundColor + foregroundColor
        )
    }

//
// ─── MERGE TERMINAL STYLE WITH OPTIONS ──────────────────────────────────────────
//

    export function mergeTerminalStyleWithOptions (
            style:      ANSITerminalStyling,
            options:    ANSITerminalSetStyleOptions
        ): ANSITerminalStyling {

        //
        return {
            backgroundColor:    options.backgroundColor     ? options.backgroundColor   : style.backgroundColor,
            foregroundColor:    options.foregroundColor     ? options.foregroundColor   : style.foregroundColor,
            bold:               options.bold                ? options.bold              : style.bold,
            italic:             options.italic              ? options.italic            : style.italic,
            reversed:           options.reversed            ? options.reversed          : style.reversed,
            blink:              options.blink               ? options.blink             : style.blink,
            underline:          options.underline           ? options.underline         : style.underline,
            dim:                options.dim                 ? options.dim               : style.dim,
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
