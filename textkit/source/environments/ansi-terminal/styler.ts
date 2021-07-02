
//
// ─── ANSI TERMINAL STYLER IMPLEMENTATION ────────────────────────────────────────
//

    import { EMPTY_STRING } from "../../constants/characters"
import { StyleRendererProtocol }
        from "../../protocols/style-renderer-protocol"
    import { Subset }
        from "../../tools/types"

    import { ANSITerminalStyling, getDefaultTerminalStyle
           , generateStartingANSITerminalEscapeSequenceOfTerminalStyling
           , ANSITerminalResetEscapeSequence, mergeTerminalStyleWithOptions
           }
        from "./ansi-terminal"

//
// ─── ANSI TERMINAL STYLE RENDERER ───────────────────────────────────────────────
//

    export class ANSITerminalStyleRenderer implements StyleRendererProtocol<ANSITerminalStyling> {

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( ) { }

        //
        // ─── DEFAULT STYLE ───────────────────────────────────────────────
        //

            get defaultStyle ( ) {
                return getDefaultTerminalStyle( )
            }

        //
        // ─── RENDER STYLES ───────────────────────────────────────────────
        //

            public renderLeftStylingInfo ( style: ANSITerminalStyling ): string {
                return generateStartingANSITerminalEscapeSequenceOfTerminalStyling( style )
            }

            public renderRightStylingInfo ( ): string {
                return ANSITerminalResetEscapeSequence
            }

        //
        // ─── CANVAS INFORMATION ────────────────────────────────────────────
        //

            readonly rootRowLeftStylingInfo  = ANSITerminalResetEscapeSequence
            readonly rootRowRightStylingInfo = ANSITerminalResetEscapeSequence
            readonly rootRightStylingInfo    = EMPTY_STRING
            readonly rootLeftStylingInfo     = EMPTY_STRING

        //
        // ─── MERGER ──────────────────────────────────────────────────────
        //

            public margeNewStyleOptionsWithPreviosuStyleState (
                    style:      ANSITerminalStyling,
                    options:    Subset<ANSITerminalStyling>,
                ): ANSITerminalStyling {

                //
                return mergeTerminalStyleWithOptions( style, options )
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
