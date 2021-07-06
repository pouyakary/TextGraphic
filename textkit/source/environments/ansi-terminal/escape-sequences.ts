
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PortableLabeledColors }
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

    export const Reset =
        formANSITerminalEscapeSequence( "0" )
    export const Bold =
        formANSITerminalEscapeSequence( "1" )
    export const Dim =
        formANSITerminalEscapeSequence( "2" )
    export const Italic =
        formANSITerminalEscapeSequence( "3" )
    export const Underline =
        formANSITerminalEscapeSequence( "4" )
    export const Blink =
        formANSITerminalEscapeSequence( "5" )
    export const Reversed =
        formANSITerminalEscapeSequence( "7" )
    export const Hidden =
        formANSITerminalEscapeSequence( "8" )

//
// ─── FOREGROUND COLOR LUT ───────────────────────────────────────────────────────
//

    export function getForegroundColorEscapeSequenceForLabledColor ( color: PortableLabeledColors ): string {
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

    export function getBackgroundColorEscapeSequenceForLabledColor ( color: PortableLabeledColors ): string {
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

    export function formatColorTo24BitANSITerminalColor ( color: RGBColor, isBackground: boolean ) {
        if ( typeof color === "string" ) {
            return color
        }

        const backgroundForegroundSelection =
            isBackground ? "48" : "38"

        const colorCode =
            formANSITerminalEscapeSequence( backgroundForegroundSelection, "2",
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
