

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { describe }
        from "mocha"
    import { runMonoTextJustificationTestSuite }
        from "./mono"

//
// ─── TEXT JUSTIFICATION LAYOUT TEST SUITE ───────────────────────────────────────
//

    export function runTextJustificationLayoutTestSuite ( ) {
        describe ( "Text Justification Layout", function ( ) {
            runMonoTextJustificationTestSuite( )
        })
    }

// ────────────────────────────────────────────────────────────────────────────────
