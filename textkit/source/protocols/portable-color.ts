
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
        | BasicLabeledColors
        | RGBColor

//
// ─── BASIC 16 LABELED COLORS ────────────────────────────────────────────────────
//

    export type BasicLabeledColors =
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
