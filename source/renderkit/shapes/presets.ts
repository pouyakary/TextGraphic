
//
// ─── TYPE ───────────────────────────────────────────────────────────────────────
//

    export interface BorderBoxCharacterSet {
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

    export const BracketPreset: BorderBoxCharacterSet = {
        topLeft:        "┌",
        top:            " ",
        topRight:       "┐",
        right:          "│",
        bottomRight:    "┘",
        bottom:         " ",
        bottomLeft:     "└",
        left:           "│",
    }

//
// ─── ABSOLUTE ───────────────────────────────────────────────────────────────────
//

    export const AbsolutePreset: BorderBoxCharacterSet = {
        topLeft:        "⎢" ,
        top:            " " ,
        topRight:       "⎥" ,
        right:          "⎥" ,
        bottomRight:    "⎥" ,
        bottom:         " " ,
        bottomLeft:     "⎢" ,
        left:           "⎢" ,
    }

//
// ─── FLOOR ──────────────────────────────────────────────────────────────────────
//

    export const FloorPreset: BorderBoxCharacterSet = {
        topLeft:        "⎜",
        top:            " ",
        topRight:       "⎟",
        right:          "⎟",
        bottomRight:    "⎦",
        bottom:         " ",
        bottomLeft:     "⎣",
        left:           "⎜",
    }

//
// ─── CEILING ────────────────────────────────────────────────────────────────────
//

    export const CeilingPreset: BorderBoxCharacterSet = {
        topLeft:        "⎡",
        top:            " ",
        topRight:       "⎤",
        right:          "⎟",
        bottomRight:    "⎥",
        bottom:         " ",
        bottomLeft:     "⎢",
        left:           "⎢",
    }

//
// ─── PARENTHESIS ────────────────────────────────────────────────────────────────
//

    export const ParenthesisPreset: BorderBoxCharacterSet = {
        topLeft:        "⎛",
        top:            " ",
        topRight:       "⎞",
        right:          "⎟",
        bottomRight:    "⎠",
        bottom:         " ",
        bottomLeft:     "⎝",
        left:           "⎜",
    }

//
// ─── LIGHT BOX ──────────────────────────────────────────────────────────────────
//

    export const LightBoxPreset: BorderBoxCharacterSet = {
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
// ─── CORNERS ────────────────────────────────────────────────────────────────────
//

    export const CornersPreset: BorderBoxCharacterSet = {
        topLeft:        "┌",
        top:            " ",
        topRight:       "┐",
        right:          " ",
        bottomRight:    "┘",
        bottom:         " ",
        bottomLeft:     "└",
        left:           " ",
    }

// ────────────────────────────────────────────────────────────────────────────────
