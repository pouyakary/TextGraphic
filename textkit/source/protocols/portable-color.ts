
//
// The idea behind the divisions within this part of the
// system is to have
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { RGBColor }
        from "../color/rgb"

//
// ─── STANDARD COLORS ────────────────────────────────────────────────────────────
//

    export type PortableColor =
        | PortableLabeledForegroundColors
        | PortableLabeledBackgroundColors
        | RGBColor


//
// ─── PORTABLE STYLED COLORS ─────────────────────────────────────────────────────
//

    export type PortableLabeledForegroundColors =
        PortableLabeledColors

    export type PortableLabeledBackgroundColors =
        PortableLabeledColors | "transparent"

//
// ─── BASIC 16 LABELED COLORS ────────────────────────────────────────────────────
//

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
