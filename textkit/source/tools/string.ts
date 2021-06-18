
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { getLongestLineOfArray }
        from "./array"

//
// ─── CREATE EMPTY STRING LINE ───────────────────────────────────────────────────
//

    export function createStringLine ( size: number ) {
        return " ".repeat( size )
    }

//
// ─── PERFECT LINE SIZE ──────────────────────────────────────────────────────────
//

    export function perfectLineToSize ( line: string, size: number ) {
        return line + createStringLine( size - line.length )
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

// ────────────────────────────────────────────────────────────────────────────────
