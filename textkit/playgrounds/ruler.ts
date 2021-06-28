
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextKit
        from "../source"
    import * as Tools
        from "./tools"

//
// ─── RULER ──────────────────────────────────────────────────────────────────────
//

    async function renderFrame ( size: number ) {
        //
        const ruler =
            TextKit.createChartRuler({
                size: size,
                facing: TextKit.Direction.Right,
                verticalGutterSize: 5,
                unit: 5,
                chars: {
                    originChar:     "┐",
                    middleChar:     "│",
                    separatorChar:  "┤",
                }
            })
            .setANSITerminalStyle({
                foregroundColor: TextKit.ANSITerminalForegroundColor.Blue
            })

        console.clear( )
        console.log( ruler.ANSITerminalForm )

        //
        Tools.setCursorToBottomRight( "Pouya's TextKit: Rulers Demo ")
        await Tools.sleep( 50 )
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    Tools.runRenderLoop( 5, 20, renderFrame )

// ────────────────────────────────────────────────────────────────────────────────
