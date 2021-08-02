
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
// ─── RENDERER ───────────────────────────────────────────────────────────────────
//

    const renderer =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── RENDER TRIANGLE ────────────────────────────────────────────────────────────
//

    async function renderTriangle ( f: number ) {
        const triangle = TextKit.Shapes.Graph.create({
            renderer,
            style: { color: "blue" },
            width: process.stdout.columns,
            height: process.stdout.rows - 1,
            formula: ( iX, iY ) => {
                const x =
                    iX * Math.cos( f ) - iY * Math.sin( f )
                const y =
                    iY * Math.cos( f ) + iX * Math.sin( f )
                const h = 3
                const hw = 0.4
                const dy = 0.6
                return (
                    y + dy < ( x + hw ) * h &&
                    y + dy < ( -x + hw ) * h &&
                    y + dy > 0
                )
            }
        })

        console.clear( )
        console.log( triangle.styledForm )
        await Tools.sleep( 300 )
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    Tools.runRenderLoop( 0, 180, renderTriangle )

// ────────────────────────────────────────────────────────────────────────────────
