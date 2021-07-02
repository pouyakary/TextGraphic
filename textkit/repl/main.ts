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
    import { EMPTY_STRING, LINE_BREAK_CHARACTER }
        from "../source/constants/characters"

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
// ─── APPEND STYLER TO THE CONTEXT ───────────────────────────────────────────────
//

    function appendStylerToContext ( server: repl.REPLServer ) {
        appendToContext( server, "$", new TextKit.ANSITerminalStyleRenderer( ) )
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
            setTerminalTitle( EMPTY_STRING )
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

//
// ─── WRITER ─────────────────────────────────────────────────────────────────────
//

    function styleOutput ( output: string ) {
        const lines =
            output.split( LINE_BREAK_CHARACTER )
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

        return styledLines.join( LINE_BREAK_CHARACTER ) + LINE_BREAK_CHARACTER
    }

    function replWriter ( output: any ) {
        process.stdout.write( TextKit.ANSITerminalResetEscapeSequence )
        if ( typeof output === "object" ) {
            if ( "styledForm" in output ) {
                return styleOutput( output.styledForm )
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
        appendStylerToContext( server )
        // commands
        defineExitCommand( server )
        defineCleanCommand( server )
        defineNoteCommand( server )
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
