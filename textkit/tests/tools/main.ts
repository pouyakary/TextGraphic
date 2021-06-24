
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { describe }
        from "mocha"
    import { runStringToolsTestSuite }
        from "./string"
    import { runTextJustifierToolsTestSuite }
        from "./justifier"

//
// ─── TOOLS TEST SUITE ───────────────────────────────────────────────────────────
//

    export function runToolsTestSuite ( ) {
        describe ( "Tools", function ( ) {
            runStringToolsTestSuite( )
            runTextJustifierToolsTestSuite( )
        })
    }

// ────────────────────────────────────────────────────────────────────────────────
