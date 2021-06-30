
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { describe }
        from "mocha"
    import { runShapeViewTestSuite }
        from "./shape"

//
// ─── CORE ELEMENTS TEST SUITE ───────────────────────────────────────────────────
//

    export function runCoreElementsTestSuite ( ) {
        describe ( "Core Views", function ( ) {
            runShapeViewTestSuite( )
        })
    }

// ────────────────────────────────────────────────────────────────────────────────
