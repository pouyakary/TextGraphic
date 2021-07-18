
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { getLongestLineOfArray }
        from "./array"
    import { WHITE_SPACE_CHARACTER, EMPTY_STRING }
        from "../constants/characters"

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const END_OF_LINE_REGEXP =
        /(?:\n\r?)|(?:\r\n?)/g
    const END_OF_LINE_CHARACTERS =
        /\n|\r/g

//
// ─── CREATE EMPTY STRING LINE ───────────────────────────────────────────────────
//

    export function createEmptyStringLine ( size: number ) {
        return ( size <= 0
            ? EMPTY_STRING
            : WHITE_SPACE_CHARACTER.repeat( Math.floor( size ) )
            )
    }

//
// ─── PERFECT LINE SIZE ──────────────────────────────────────────────────────────
//

    export function perfectLineToSize ( line: string, size: number ) {
        return line + createEmptyStringLine( size - line.length )
    }

//
// ─── UNIFY LINE SPACES ──────────────────────────────────────────────────────────
//

    export function unifyLineSpaces ( lines: string[ ] ) {
        const longestLine =
            getLongestLineOfArray( lines )
        const perfectLines =
            lines.map( line =>
                perfectLineToSize( line, longestLine )
            )
        return perfectLines
    }

//
// ─── BREAK LINES ────────────────────────────────────────────────────────────────
//

    export function breakStringIntoLines ( text: string ) {
        return text.split( END_OF_LINE_REGEXP )
    }

//
// ─── IS MULTI LINE ──────────────────────────────────────────────────────────────
//

    export function includesLineBreak ( text: string ): boolean {
        return END_OF_LINE_CHARACTERS.test( text )
    }

//
// ─── REPLACE CHARACTERS ─────────────────────────────────────────────────────────
//

    export function replaceCharacters ( text: string, replacer: ( char: string ) => string ): string {
        const size =
            text.length
        const newText =
            new Array( size )
        for ( let i = 0; i < size; i++ ) {
            newText[ i ] = replacer( text[ i ] )
        }
        return newText.join( EMPTY_STRING )
    }

// ────────────────────────────────────────────────────────────────────────────────
