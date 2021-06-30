
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { getLongestLineOfArray }
        from "./array"

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
        return ( size <= 0 ? "" : " ".repeat( Math.floor( size ) ) )
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

// ────────────────────────────────────────────────────────────────────────────────
