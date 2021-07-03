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
// ─── HEADER ─────────────────────────────────────────────────────────────────────
//

    function printTextKitHeader ( ) {
        const titleText =
            " TextKit Playground ───────"
        const title =
            ( TextKit.Environments.ANSITerminal.EscapeSequences.ANSITerminalItalicEscapeSequence
            + titleText
            + TextKit.Environments.ANSITerminal.EscapeSequences.ANSITerminalResetEscapeSequence
            )
        const restOfTheLine =
            "─".repeat( process.stdout.columns - titleText.length )
        console.log( restOfTheLine + title )
    }

//
// ─── APPLY CONTEXT ──────────────────────────────────────────────────────────────
//

    function setupREPLEnvironment ( server: repl.REPLServer ) {
        setupREPLContext( server )
        setupREPLCommands( server )
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    setTerminalTitle( "Pouya's TextKit Playground" )
    printTextKitHeader( )

    const server =
        repl.start({ prompt: '→ ', writer })

    server.on( "reset", ( ) =>
        setupREPLEnvironment( server ))

    setupREPLEnvironment( server )

// ────────────────────────────────────────────────────────────────────────────────
