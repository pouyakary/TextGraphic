
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PortableColor, PortableLabeledColors }
        from "../../protocols"

//
// ─── CONVERT COLOR ──────────────────────────────────────────────────────────────
//

    export function convertPortableColorToCSSColor ( color: PortableColor ): null | string {
        if ( color === "factory" ) {
            return null
        }

        if ( typeof color === "string" ) {
            return convertBasicLabeledColorsToCSSColors( color )
        }

        return color.hexForm
    }

//
// ─── CONVERT BASIC LABELED COLORS TO CSS COLORS ─────────────────────────────────
//

    function convertBasicLabeledColorsToCSSColors ( labeledColor: PortableLabeledColors ) {
        switch ( labeledColor ) {
            case "black":
                return "black"
            case "red":
                return "red"
            case "green":
                return "green"
            case "yellow":
                return "yellow"
            case "blue":
                return "blue"
            case "magenta":
                return "magenta"
            case "cyan":
                return "cyan"
            case "white":
                return "white"
            case "crimson":
                return "crimson"

            case "bright-black":
                return "grey"
            case "bright-red":
                return "LightRed"
            case "bright-green":
                return "LightGreen"
            case "bright-yellow":
                return "LightYellow"
            case "bright-blue":
                return "LightBlue"
            case "bright-magenta":
                return "LightMagenta"
            case "bright-cyan":
                return "LightCyan"
            case "bright-white":
                return "Grey"
            case "factory":
                return "inherit"
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
