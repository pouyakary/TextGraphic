
//
// ─── ANSI TERMINAL STYLER IMPLEMENTATION ────────────────────────────────────────
//

    import { EMPTY_STRING }
        from "../../constants/characters"
    import { StyleRendererProtocol, PortableColor }
        from "../../protocols"
    import { ANSITerminalStyleSettings }
        from "./style"
    import { Subset }
        from "../../tools/types"
    import * as EscapeSequences
        from "./escape-sequences"

    import { generateStartingANSITerminalEscapeSequenceOfTerminalStyling
           , mergeTerminalStyleWithOptions
           }
        from "./style-diff-and-merge"

//
// ─── ANSI TERMINAL STYLE RENDERER ───────────────────────────────────────────────
//

    export class ANSITerminalStyleRenderer implements
        StyleRendererProtocol<ANSITerminalStyleSettings> {

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( ) { }

        //
        // ─── DEFAULT STYLE ───────────────────────────────────────────────
        //

            get defaultStyle ( ) {
                return {
                    textColor:          "factory" as PortableColor,
                    backgroundColor:    "factory" as PortableColor,
                    bold:               false,
                    italic:             false,
                    reversed:           false,
                    blink:              false,
                    underline:          false,
                    dim:                false,
                }
            }


        //
        // ─── RENDER STYLES ───────────────────────────────────────────────
        //

            public renderLeftStylingInfo ( style: ANSITerminalStyleSettings ): string {
                return generateStartingANSITerminalEscapeSequenceOfTerminalStyling( style )
            }

            public renderRightStylingInfo ( ): string {
                return EscapeSequences.Reset
            }

        //
        // ─── CANVAS INFORMATION ────────────────────────────────────────────
        //

            readonly rootRowLeftStylingInfo  = EscapeSequences.Reset
            readonly rootRowRightStylingInfo = EscapeSequences.Reset
            readonly rootRightStylingInfo    = EMPTY_STRING
            readonly rootLeftStylingInfo     = EMPTY_STRING

        //
        // ─── MERGER ──────────────────────────────────────────────────────
        //

            public margeNewStyleOptionsWithPreviosuStyleState (
                    style:      ANSITerminalStyleSettings,
                    options:    Subset<ANSITerminalStyleSettings>,
                ): ANSITerminalStyleSettings {

                //
                return mergeTerminalStyleWithOptions( style, options )
            }

        //
        // ─── ENCODER ─────────────────────────────────────────────────────
        //

            public encodeCharacterForStyledRender ( char: string ) {
                return char
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
