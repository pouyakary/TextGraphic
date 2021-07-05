
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
        dim:        boolean
    }

// ────────────────────────────────────────────────────────────────────────────────