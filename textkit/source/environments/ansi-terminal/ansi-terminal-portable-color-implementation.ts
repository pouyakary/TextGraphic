
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PortableColor }
        from "../../protocols"
    import * as EscapeSequences
        from "./escape-sequences"

//
// ─── PORTABLE COLOR IMPLEMENTATION ──────────────────────────────────────────────
//

    export function convertPortableColorToANSITerminalColor (
            color:          PortableColor,
            isBackground:   boolean
        ): string {
        //

        if ( typeof color === "string" ) {
            if ( isBackground ) {
                return EscapeSequences.getBackgroundColorEscapeSequenceForLabledColor( color )
            } else {
                return EscapeSequences.getForegroundColorEscapeSequenceForLabledColor( color )
            }
        }

        return EscapeSequences.formatColorTo24BitANSITerminalColor( color, isBackground )
    }

// ────────────────────────────────────────────────────────────────────────────────
