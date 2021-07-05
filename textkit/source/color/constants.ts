
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
