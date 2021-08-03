
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextGraphic
        from "../source"
    import * as util
        from "util"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    type StyleRenderer =
        TextGraphic.Environments.ANSITerminal.ANSITerminalStyleRenderer

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const BASELINE_INDICATOR_LEFT_SPACING =
        "• "
    const NORMAL_LEFT_SPACING =
        "  "

//
// ─── OUTPUT STYLER ──────────────────────────────────────────────────────────────
//

    function styleOutput ( output: string ) {
        const lines =
            output.split( "\n" )
        const styledLines =
            new Array<string> ( lines.length )
        const middleLine =
            Math.floor( lines.length / 2 )

        for ( let i = 0; i < lines.length; i++) {
            if ( middleLine === i ) {
                styledLines[ i ] = BASELINE_INDICATOR_LEFT_SPACING + lines[ i ]
            } else {
                styledLines[ i ] = NORMAL_LEFT_SPACING + lines[ i ]
            }
        }

        return styledLines.join( "\n" ) + "\n"
    }

//
// ─── CLASS STYLER ───────────────────────────────────────────────────────────────
//

    function styleClassInstanceForOutputPrint ( name: string ) {
        const styledName =
            ( TextGraphic.Environments.ANSITerminal.EscapeSequences.Bold
            + name + "{ }"
            + TextGraphic.Environments.ANSITerminal.EscapeSequences.Reset
            )
        return styleOutput ( styledName + " /instance" )
    }

//
// ─── ATOMIC TYPE STYLER ─────────────────────────────────────────────────────────
//

    function styleAtomicTypeForOutputPrint ( value: any ) {
        const styledType =
            ( TextGraphic.Environments.ANSITerminal.EscapeSequences.Bold
            + value.toString( )
            + TextGraphic.Environments.ANSITerminal.EscapeSequences.Reset
            )
        return styleOutput ( styledType + " /" + typeof value )
    }

//
// ─── VIEW PROTOCOL STYLER ───────────────────────────────────────────────────────
//

    // It's really important not to use any TextGraphic tool in printing
    // this because it should not allow errors to happen. This way
    // errors within the TextGraphic are not combined with the REPL.

    function styleViewProtocolForOutputPrint ( view: TextGraphic.ViewProtocol<any, any, any> ) {
        const ANSI_DIM =
            TextGraphic.Environments.ANSITerminal.EscapeSequences.Dim
        const ANSI_RESET =
            TextGraphic.Environments.ANSITerminal.EscapeSequences.Reset
        const lines =
            new Array<string> ( view.height + 2 )

        // box top
        lines[ 0 ] =
            ( NORMAL_LEFT_SPACING
            + ANSI_DIM + "┌" + "─".repeat( view.width ) + "┐" + ANSI_RESET
            )

        // middle lines
        const styledViewLines =
            view.styledForm.split( "\n" )
        for ( let row = 0; row < view.height; row++ ) {
            const startOfLine =
                ( row === view.baseline
                    ? BASELINE_INDICATOR_LEFT_SPACING
                    : NORMAL_LEFT_SPACING
                    )
            const middleOfLine =
                ( ANSI_DIM + "│" + ANSI_RESET
                + styledViewLines[ row ]!
                + ANSI_DIM + "│" + ANSI_RESET
                )
            const endOfLine =
                ( row === view.baseline
                    ? " /" + view.constructor.name
                    : ""
                    )
            lines[ row + 1 ] =
                startOfLine + middleOfLine + endOfLine
        }

        // box bottom
        lines[ view.height + 1 ] =
            ( NORMAL_LEFT_SPACING
            + ANSI_DIM + "└" + "─".repeat( view.width ) + "┘" + ANSI_RESET
            )

        //
        return lines.join( "\n" )
    }

//
// ─── WRITER ─────────────────────────────────────────────────────────────────────
//

    export function writer ( output: any, $: StyleRenderer ) {
        process.stdout.write( TextGraphic.Environments.ANSITerminal.EscapeSequences.Reset )

        if ( typeof output === "number" ) {
            return styleAtomicTypeForOutputPrint( output )
        }

        if ( typeof output === "string" ) {
            return styleAtomicTypeForOutputPrint( '"' + output + '"' )
        }

        if ( typeof output === "boolean" ) {
            return styleAtomicTypeForOutputPrint( '"' + output + '"' )
        }


        if ( typeof output === "object" ) {
            if ( "styledForm" in output && "styleRenderer" in output && output.styleRenderer === $ ) {
                return styleViewProtocolForOutputPrint( output )
            }
            if ( "constructor" in output && "name" in output.constructor ) {
                const name =
                    output.constructor.name
                if ( name !== "TypeError" || name !== "Error" ) {
                    return styleClassInstanceForOutputPrint( output.constructor.name )
                }
            }
        }

        return styleOutput( util.inspect( output ) )
    }

// ────────────────────────────────────────────────────────────────────────────────
