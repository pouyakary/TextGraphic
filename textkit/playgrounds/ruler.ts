
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextKit
        from "../source"
    import * as Tools
        from "./tools"

//
// ─── ENVIRONMENT ────────────────────────────────────────────────────────────────
//

    const styler =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── RULER ──────────────────────────────────────────────────────────────────────
//

    async function renderFrame ( size: number ) {
        //
        const ruler =
            TextKit.Shapes.createChartRuler( styler, {
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

        ruler.style = {
            textColor: "blue"
        }

        console.clear( )
        console.log( ruler.styledForm )

        //
        Tools.setCursorToBottomRight( "Pouya's TextKit: Rulers Demo ")
        await Tools.sleep( 50 )
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    Tools.runRenderLoop( 5, 20, renderFrame )

// ────────────────────────────────────────────────────────────────────────────────
