
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PortableColor, PortableStyle }
        from "../../protocols"

//
// ─── STYLE ──────────────────────────────────────────────────────────────────────
//

    export interface ANSITerminalStyleSettings extends PortableStyle<PortableColor> {
        reversed:   boolean
        blink:      boolean
        dim:        boolean
    }

// ────────────────────────────────────────────────────────────────────────────────
