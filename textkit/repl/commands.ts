


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { REPLServer }
        from "repl"
    import * as TextKit
        from "../source"
    import { setTerminalTitle }
        from "./tools"

//
// ─── EXIT COMMAND ───────────────────────────────────────────────────────────────
//

    function defineExitCommand ( server: REPLServer  ) {
        server.defineCommand( 'exit', function exit( ) {
            setTerminalTitle( "" )
            this.close( )
        })
    }

//
// ─── CLEAN COMMAND ──────────────────────────────────────────────────────────────
//

    function defineCleanCommand ( server: REPLServer ) {
        server.defineCommand( 'clean', function clean( ) {
            console.clear( )
            this.displayPrompt( )
        })
    }

//
// ─── NOTE COMMAND ───────────────────────────────────────────────────────────────
//

    function defineNoteCommand ( server: REPLServer ) {
        server.defineCommand( 'note', function note( timpani ) {
            const note =
                TextKit.Compilers.compileTimpaniToANSITerminalSequence( timpani )
            console.log( )
            console.log( note )
            console.log( )
            this.displayPrompt( )
        })
    }

//
// ─── API ────────────────────────────────────────────────────────────────────────
//

    export function setupREPLCommands (  server: REPLServer ) {
        defineExitCommand( server )
        defineCleanCommand( server )
        defineNoteCommand( server )
    }

// ────────────────────────────────────────────────────────────────────────────────
