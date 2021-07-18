
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── ANSI TERMINAL STYLER IMPLEMENTATION ────────────────────────────────────────
//

    import { StyleRendererProtocol, PortableColor }
        from "../../protocols"
    import { ANSITerminalStyleSettings }
        from "./style"
    import * as EscapeSequences
        from "./escape-sequences"

    import { generateStartingANSITerminalEscapeSequenceOfTerminalStyling
           , mergeTerminalStyleWithOptions
           }
        from "./style-diff-and-merge"

    import { LINE_BREAK_CHARACTER }
        from "../../constants/characters"

//
// ─── ANSI TERMINAL STYLE RENDERER ───────────────────────────────────────────────
//

    export class ANSITerminalStyleRenderer implements
        StyleRendererProtocol<PortableColor, ANSITerminalStyleSettings> {

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( ) { }

        //
        // ─── DEFAULT STYLE ───────────────────────────────────────────────
        //

            get defaultStyle ( ) {
                return {
                    color:              "factory" as PortableColor,
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
        // ─── MERGER ──────────────────────────────────────────────────────
        //

            public margeNewStyleOptionsWithPreviosuStyleState (
                    style:      ANSITerminalStyleSettings,
                    options:    Partial<ANSITerminalStyleSettings>,
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

        //
        // ─── RENDER ROOT LINES ───────────────────────────────────────────
        //

            public wrapRootLinesAndFinalizeRender ( width: number, lines: string[ ] ): string {
                const height =
                    lines.length
                const result =
                    new Array<string> ( height )
                for ( let i = 0; i < height; i++ ) {
                    result[ i ] = EscapeSequences.Reset + lines[ i ]
                }

                return result.join( LINE_BREAK_CHARACTER ) + EscapeSequences.Reset
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
