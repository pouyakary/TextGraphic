#! /usr/local/bin/node

//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as repl
        from "repl";
    import * as TextGraphic
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
        new TextGraphic.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── HEADER ─────────────────────────────────────────────────────────────────────
//

    function printTextGraphicHeader ( ) {
        const titleText =
            " TextGraphic Playground ───────"
        const title =
            ( TextGraphic.Environments.ANSITerminal.EscapeSequences.Italic
            + titleText
            + TextGraphic.Environments.ANSITerminal.EscapeSequences.Reset
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

    setTerminalTitle( "Pouya's TextGraphic Playground" )
    printTextGraphicHeader( )

    const server =
        repl.start({
            prompt: '→ ',
            writer: input => writer( input, $ )
        })

    server.on( "reset", ( ) =>
        setupREPLEnvironment( server ))

    setupREPLEnvironment( server )

// ────────────────────────────────────────────────────────────────────────────────
