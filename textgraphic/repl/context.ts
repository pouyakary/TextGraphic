
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { REPLServer }
        from "repl"
    import * as TextKit
        from "../source"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    type StyleRenderer =
        TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer

//
// ─── APPEND TO CONTEXT ──────────────────────────────────────────────────────────
//

    function appendToContext ( server: REPLServer,
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

    function appendObjectToREPLContext ( object: any, server: REPLServer ) {
        for ( const property of Object.getOwnPropertyNames( object ) ) {
            appendToContext( server, property, object[ property as never ] )
        }
    }

//
// ─── APPEND STYLER TO THE CONTEXT ───────────────────────────────────────────────
//

    function appendStylerToContext ( server: REPLServer, $: StyleRenderer ) {
        appendToContext( server, "$", $ )
    }


//
// ─── API ────────────────────────────────────────────────────────────────────────
//

    export function setupREPLContext ( server: REPLServer, $: StyleRenderer ) {
        appendObjectToREPLContext( TextKit, server )
        appendObjectToREPLContext( Math, server )
        appendStylerToContext( server, $ )
    }

// ────────────────────────────────────────────────────────────────────────────────
