
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { describe }
        from "mocha"
    import { runTextJustificationLayoutTestSuite }
        from "./text-justification/main"

//
// ─── LAYOUTS TEST SUITE ─────────────────────────────────────────────────────────
//

    export function runLayoutsTestSuite ( ) {
        describe ( "Layouts", function ( ) {
            runTextJustificationLayoutTestSuite( )
        })
    }

// ────────────────────────────────────────────────────────────────────────────────
