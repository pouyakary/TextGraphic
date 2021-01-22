
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

    export const BracketPreset: BoxFrameCharSet = {
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

    export const AbsolutePreset: BoxFrameCharSet = {
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

    export const FloorPreset: BoxFrameCharSet = {
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

    export const CeilingPreset: BoxFrameCharSet = {
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

    export const ParenthesisPreset: BoxFrameCharSet = {
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

    export const LightBoxPreset: BoxFrameCharSet = {
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

    export const CornersPreset: BoxFrameCharSet = {
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
