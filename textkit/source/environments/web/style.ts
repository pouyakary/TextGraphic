

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PortableColor, PortableStyle }
        from "../../protocols"

//
// ─── EXPORT TYPES ───────────────────────────────────────────────────────────────
//

    export type WebTextDecorationLineStyle =
        "wavy" | "dashed" | "solid"

    export type WebTextDecorationLineType =
        "overline" | "line-through" | "underline" | "none"

//
// ─── STYLE ──────────────────────────────────────────────────────────────────────
//

    export interface WebStyleSettings extends PortableStyle<PortableColor> {
        line:           WebTextDecorationLineType
        lineStyle:      WebTextDecorationLineStyle
    }

// ────────────────────────────────────────────────────────────────────────────────
