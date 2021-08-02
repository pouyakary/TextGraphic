
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { BoxFrameCharSet }
        from "./box-frames"
    import { WHITE_SPACE_CHARACTER }
        from "../constants/characters"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export interface TableCharSet extends BoxFrameCharSet {
        horizontalMiddle:   string
        verticalMiddle:     string
        middleJoins:        string
        leftJoins:          string
        topJoins:           string
        rightJoins:         string
        bottomJoins:        string
    }

//
// ─── DEFAULT ────────────────────────────────────────────────────────────────────
//

    export const LightTablePreset: TableCharSet = {
        topLeft:            "┌",
        top:                "─",
        topRight:           "┐",
        right:              "│",
        bottomRight:        "┘",
        bottom:             "─",
        bottomLeft:         "└",
        left:               "│",
        horizontalMiddle:   "─",
        verticalMiddle:     "│",
        middleJoins:        "┼",
        leftJoins:          "├",
        topJoins:           "┬",
        rightJoins:         "┤",
        bottomJoins:        "┴",
    }

//
// ─── STYLISH KARY ───────────────────────────────────────────────────────────────
//

    export const KaryGothic: TableCharSet = {
        topLeft:            WHITE_SPACE_CHARACTER,
        top:                WHITE_SPACE_CHARACTER,
        topRight:           WHITE_SPACE_CHARACTER,
        right:              WHITE_SPACE_CHARACTER,
        bottomRight:        WHITE_SPACE_CHARACTER,
        bottom:             WHITE_SPACE_CHARACTER,
        bottomLeft:         WHITE_SPACE_CHARACTER,
        left:               WHITE_SPACE_CHARACTER,
        horizontalMiddle:   "─",
        verticalMiddle:     "│",
        middleJoins:        "┼",
        leftJoins:          "─",
        rightJoins:         "─",
        topJoins:           "✤",
        bottomJoins:        "✤",
    }

//
// ─── HEAVY TABLE ────────────────────────────────────────────────────────────────
//

    export const HeavyTablePreset: TableCharSet = {
        topLeft:            "┏",
        top:                "━",
        topRight:           "┓",
        right:              "┃",
        bottomRight:        "┛",
        bottom:             "━",
        bottomLeft:         "┗",
        left:               "┃",
        horizontalMiddle:   "━",
        verticalMiddle:     "┃",
        middleJoins:        "╋",
        leftJoins:          "┣",
        topJoins:           "┳",
        rightJoins:         "┫",
        bottomJoins:        "┻",
    }

//
// ─── DOUBLE LINE TABLE ──────────────────────────────────────────────────────────
//

    export const DoubleLineTablePreset: TableCharSet = {
        topLeft:            "╔",
        top:                "═",
        topRight:           "╗",
        right:              "║",
        bottomRight:        "╝",
        bottom:             "═",
        bottomLeft:         "╚",
        left:               "║",
        horizontalMiddle:   "═",
        verticalMiddle:     "║",
        middleJoins:        "╬",
        leftJoins:          "╠",
        topJoins:           "╦",
        rightJoins:         "╣",
        bottomJoins:        "╩",
    }

//
// ─── LIGHT TABLE WITH ROUNDED CORNERS ───────────────────────────────────────────
//

    export const LightTableWithRoundCornersPreset: TableCharSet = {
        topLeft:            "╭",
        top:                "─",
        topRight:           "╮",
        right:              "│",
        bottomRight:        "╯",
        bottom:             "─",
        bottomLeft:         "╰",
        left:               "│",
        horizontalMiddle:   "─",
        verticalMiddle:     "│",
        middleJoins:        "┼",
        leftJoins:          "├",
        topJoins:           "┬",
        rightJoins:         "┤",
        bottomJoins:        "┴",
    }

// ────────────────────────────────────────────────────────────────────────────────
