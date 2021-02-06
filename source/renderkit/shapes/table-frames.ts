
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { BoxFrameCharSet }
        from "./box-frames"

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
        topLeft:            " ",
        top:                " ",
        topRight:           " ",
        right:              " ",
        bottomRight:        " ",
        bottom:             " ",
        bottomLeft:         " ",
        left:               " ",
        horizontalMiddle:   "─",
        verticalMiddle:     "│",
        middleJoins:        "┼",
        leftJoins:          "─",
        rightJoins:         "─",
        topJoins:           "✤",
        bottomJoins:        "✤",
    }

// ────────────────────────────────────────────────────────────────────────────────
