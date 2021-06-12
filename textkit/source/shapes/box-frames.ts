
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
    export const BracketPreset: BoxFrameCharSet = {
        topLeft:        "⎡",
        top:            " ",
        topRight:       "⎤",
        right:          "⎟",
        bottomRight:    "⎦",
        bottom:         " ",
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

    /**
     * ```
     * ⎜    ⎟
     * ⎜    ⎟
     * ⎣    ⎦
     * ```
     */
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

    /**
     * ```
     * ⎡    ⎤
     * ⎜    ⎟
     * ⎜    ⎟
     * ```
     */
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

    /**
     * ```
     * ⎛    ⎞
     * ⎜    ⎟
     * ⎝    ⎠
     * ```
     */
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

    /**
     * ```
     * ┌────┐
     * │    │
     * └────┘
     * ```
     */
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
// ─── LIGHT BOX WITH CORNER RADIUS ───────────────────────────────────────────────
//

    /**
     * ```
     * ╭────╮
     * │    │
     * ╰────╯
     * ```
     */
    export const LightBoxWithRoundCornerPreset: BoxFrameCharSet = {
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
    export const HeavyBoxPreset: BoxFrameCharSet = {
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
    export const DoubleLineBoxPreset: BoxFrameCharSet = {
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
    export const HLightVDoubleBoxPreset: BoxFrameCharSet = {
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
    export const HDoubleVLightBoxPreset: BoxFrameCharSet = {
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
    export const HHeavyVLightBoxPreset: BoxFrameCharSet = {
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
