
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { describe }
        from "mocha"
    import { runSpacedBoxTestSuite }
        from "./spaced-box"

//
// ─── CORE ELEMENTS TEST SUITE ───────────────────────────────────────────────────
//

    export function runCoreElementsTestSuite ( ) {
        describe ( "Core Library Elements", function ( ) {
            runSpacedBoxTestSuite( )
        })
    }

// ────────────────────────────────────────────────────────────────────────────────
