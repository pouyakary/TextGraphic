
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


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
            TextKit.Shapes.Rulers.createChartRuler( styler, {
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
            color: "blue"
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
