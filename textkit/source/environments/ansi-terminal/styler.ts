
//
// ─── ANSI TERMINAL STYLER IMPLEMENTATION ────────────────────────────────────────
//

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
