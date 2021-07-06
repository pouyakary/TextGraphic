
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { EMPTY_STRING }
        from "../../constants/characters"
    import { Subset }
        from "../../tools/types"
    import { ANSITerminalStyleSettings }
        from "./style"
    import * as EscapeSequences
        from "./escape-sequences"
    import { convertPortableColorToANSITerminalColor }
        from "./ansi-terminal-portable-color-implementation"

//
// ─── TERMINAL STYLING ───────────────────────────────────────────────────────────
//

    export type TerminalStylingComparison = {
        readonly [Property in keyof ANSITerminalStyleSettings]: boolean
    }

//
// ─── STYLES EQUALS ──────────────────────────────────────────────────────────────
//

    export function terminalStylesEquals (
            a: ANSITerminalStyleSettings,
            b: ANSITerminalStyleSettings,
        ): true | TerminalStylingComparison {

        //
        let allElementsAreEquals =
            true

        const textColor =
            a.textColor == b.textColor
        allElementsAreEquals = allElementsAreEquals && textColor

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
            textColor, backgroundColor, bold, italic,
            reversed, blink, underline, dim,
        }

        return report
    }

//
// ─── GENERATE TERMINAL ESCAPE SEQUENCES ─────────────────────────────────────────
//

    export function generateStartingANSITerminalEscapeSequenceOfTerminalStyling (
            style: ANSITerminalStyleSettings
        ): string {

        //
        const bold =
            style.bold
                ? EscapeSequences.Bold
                : EMPTY_STRING
        const italic =
            style.italic
                ? EscapeSequences.Italic
                : EMPTY_STRING
        const reversed =
            style.reversed
                ? EscapeSequences.Reversed
                : EMPTY_STRING
        const blink =
            style.blink
                ? EscapeSequences.Blink
                : EMPTY_STRING
        const underline =
            style.underline
                ? EscapeSequences.Underline
                : EMPTY_STRING
        const dim =
            style.dim
                ? EscapeSequences.Dim
                : EMPTY_STRING

        const backgroundColor =
            convertPortableColorToANSITerminalColor( style.backgroundColor, true )
        const foregroundColor =
            convertPortableColorToANSITerminalColor( style.textColor, false )

        return (
            bold + italic + dim + reversed + blink + underline +
            backgroundColor + foregroundColor
        )
    }

//
// ─── MERGE TERMINAL STYLE WITH OPTIONS ──────────────────────────────────────────
//

    export function mergeTerminalStyleWithOptions (
            style:      ANSITerminalStyleSettings,
            options:    Subset<ANSITerminalStyleSettings>
        ): ANSITerminalStyleSettings {

        //
        return {
            backgroundColor:    options.backgroundColor     ? options.backgroundColor   : style.backgroundColor,
            textColor:          options.textColor           ? options.textColor         : style.textColor,
            bold:               options.bold                ? options.bold              : style.bold,
            italic:             options.italic              ? options.italic            : style.italic,
            reversed:           options.reversed            ? options.reversed          : style.reversed,
            blink:              options.blink               ? options.blink             : style.blink,
            underline:          options.underline           ? options.underline         : style.underline,
            dim:                options.dim                 ? options.dim               : style.dim,
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
