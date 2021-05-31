
//
// ─── TERMINAL STYLING ───────────────────────────────────────────────────────────
//

    export interface ANSITerminalStyling {
        foregroundColor:    ANSITerminalColor
        backgroundColor:    ANSITerminalColor
        decoration:         ANSITerminalDecoration
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
        "\x1b[0m"
    export const ANSITerminalBoldEscapeSequence =
        "\x1b[1m"
    export const ANSITerminalUnderlineEscapeSequence =
        "\x1b[4m"
    export const ANSITerminalReversedEscapeSequence =
        "\x1b[7m"

//
// ─── COLORS ─────────────────────────────────────────────────────────────────────
//

    export enum ANSITerminalColor {
        Default                 = "default",
        Black                   = "black",
        Red                     = "red",
        Yellow                  = "yellow",
        Blue                    = "blue",
        Magenta                 = "magenta",
        Cyan                    = "cyan",
        White                   = "white",
        Reset                   = "reset",
        BrightBlack             = "bright black",
        BrightRed               = "bright red",
        BrightGreen             = "bright green",
        BrightYellow            = "bright yellow",
        BrightBlue              = "bright blue",
        BrightMagenta           = "bright magenta",
        BrightCyan              = "bright cyan",
        BrightWhite             = "bright white",
        BackgroundBlack         = "background black",
        BackgroundRed           = "background red",
        BackgroundGreen         = "background green",
        BackgroundYellow        = "background yellow",
        BackgroundBlue          = "background blue",
        BackgroundMagenta       = "background magenta",
        BackgroundCyan          = "background cyan",
        BackgroundWhite         = "background white",
        BackgroundBrightBlack   = "background bright black",
        BackgroundBrightRed     = "background bright red",
        BackgroundBrightGreen   = "background bright green",
        BackgroundBrightYellow  = "background bright yellow",
        BackgroundBrightBlue    = "background bright blue",
        BackgroundBrightMagenta = "background bright magenta",
        BackgroundBrightCyan    = "background bright cyan",
        BackgroundBrightWhite   = "background bright white",
    }

//
// ─── DECORATION ─────────────────────────────────────────────────────────────────
//

    export enum ANSITerminalDecoration {
        Bold        = "bold",
        Underline   = "underline",
        Reversed    = "reversed",
        None        = "none"
    }

//
// ─── GET CODE ───────────────────────────────────────────────────────────────────
//

    export function getANSITerminalEscapeSequenceForColor ( color: ANSITerminalColor ): string {
        switch ( color ) {
            case ANSITerminalColor.Black:
                return "\x1b[30m"
            case ANSITerminalColor.Red:
                return "\x1b[31m"
            case ANSITerminalColor.Yellow:
                return "\x1b[33m"
            case ANSITerminalColor.Blue:
                return "\x1b[34m"
            case ANSITerminalColor.Magenta:
                return "\x1b[35m"
            case ANSITerminalColor.Cyan:
                return "\x1b[36m"
            case ANSITerminalColor.White:
                return "\x1b[37m"
            case ANSITerminalColor.Reset:
                return "\x1b[0m"
            case ANSITerminalColor.BrightBlack:
                return "\x1b[30;1m"
            case ANSITerminalColor.BrightRed:
                return "\x1b[31;1m"
            case ANSITerminalColor.BrightGreen:
                return "\x1b[32;1m"
            case ANSITerminalColor.BrightYellow:
                return "\x1b[33;1m"
            case ANSITerminalColor.BrightBlue:
                return "\x1b[34;1m"
            case ANSITerminalColor.BrightMagenta:
                return "\x1b[35;1m"
            case ANSITerminalColor.BrightCyan:
                return "\x1b[36;1m"
            case ANSITerminalColor.BrightWhite:
                return "\x1b[37;1m"
            case ANSITerminalColor.BackgroundBlack:
                return "\x1b[40m"
            case ANSITerminalColor.BackgroundRed:
                return "\x1b[41m"
            case ANSITerminalColor.BackgroundGreen:
                return "\x1b[42m"
            case ANSITerminalColor.BackgroundYellow:
                return "\x1b[43m"
            case ANSITerminalColor.BackgroundBlue:
                return "\x1b[44m"
            case ANSITerminalColor.BackgroundMagenta:
                return "\x1b[45m"
            case ANSITerminalColor.BackgroundCyan:
                return "\x1b[46m"
            case ANSITerminalColor.BackgroundWhite:
                return "\x1b[47m"
            case ANSITerminalColor.BackgroundBrightBlack:
                return "\x1b[40;1m"
            case ANSITerminalColor.BackgroundBrightRed:
                return "\x1b[41;1m"
            case ANSITerminalColor.BackgroundBrightGreen:
                return "\x1b[42;1m"
            case ANSITerminalColor.BackgroundBrightYellow:
                return "\x1b[43;1m"
            case ANSITerminalColor.BackgroundBrightBlue:
                return "\x1b[44;1m"
            case ANSITerminalColor.BackgroundBrightMagenta:
                return "\x1b[45;1m"
            case ANSITerminalColor.BackgroundBrightCyan:
                return "\x1b[46;1m"
            case ANSITerminalColor.BackgroundBrightWhite:
                return "\x1b[47;1m"
            case ANSITerminalColor.Default:
                return ""
        }
    }

//
// ─── GET ESCAPE CODE FOR THE DECORATION ─────────────────────────────────────────
//

    export function getANSITerminalEscapeSequenceForDecoration ( decoration: ANSITerminalDecoration ): string {
        switch ( decoration ) {
            case ANSITerminalDecoration.None:
                return ""
            case ANSITerminalDecoration.Bold:
                return "\x1b[1m"
            case ANSITerminalDecoration.Underline:
                return "\x1b[4m"
            case ANSITerminalDecoration.Reversed:
                return "\x1b[7m"
        }
    }

//
// ─── DEFAULT STYLE ──────────────────────────────────────────────────────────────
//

    export function getDefaultTerminalStyle ( ): ANSITerminalStyling {
        return {
            foregroundColor:    ANSITerminalColor.Default,
            backgroundColor:    ANSITerminalColor.Default,
            decoration:         ANSITerminalDecoration.None
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

        const decoration =
            a.decoration == b.decoration
        allElementsAreEquals = allElementsAreEquals && decoration

        if ( allElementsAreEquals ) {
            return true
        }

        const report: TerminalStylingComparison = {
            foregroundColor, backgroundColor, decoration
        }

        return report
    }

//
// ─── GENERATE TERMINAL ESCAPE SEQUENCES ─────────────────────────────────────────
//

    export function generateStartingANSITerminalEscapeSequenceOfTerminalStyling ( style: ANSITerminalStyling ): string {
        const decoration =
            getANSITerminalEscapeSequenceForDecoration( style.decoration )
        const backgroundColor =
            getANSITerminalEscapeSequenceForColor( style.backgroundColor )
        const foregroundColor =
            getANSITerminalEscapeSequenceForColor( style.foregroundColor )

        return decoration + backgroundColor + foregroundColor
    }

//
// ─── MERGE TERMINAL STYLE WITH OPTIONS ──────────────────────────────────────────
//

    export function mergeTerminalStyleWithOptions ( style: ANSITerminalStyling,
                                                  options: ANSITerminalSetStyleOptions ): ANSITerminalStyling {
        return {
            backgroundColor:    options.backgroundColor     ? options.backgroundColor   : style.backgroundColor,
            foregroundColor:    options.foregroundColor     ? options.foregroundColor   : style.foregroundColor,
            decoration:         options.decoration          ? options.decoration        : style.decoration,
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
