
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PortableLabeledBackgroundColors, PortableLabeledColors, PortableLabeledForegroundColors }
        from "../protocols"

//
// ─── LABELED COLORS ─────────────────────────────────────────────────────────────
//

    const BASIC_LABELED_COLORS: PortableLabeledColors[ ] =[
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
// ─── BACKGROUND AND FOREGROUND COLORS ───────────────────────────────────────────
//

    export const PORTABLE_LABELED_FOREGROUND_COLORS: PortableLabeledForegroundColors[ ] =
        BASIC_LABELED_COLORS

    export const PORTABLE_LABELED_BACKGROUND_COLORS: PortableLabeledBackgroundColors[ ] =
        [ ...PORTABLE_LABELED_FOREGROUND_COLORS, "transparent" ]

//
// ─── RANDOM ─────────────────────────────────────────────────────────────────────
//

    export function randomPortableForegroundLabeledColor ( ) {
        return PORTABLE_LABELED_FOREGROUND_COLORS[
            Math.floor( PORTABLE_LABELED_FOREGROUND_COLORS.length * Math.random( ) )
        ]
    }

    export function randomPortableBackgroundLabeledColor ( ) {
        return PORTABLE_LABELED_BACKGROUND_COLORS[
            Math.floor( PORTABLE_LABELED_BACKGROUND_COLORS.length * Math.random( ) )
        ]
    }

// ────────────────────────────────────────────────────────────────────────────────
