

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextKit
        from "../source"
    import * as util
        from "util"

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
            ( TextKit.Environments.ANSITerminalBoldEscapeSequence
            + name + "{ }"
            + TextKit.Environments.ANSITerminalResetEscapeSequence
            )
        return styleOutput ( styledName + " /instance" )
    }

//
// ─── ATOMIC TYPE STYLER ─────────────────────────────────────────────────────────
//

    function styleAtomicTypeForOutputPrint ( value: any ) {
        const styledType =
            ( TextKit.Environments.ANSITerminalBoldEscapeSequence
            + value.toString( )
            + TextKit.Environments.ANSITerminalResetEscapeSequence
            )
        return styleOutput ( styledType + " /" + typeof value )
    }

//
// ─── VIEW PROTOCOL STYLER ───────────────────────────────────────────────────────
//

    // It's really important not to use any TextKit tool in printing
    // this because it should not allow errors to happen. This way
    // errors within the TextKit are not combined with the REPL.

    function styleViewProtocolForOutputPrint ( view: TextKit.ViewProtocol<never, never> ) {
        const ANSI_WHITE =
            "\x1b[37m"
        const ANSI_RESET =
            "\x1b[0m"
        const lines =
            new Array<string> ( view.height + 2 )

        // box top
        lines[ 0 ] =
            ( NORMAL_LEFT_SPACING
            + ANSI_WHITE + "┌" + "─".repeat( view.width ) + "┐" + ANSI_RESET
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
                ( ANSI_WHITE + "│" + ANSI_RESET
                + styledViewLines[ row ]!
                + ANSI_WHITE + "│" + ANSI_RESET
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
            + ANSI_WHITE + "└" + "─".repeat( view.width ) + "┘" + ANSI_RESET
            )

        //
        return lines.join( "\n" )
    }

//
// ─── WRITER ─────────────────────────────────────────────────────────────────────
//

    export function writer ( output: any ) {
        process.stdout.write( TextKit.Environments.ANSITerminalResetEscapeSequence )

        if ( typeof output === "number" ) {
            return styleAtomicTypeForOutputPrint( output )
        }

        if ( typeof output === "string" ) {
            return styleAtomicTypeForOutputPrint( '"' + output + '"' )
        }

        if ( typeof output === "object" ) {
            if ( "styledForm" in output ) {
                return styleViewProtocolForOutputPrint( output )
            }
            if ( "constructor" in output ) {
                if ( "name" in output.constructor ) {
                    const name =
                        output.constructor.name
                    if ( name !== "TypeError" || name !== "Error" ) {
                        return styleClassInstanceForOutputPrint( output.constructor.name )
                    }
                }
            }
        }

        return styleOutput( util.inspect( output ) )
    }

// ────────────────────────────────────────────────────────────────────────────────
