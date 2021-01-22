
//
// ─── TYPE ───────────────────────────────────────────────────────────────────────
//

    export interface BoxCharSet {
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

    export const BracketPreset: BoxCharSet = {
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

    export const AbsolutePreset: BoxCharSet = {
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

    export const FloorPreset: BoxCharSet = {
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

    export const CeilingPreset: BoxCharSet = {
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

    export const ParenthesisPreset: BoxCharSet = {
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

    export const LightBoxPreset: BoxCharSet = {
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

    export const CornersPreset: BoxCharSet = {
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
