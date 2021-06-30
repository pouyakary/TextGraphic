#! /usr/local/bin/node

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as repl
        from "repl";
    import * as util
        from "util"
    import * as TextKit
        from "../source"

//
// ─── TEXT KIT PATTERN ───────────────────────────────────────────────────────────
//

    function createThePattern ( ) {
        const patternLines = [
            "        ─┬┬┐─┐─┬┬┐─┐─┬┐─┬┬┐ ─┬┬┐─┐─┬┬┐─┐",
            "        ─┐│└┤ ├┐└┤│ ├┐└┼┐│└┤─┐│└┤ ├┐└┤│ ",
            "         └┴─└─└┴┬┼┼─┼┴┬┼┼┴┐└┬┼┴┬┼┐└┴┬┼┼─",
            "              ─┐│└┤ ├┐└┤│ ├┐└┼┐│└┤─┐│└┤ ",
            "       ─┬┬┐─┐─┬┼┼─┼─┼┼─┼┼┐└┴┬┼┼┴┐└┬┼┼─┼─",
            "    ──┐ │└┤ ├┐└┤│ ├┐└┼┐│└┤─┐│└┤ ├┐└┤│ ├┐",
            "      └─┴─└─└┼┬┼┴┐└┼┬┼┴┼─┼┐└┼┬┼─└┼┬┼┴┐└┼",
            "           ─┐│└┤ ├┐└┤│ ├┐└┼┐│└┤─┐│└┤ ├┐└",
            "            └┴─└─└┴┬┼┼─┼┴┬┼┼┴┐└┬┼┴┬┼┐└┴┬",
            "                 ─┐│└┤ ├┐└┤│ ├┐└┼┐│└┤─┐│",
            "          ─┬┬┐─┐─┬┼┼─┼─┼┼─┼┼┐└┴┬┼┼┴┐└┬┼┼",
            "         ─┐│└┤ ├┐└┤│ ├┐└┼┐│└┤─┐│└┤ ├┐└┤│",
            "          └┴─└─└┴─└┴─└┴─└┴┴─└─└┴─└─└┴─└┴",
        ]

        const pattern =
            new TextKit.ShapeView( patternLines, 0 )

        const title =
            TextKit.ShapeView.initWithText( "TextKit", 0 )
                .setANSITerminalStyle({
                    italic: true,
                })

        const pane =
            TextKit.PaneView.initWithTransparentBackground(
                parseInt( process.env.columns || "20" ), 5
            )

        pane.add( title, 4, 2, 1 )
        pane.add( pattern, title.width + 8, 0, 1 )

        console.log( pane.ANSITerminalForm )
    }

//
// ─── APPEND TO CONTEXT ──────────────────────────────────────────────────────────
//

    function appendToContext ( server: repl.REPLServer,
                             property: string,
                                value: any ) {
        //
        Object.defineProperty( server.context, property, {
            configurable:   false,
            enumerable:     true,
            value:          value
        })
    }

//
// ─── APPEND TEXT KIT TO THE REPL CONTEXT ────────────────────────────────────────
//

    function appendObjectToREPLContext ( object: any, server: repl.REPLServer ) {
        for ( const property of Object.getOwnPropertyNames( object ) ) {
            appendToContext( server, property, object[ property as never ] )
        }
    }

//
// ─── HEADER ─────────────────────────────────────────────────────────────────────
//

    function printTextKitHeader ( ) {
        const titleText =
            " TextKit Playground ───────"
        const title =
            ( TextKit.ANSITerminalItalicEscapeSequence
            + titleText
            + TextKit.ANSITerminalResetEscapeSequence
            )
        const restOfTheLine =
            "─".repeat( process.stdout.columns - titleText.length )
        console.log( restOfTheLine + title )
    }

    function setTerminalTitle ( title: string ) {
        process.stdout.write(
            String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
        )
    }


//
// ─── APPEND COMMAND: ────────────────────────────────────────────────────────────
//

    function defineExitCommand ( server: repl.REPLServer  ) {
        server.defineCommand( 'exit', function exit( ) {
            setTerminalTitle( "" )
            this.close( )
        })
    }

    function defineCleanCommand ( server: repl.REPLServer ) {
        server.defineCommand( 'clean', function clean( ) {
            console.clear( )
            this.displayPrompt( )
        })
    }

    function defineNoteCommand ( server: repl.REPLServer ) {
        server.defineCommand( 'note', function note( timpani ) {
            const note =
                TextKit.compileTimpaniToANSITerminalSequence( timpani )
            console.log( )
            console.log( note )
            console.log( )
            this.displayPrompt( )
        })
    }

    function definePowerCommand ( server: repl.REPLServer ) {
        server.defineCommand( 'power', function power ( ) {
            createThePattern( )
            this.displayPrompt( )
        })
    }

//
// ─── WRITER ─────────────────────────────────────────────────────────────────────
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
                styledLines[ i ] = "• " + lines[ i ]
            } else {
                styledLines[ i ] = "  " + lines[ i ]
            }
        }

        return styledLines.join("\n") + "\n"
    }

    function replWriter ( output: any ) {
        if ( typeof output === "object" ) {
            if ( "ANSITerminalForm" in output ) {
                return styleOutput( output.ANSITerminalForm )
            }
        }


        return styleOutput( util.inspect( output ) )
    }

//
// ─── APPLY CONTEXT ──────────────────────────────────────────────────────────────
//

    function setupREPLEnvironment ( server: repl.REPLServer ) {
        // context
        appendObjectToREPLContext( TextKit, server )
        appendObjectToREPLContext( Math, server )
        // commands
        defineExitCommand( server )
        defineCleanCommand( server )
        defineNoteCommand( server )
        definePowerCommand( server )
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    setTerminalTitle( "Pouya's TextKit Playground" )
    printTextKitHeader( )

    const server =
        repl.start({ prompt: '→ ', writer: replWriter })

    server.on( "reset", ( ) =>
        setupREPLEnvironment( server ))

    setupREPLEnvironment( server )

// ────────────────────────────────────────────────────────────────────────────────
