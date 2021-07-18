
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { RGBColor }
        from "../color/rgb"

//
// ─── STANDARD COLORS ────────────────────────────────────────────────────────────
//

    /**
     * The basic set of colors that are supported by all renderers of the TextKit.
     * Every other renderer that wishes to work with the TextKit should at least
     * support this set of colors. This is the minimum portable color system that
     * the users can use and be sure of their universal support.
     */
    export type PortableColor =
        | PortableLabeledColors
        | RGBColor

//
// ─── BASIC 16 LABELED COLORS ────────────────────────────────────────────────────
//

    /**
     * These colors are fully supported across all the main TextKit renderers.
     * To see their values you can check these links:
     * - For ANSI Terminals: https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
     * - For Web Colors: https://en.wikipedia.org/wiki/Web_colors#Basic_colors
     */
    export type PortableLabeledColors =
        | "black"
        | "red"
        | "green"
        | "yellow"
        | "blue"
        | "magenta"
        | "cyan"
        | "white"
        | "crimson"
        | "bright-black"
        | "bright-red"
        | "bright-green"
        | "bright-yellow"
        | "bright-blue"
        | "bright-magenta"
        | "bright-cyan"
        | "bright-white"
        | "factory"

// ────────────────────────────────────────────────────────────────────────────────
