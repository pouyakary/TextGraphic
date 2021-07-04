#! /usr/local/bin/node

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as repl
        from "repl";
    import * as TextKit
        from "../source"

    import { writer }
        from "./writer"
    import { setupREPLContext }
        from "./context"
    import { setupREPLCommands }
        from "./commands"

    import { setTerminalTitle }
        from "./tools"

//
// ─── ENVIRONMENT ────────────────────────────────────────────────────────────────
//

    const $ =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── HEADER ─────────────────────────────────────────────────────────────────────
//

    function printTextKitHeader ( ) {
        const titleText =
            " TextKit Playground ───────"
        const title =
            ( TextKit.Environments.ANSITerminal.EscapeSequences.Italic
            + titleText
            + TextKit.Environments.ANSITerminal.EscapeSequences.Reset
            )
        const restOfTheLine =
            "─".repeat( process.stdout.columns - titleText.length )
        console.log( restOfTheLine + title )
    }

//
// ─── APPLY CONTEXT ──────────────────────────────────────────────────────────────
//

    function setupREPLEnvironment ( server: repl.REPLServer ) {
        setupREPLContext( server, $ )
        setupREPLCommands( server )
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    setTerminalTitle( "Pouya's TextKit Playground" )
    printTextKitHeader( )

    const server =
        repl.start({
            prompt: '→ ',
            writer: input => writer( input, $ )
        })

    server.on( "reset", ( ) =>
        setupREPLEnvironment( server ))

    setupREPLEnvironment( server )

// ────────────────────────────────────────────────────────────────────────────────
