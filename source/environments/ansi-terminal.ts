
//
// ─── TERMINAL STYLING ───────────────────────────────────────────────────────────
//

    export interface ANSITerminalStyling {
        foregroundColor:    ANSITerminalColor
        backgroundColor:    ANSITerminalColor
        bold:               boolean
        underline:          boolean
        reversed:           boolean
    }

    export type TerminalStylingComparison = {
        readonly [Property in keyof ANSITerminalStyling]: boolean
    }

    export type ANSITerminalSetStyleOptions = {
        [ Property in keyof ANSITerminalStyling ]?: ANSITerminalStyling[ Property ]
    }

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    export const ANSITerminalResetEscapeSequence =
        "\u001b[0m"
    export const ANSITerminalBoldEscapeSequence =
        "\u001b[1m"
    export const ANSITerminalUnderlineEscapeSequence =
        "\u001b[4m"
    export const ANSITerminalReversedEscapeSequence =
        "\u001b[7m"

//
// ─── COLORS ─────────────────────────────────────────────────────────────────────
//

    export enum ANSITerminalColor {
        Default                     = "\u001b[0m",
        Black                       = "\u001b[30m",
        Red                         = "\u001b[31m",
        Yellow                      = "\u001b[33m",
        Blue                        = "\u001b[34m",
        Magenta                     = "\u001b[35m",
        Cyan                        = "\u001b[36m",
        White                       = "\u001b[37m",
        Reset                       = "\u001b[0m",
        BrightBlack                 = "\u001b[30;1m",
        BrightRed                   = "\u001b[31;1m",
        BrightGreen                 = "\u001b[32;1m",
        BrightYellow                = "\u001b[33;1m",
        BrightBlue                  = "\u001b[34;1m",
        BrightMagenta               = "\u001b[35;1m",
        BrightCyan                  = "\u001b[36;1m",
        BrightWhite                 = "\u001b[37;1m",
        BackgroundBlack             = "\u001b[40m",
        BackgroundRed               = "\u001b[41m",
        BackgroundGreen             = "\u001b[42m",
        BackgroundYellow            = "\u001b[43m",
        BackgroundBlue              = "\u001b[44m",
        BackgroundMagenta           = "\u001b[45m",
        BackgroundCyan              = "\u001b[46m",
        BackgroundWhite             = "\u001b[47m",
        BackgroundBrightBlack       = "\u001b[40;1m",
        BackgroundBrightRed         = "\u001b[41;1m",
        BackgroundBrightGreen       = "\u001b[42;1m",
        BackgroundBrightYellow      = "\u001b[43;1m",
        BackgroundBrightBlue        = "\u001b[44;1m",
        BackgroundBrightMagenta     = "\u001b[45;1m",
        BackgroundBrightCyan        = "\u001b[46;1m",
        BackgroundBrightWhite       = "\u001b[47;1m",
    }

//
// ─── GET CODE ───────────────────────────────────────────────────────────────────
//

    export function getANSIEscapeSequenceFor ( color: ANSITerminalColor ): string {
        switch ( color ) {
            case ANSITerminalColor.Black:
                return "\u001b[30m"
            case ANSITerminalColor.Red:
                return "\u001b[31m"
            case ANSITerminalColor.Yellow:
                return "\u001b[33m"
            case ANSITerminalColor.Blue:
                return "\u001b[34m"
            case ANSITerminalColor.Magenta:
                return "\u001b[35m"
            case ANSITerminalColor.Cyan:
                return "\u001b[36m"
            case ANSITerminalColor.White:
                return "\u001b[37m"
            case ANSITerminalColor.Reset:
                return "\u001b[0m"
            case ANSITerminalColor.BrightBlack:
                return "\u001b[30;1m"
            case ANSITerminalColor.BrightRed:
                return "\u001b[31;1m"
            case ANSITerminalColor.BrightGreen:
                return "\u001b[32;1m"
            case ANSITerminalColor.BrightYellow:
                return "\u001b[33;1m"
            case ANSITerminalColor.BrightBlue:
                return "\u001b[34;1m"
            case ANSITerminalColor.BrightMagenta:
                return "\u001b[35;1m"
            case ANSITerminalColor.BrightCyan:
                return "\u001b[36;1m"
            case ANSITerminalColor.BrightWhite:
                return "\u001b[37;1m"
            case ANSITerminalColor.BackgroundBlack:
                return "\u001b[40m"
            case ANSITerminalColor.BackgroundRed:
                return "\u001b[41m"
            case ANSITerminalColor.BackgroundGreen:
                return "\u001b[42m"
            case ANSITerminalColor.BackgroundYellow:
                return "\u001b[43m"
            case ANSITerminalColor.BackgroundBlue:
                return "\u001b[44m"
            case ANSITerminalColor.BackgroundMagenta:
                return "\u001b[45m"
            case ANSITerminalColor.BackgroundCyan:
                return "\u001b[46m"
            case ANSITerminalColor.BackgroundWhite:
                return "\u001b[47m"
            case ANSITerminalColor.BackgroundBrightBlack:
                return "\u001b[40;1m"
            case ANSITerminalColor.BackgroundBrightRed:
                return "\u001b[41;1m"
            case ANSITerminalColor.BackgroundBrightGreen:
                return "\u001b[42;1m"
            case ANSITerminalColor.BackgroundBrightYellow:
                return "\u001b[43;1m"
            case ANSITerminalColor.BackgroundBrightBlue:
                return "\u001b[44;1m"
            case ANSITerminalColor.BackgroundBrightMagenta:
                return "\u001b[45;1m"
            case ANSITerminalColor.BackgroundBrightCyan:
                return "\u001b[46;1m"
            case ANSITerminalColor.BackgroundBrightWhite:
                return "\u001b[47;1m"
        }
    }

//
// ─── DEFAULT STYLE ──────────────────────────────────────────────────────────────
//

    export function getDefaultTerminalStyle ( ): ANSITerminalStyling {
        return {
            foregroundColor:          ANSITerminalColor.Black,
            backgroundColor:    ANSITerminalColor.Black,
            bold:               false,
            reversed:           false,
            underline:          false,
        }
    }

//
// ─── STYLES EQUALS ──────────────────────────────────────────────────────────────
//

    export function terminalStylesEquals ( a: ANSITerminalStyling, b: ANSITerminalStyling ): true | TerminalStylingComparison {
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

        const reversed =
            a.reversed == b.reversed
        allElementsAreEquals = allElementsAreEquals && reversed

        const underline =
            a.underline == b.underline
        allElementsAreEquals = allElementsAreEquals && underline

        if ( allElementsAreEquals ) {
            return true
        }

        const report: TerminalStylingComparison = {
            bold, reversed, underline, foregroundColor, backgroundColor
        }

        return report
    }

//
// ─── GENERATE TERMINAL ESCAPE SEQUENCES ─────────────────────────────────────────
//

    export function generateStartingANSITerminalEscapeSequenceOfTerminalStyling ( style: ANSITerminalStyling ): string {
        const bold =
            style.bold ? ANSITerminalBoldEscapeSequence : ""
        const reversed =
            style.reversed ? ANSITerminalResetEscapeSequence : ""
        const underline =
            style.underline ? ANSITerminalUnderlineEscapeSequence : ""
        const backgroundColor =
            style.backgroundColor !== ANSITerminalColor.Default ? style.backgroundColor : ""
        const foregroundColor =
            style.foregroundColor !== ANSITerminalColor.Default ? style.foregroundColor : ""

        return backgroundColor + foregroundColor + bold + reversed + underline
    }

//
// ─── MERGE TERMINAL STYLE WITH OPTIONS ──────────────────────────────────────────
//

    export function mergeTerminalStyleWithOptions ( style: ANSITerminalStyling,
                                                  options: ANSITerminalSetStyleOptions ): ANSITerminalStyling {
        return {
            backgroundColor:    options.backgroundColor     ? options.backgroundColor   : style.backgroundColor,
            bold:               options.bold                ? options.bold              : style.bold,
            foregroundColor:    options.foregroundColor     ? options.foregroundColor   : style.foregroundColor,
            reversed:           options.reversed            ? options.reversed          : style.reversed,
            underline:          options.underline           ? options.underline         : style.underline,
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
