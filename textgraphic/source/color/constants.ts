
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PortableLabeledColors }
        from "../protocols"

//
// ─── LABELED COLORS ─────────────────────────────────────────────────────────────
//

    export const PORTABLE_LABELED_COLORS: PortableLabeledColors[ ] =[
        "black",
        "red",
        "green",
        "yellow",
        "blue",
        "magenta",
        "cyan",
        "white",
        "crimson",
        "bright-black",
        "bright-red",
        "bright-green",
        "bright-yellow",
        "bright-blue",
        "bright-magenta",
        "bright-cyan",
        "bright-white",
        "factory"
    ]

//
// ─── RANDOM ─────────────────────────────────────────────────────────────────────
//

    export function randomPortableLabeledColor ( ) {
        return PORTABLE_LABELED_COLORS[
            Math.floor( PORTABLE_LABELED_COLORS.length * Math.random( ) )
        ]
    }

// ────────────────────────────────────────────────────────────────────────────────
