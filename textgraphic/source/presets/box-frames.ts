
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { WHITE_SPACE_CHARACTER }
        from "../constants/characters"

//
// ─── TYPE ───────────────────────────────────────────────────────────────────────
//

    export interface BoxFrameCharSet {
        top:            string
        topRight:       string
        right:          string
        bottomRight:    string
        bottom:         string
        bottomLeft:     string
        left:           string
        topLeft:        string
    }

//
// ─── BRACKET ────────────────────────────────────────────────────────────────────
//

    /**
     * ```
     * ⎡    ⎤
     * ⎜    ⎟
     * ⎣    ⎦
     * ```
     */
    export const Bracket: Readonly<BoxFrameCharSet> = {
        topLeft:        "⎡",
        top:            WHITE_SPACE_CHARACTER,
        topRight:       "⎤",
        right:          "⎟",
        bottomRight:    "⎦",
        bottom:         WHITE_SPACE_CHARACTER,
        bottomLeft:     "⎣",
        left:           "⎜",
    }

//
// ─── ABSOLUTE ───────────────────────────────────────────────────────────────────
//

    /**
     * ```
     * ⎜    ⎟
     * ⎜    ⎟
     * ⎜    ⎟
     * ```
     */
    export const Absolute: Readonly<BoxFrameCharSet> = {
        topLeft:        "⎢",
        top:            WHITE_SPACE_CHARACTER ,
        topRight:       "⎥",
        right:          "⎥",
        bottomRight:    "⎥",
        bottom:         WHITE_SPACE_CHARACTER ,
        bottomLeft:     "⎢",
        left:           "⎢",
    }

//
// ─── FLOOR ──────────────────────────────────────────────────────────────────────
//

    /**
     * ```
     * ⎜    ⎟
     * ⎜    ⎟
     * ⎣    ⎦
     * ```
     */
    export const Floor: Readonly<BoxFrameCharSet> = {
        topLeft:        "⎜",
        top:            WHITE_SPACE_CHARACTER,
        topRight:       "⎟",
        right:          "⎟",
        bottomRight:    "⎦",
        bottom:         WHITE_SPACE_CHARACTER,
        bottomLeft:     "⎣",
        left:           "⎜",
    }

//
// ─── CEILING ────────────────────────────────────────────────────────────────────
//

    /**
     * ```
     * ⎡    ⎤
     * ⎜    ⎟
     * ⎜    ⎟
     * ```
     */
    export const Ceiling: Readonly<BoxFrameCharSet> = {
        topLeft:        "⎡",
        top:            WHITE_SPACE_CHARACTER,
        topRight:       "⎤",
        right:          "⎟",
        bottomRight:    "⎥",
        bottom:         WHITE_SPACE_CHARACTER,
        bottomLeft:     "⎢",
        left:           "⎢",
    }

//
// ─── PARENTHESIS ────────────────────────────────────────────────────────────────
//

    /**
     * ```
     * ⎛    ⎞
     * ⎜    ⎟
     * ⎝    ⎠
     * ```
     */
    export const Parenthesis: Readonly<BoxFrameCharSet> = {
        topLeft:        "⎛",
        top:            WHITE_SPACE_CHARACTER,
        topRight:       "⎞",
        right:          "⎟",
        bottomRight:    "⎠",
        bottom:         WHITE_SPACE_CHARACTER,
        bottomLeft:     "⎝",
        left:           "⎜",
    }

//
// ─── LIGHT BOX ──────────────────────────────────────────────────────────────────
//

    /**
     * ```
     * ┌────┐
     * │    │
     * └────┘
     * ```
     */
    export const LightBox: Readonly<BoxFrameCharSet> = {
        topLeft:        "┌",
        top:            "─",
        topRight:       "┐",
        right:          "│",
        bottomRight:    "┘",
        bottom:         "─",
        bottomLeft:     "└",
        left:           "│",
    }

//
// ─── LIGHT BOX WITH CORNER RADIUS ───────────────────────────────────────────────
//

    /**
     * ```
     * ╭────╮
     * │    │
     * ╰────╯
     * ```
     */
    export const LightBoxWithRoundCorner: Readonly<BoxFrameCharSet> = {
        topLeft:        "╭",
        top:            "─",
        topRight:       "╮",
        right:          "│",
        bottomRight:    "╯",
        bottom:         "─",
        bottomLeft:     "╰",
        left:           "│",
    }

//
// ─── HEAVY BOX ──────────────────────────────────────────────────────────────────
//


    /**
     * ```
     * ┏━━━━┓
     * ┃    ┃
     * ┗━━━━┛
     * ```
     */
    export const HeavyBox: Readonly<BoxFrameCharSet> = {
        topLeft:        "┏",
        top:            "━",
        topRight:       "┓",
        right:          "┃",
        bottomRight:    "┛",
        bottom:         "━",
        bottomLeft:     "┗",
        left:           "┃",
    }

//
// ─── DOUBLE LINED HORIZONTAL AND VERTICAL ───────────────────────────────────────
//

    /**
     * ```
     * ╔════╗
     * ║    ║
     * ╚════╝
     * ```
     */
    export const DoubleLineBox: Readonly<BoxFrameCharSet> = {
        topLeft:        "╔",
        top:            "═",
        topRight:       "╗",
        right:          "║",
        bottomRight:    "╝",
        bottom:         "═",
        bottomLeft:     "╚",
        left:           "║",
    }

//
// ─── DOUBLE VERTICAL BOX ────────────────────────────────────────────────────────
//

    /**
     * ```
     * ╓────╖
     * ║    ║
     * ╙────╜
     * ```
     */
    export const HLightVDoubleBox: Readonly<BoxFrameCharSet> = {
        topLeft:        "╓",
        top:            "─",
        topRight:       "╖",
        right:          "║",
        bottomRight:    "╜",
        bottom:         "─",
        bottomLeft:     "╙",
        left:           "║",
    }

//
// ─── DOUBLE HORIZONTAL BOX ──────────────────────────────────────────────────────
//

    /**
     * ```
     * ╒════╕
     * │    │
     * ╘════╛
     * ```
     */
    export const HDoubleVLightBox: Readonly<BoxFrameCharSet> = {
        topLeft:        "╒",
        top:            "═",
        topRight:       "╕",
        right:          "│",
        bottomRight:    "╛",
        bottom:         "═",
        bottomLeft:     "╘",
        left:           "│",
    }

//
// ─── CORNERS ────────────────────────────────────────────────────────────────────
//

    /**
     * ```
     * ┌    ┐
     *
     * └    ┘
     * ```
     */
    export const Corners: Readonly<BoxFrameCharSet> = {
        topLeft:        "┌",
        top:            WHITE_SPACE_CHARACTER,
        topRight:       "┐",
        right:          WHITE_SPACE_CHARACTER,
        bottomRight:    "┘",
        bottom:         WHITE_SPACE_CHARACTER,
        bottomLeft:     "└",
        left:           WHITE_SPACE_CHARACTER,
    }

//
// ─── LIGHT DASHED BOX ───────────────────────────────────────────────────────────
//

    /**
     * ```
     * ┍━━━━┑
     * │    │
     * ┕━━━━┙
     * ```
     */
    export const HHeavyVLightBox: Readonly<BoxFrameCharSet> = {
        topLeft:        "┍",
        top:            "━",
        topRight:       "┑",
        right:          "│",
        bottomRight:    "┙",
        bottom:         "━",
        bottomLeft:     "┕",
        left:           "│",
    }

// ────────────────────────────────────────────────────────────────────────────────
