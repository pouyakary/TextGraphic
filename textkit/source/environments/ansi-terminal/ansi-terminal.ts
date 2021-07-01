
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

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
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    export const ANSITerminalResetEscapeSequence =
        "\x1b[0m"
    export const ANSITerminalBoldEscapeSequence =
        "\x1b[1m"
    export const ANSITerminalDimEscapeSequence =
        "\x1b[2m"
    export const ANSITerminalItalicEscapeSequence =
        "\x1b[3m"
    export const ANSITerminalUnderlineEscapeSequence =
        "\x1b[4m"
    export const ANSITerminalBlinkEscapeSequence =
        "\x1b[5m"
    export const ANSITerminalReversedEscapeSequence =
        "\x1b[7m"
    export const ANSITerminalHiddenEscapeSequence =
        "\x1b[8m"

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
                return "\x1b[30m"
            case ANSITerminalForegroundColor.Red:
                return "\x1b[31m"
            case ANSITerminalForegroundColor.Green:
                return "\x1b[32m"
            case ANSITerminalForegroundColor.Yellow:
                return "\x1b[33m"
            case ANSITerminalForegroundColor.Blue:
                return "\x1b[34m"
            case ANSITerminalForegroundColor.Magenta:
                return "\x1b[35m"
            case ANSITerminalForegroundColor.Cyan:
                return "\x1b[36m"
            case ANSITerminalForegroundColor.White:
                return "\x1b[37m"
            case ANSITerminalForegroundColor.Crimson:
                return "\x1b[38m"
            case ANSITerminalForegroundColor.BrightBlack:
                return "\x1b[30;1m"
            case ANSITerminalForegroundColor.BrightRed:
                return "\x1b[31;1m"
            case ANSITerminalForegroundColor.BrightGreen:
                return "\x1b[32;1m"
            case ANSITerminalForegroundColor.BrightYellow:
                return "\x1b[33;1m"
            case ANSITerminalForegroundColor.BrightBlue:
                return "\x1b[34;1m"
            case ANSITerminalForegroundColor.BrightMagenta:
                return "\x1b[35;1m"
            case ANSITerminalForegroundColor.BrightCyan:
                return "\x1b[36;1m"
            case ANSITerminalForegroundColor.BrightWhite:
                return "\x1b[37;1m"
            case ANSITerminalForegroundColor.Default:
                return ""
        }
    }

    export function getANSITerminalEscapeSequenceForBackgroundColor ( color: ANSITerminalBackgroundColor ): string {
        switch ( color ) {
            case ANSITerminalBackgroundColor.Black:
                return "\x1b[40m"
            case ANSITerminalBackgroundColor.Red:
                return "\x1b[41m"
            case ANSITerminalBackgroundColor.Green:
                return "\x1b[42m"
            case ANSITerminalBackgroundColor.Yellow:
                return "\x1b[43m"
            case ANSITerminalBackgroundColor.Blue:
                return "\x1b[44m"
            case ANSITerminalBackgroundColor.Magenta:
                return "\x1b[45m"
            case ANSITerminalBackgroundColor.Cyan:
                return "\x1b[46m"
            case ANSITerminalBackgroundColor.White:
                return "\x1b[47m"
            case ANSITerminalBackgroundColor.Crimson:
                return "\x1b[48m"
            case ANSITerminalBackgroundColor.BrightBlack:
                return "\x1b[40;1m"
            case ANSITerminalBackgroundColor.BrightRed:
                return "\x1b[41;1m"
            case ANSITerminalBackgroundColor.BrightGreen:
                return "\x1b[42;1m"
            case ANSITerminalBackgroundColor.BrightYellow:
                return "\x1b[43;1m"
            case ANSITerminalBackgroundColor.BrightBlue:
                return "\x1b[44;1m"
            case ANSITerminalBackgroundColor.BrightMagenta:
                return "\x1b[45;1m"
            case ANSITerminalBackgroundColor.BrightCyan:
                return "\x1b[46;1m"
            case ANSITerminalBackgroundColor.BrightWhite:
                return "\x1b[47;1m"
            case ANSITerminalBackgroundColor.Default:
                return ""
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
            style.bold ? ANSITerminalBoldEscapeSequence : ""
        const italic =
            style.italic ? ANSITerminalItalicEscapeSequence : ""
        const reversed =
            style.reversed ? ANSITerminalReversedEscapeSequence : ""
        const blink =
            style.blink ? ANSITerminalBlinkEscapeSequence : ""
        const underline =
            style.underline ? ANSITerminalUnderlineEscapeSequence : ""
        const dim =
            style.dim ? ANSITerminalDimEscapeSequence : ""

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
