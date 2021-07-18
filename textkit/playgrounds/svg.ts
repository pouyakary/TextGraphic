
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
    import { homedir }
        from "os"
    import * as path
        from "path"
    import * as fs
        from "fs"

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const SVG_RENDERER_SETTINGS = {
        fontSize: 13, fontFamily: "monospace"
    }

//
// ─── STYLERS ────────────────────────────────────────────────────────────────────
//

    const terminalStyler =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

    const svgOptimizingStyler =
        new TextKit.Environments.SVG.SVGStyleRenderer( true, SVG_RENDERER_SETTINGS )

    const svgInliningStyler =
        new TextKit.Environments.SVG.SVGStyleRenderer( false, SVG_RENDERER_SETTINGS )

//
// ─── RENDER FOR PREVIEW ─────────────────────────────────────────────────────────
//

    const terminalRender =
        Tools.createAGoodModel( terminalStyler )
    console.log( terminalRender.styledForm )

//
// ─── SVG VERSIONS ───────────────────────────────────────────────────────────────
//

    const normalSVG =
        Tools.createAGoodModel( svgInliningStyler )
    const optimizedSVG =
        Tools.createAGoodModel( svgOptimizingStyler )

    const saveToDesktop = ( name: string, model: TextKit.ViewProtocol<any, any> ) =>
        fs.writeFileSync(
            path.join( homedir( ), "Desktop", name ),
            model.styledForm,
        )

    saveToDesktop( "normal.svg", normalSVG )
    saveToDesktop( "optimized.svg", optimizedSVG )

// ────────────────────────────────────────────────────────────────────────────────
