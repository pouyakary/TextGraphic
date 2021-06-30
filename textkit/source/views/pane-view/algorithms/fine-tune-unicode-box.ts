
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PaneView }
        from "../main"

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const LIGHT_CONNECTIONS_FROM_LEFT =
        "┌┬├┼└┴┎┰┠╂┖┸╾┱┭┽╀╁┟╅┞╉╃┹┵─┈┄╰╭"
    const HEAVY_CONNECTIONS_FROM_LEFT =
        "┏┳┣╋┗┻┍┯┝┿┕┷╼┮┲┡┾╆╈╇╄╊┢┶┺━┉┅"
    const LIGHT_CONNECTIONS_FROM_TOP =
        "┌┬┐├┼┤┍┯┑┝┿┥╒╤╕╞╪╡╿┮┭┡╀┽┾┩╇┞╄╃┦│┊┆╎╮╭╷"
    const HEAVY_CONNECTIONS_FROM_TOP =
        "┏┳┓┣╋┫┎┰┒┠╂┨╽┱┲╁┟╆╈╅╉╊┢┪┃┋┇╏╻"
    const LIGHT_CONNECTIONS_FROM_RIGHT =
        "┬┐┼┤┴┘┰┒╂┨┸┚╥╖╫╢╨╜╼┮┲╀╁┾╆┧╄╊┦┶┺╯╮─┈┄"
    const HEAVY_CONNECTIONS_FROM_RIGHT =
        "┳┓╋┫┻┛┯┑┿┥┷┙╾┱┭┽┩╈╇╅╉╃┹┪━┉┅"
    const LIGHT_CONNECTIONS_FROM_BOTTOM =
        "├┼┤└┴┘┝┿┥┕┷┙╽┽╁┾┟╆╈╅┧┵┶┢╵│┊┆╎"
    const HEAVY_CONNECTIONS_FROM_BOTTOM =
        "┣╋┫┗┻┛┠╂┨┖┸┚╿┡╀┩╇┞╄╉╃╊┦┹┺╹┃╏┋┇"

    export const CHANGEABLE_CHARACTERS_FOR_UNICODE_TUNNING =
        "┌┬┐├┼┤└┴┘┏┳┓┣╋┫┗┻┛┍┯┑┝┿┥┕┷┙┎┰┒┠╂┨┖┸┚╼╾╽╿┮┱┲┭┡┽╀╁┾┩┟╆╈╇╅┧┞╄╉╊╃┦┢┶┹┺┵┪│┃━─┊┋┆┇─┈┉┄┅"

    const MAIN_CHAR_REPLACEMENTS = {
        "LLLL": "┼",
        "LLLH": "┽",
        "LLL*": "├",
        "LLHL": "╁",
        "LLHH": "╅",
        "LLH*": "┟",
        "LL*L": "┴",
        "LL*H": "┵",
        "LL**": "└",
        "LHLL": "┾",
        "LHLH": "┿",
        "LHL*": "┝",
        "LHHL": "╆",
        "LHHH": "╈",
        "LHH*": "┢",
        "LH*L": "┶",
        "LH*H": "┷",
        "LH**": "┕",
        "L*LL": "┤",
        "L*LH": "┥",
        "L*L*": "│",
        "L*HL": "┧",
        "L*HH": "┪",
        "L*H*": "╽",
        "L**L": "┘",
        "L**H": "┙",
        "HLLL": "╀",
        "HLLH": "╃",
        "HLL*": "┞",
        "HLHL": "╂",
        "HLHH": "╉",
        "HLH*": "┠",
        "HL*L": "┸",
        "HL*H": "┹",
        "HL**": "┖",
        "HHLL": "╄",
        "HHLH": "╇",
        "HHL*": "┡",
        "HHHL": "╊",
        "HHHH": "╋",
        "HHH*": "┣",
        "HH*L": "┺",
        "HH*H": "┻",
        "HH**": "┗",
        "H*LL": "┦",
        "H*LH": "┩",
        "H*L*": "╿",
        "H*HL": "┨",
        "H*HH": "┫",
        "H*H*": "┃",
        "H**L": "┚",
        "H**H": "┛",
        "*LLL": "┬",
        "*LLH": "┭",
        "*LL ": "┌",
        "*LHL": "┰",
        "*LHH": "┱",
        "*LH*": "┎",
        "*L*L": "─",
        "*L*H": "╾",
        "*HLL": "┮",
        "*HLH": "┯",
        "*HL*": "┍",
        "*HHL": "┲",
        "*HHH": "┳",
        "*HH*": "┏",
        "*H*L": "╼",
        "*H*H": "━",
        "**LL": "┐",
        "**HL": "┒",
        "**HH": "┓",
        "*LL*": "┌",
        "**LH": "┑"
    }

//
// ─── FINE TUNE UNICODE BOX FOR LAYERED PANE ─────────────────────────────────────
//

    export function fineTuneUnicodeBoxForLayeredPane ( pane: PaneView ) {
        const { width, height } =
            pane
        for ( let y = 0; y < height; y++ ) {
            for ( let x = 0; x < width; x++ ) {
                let char =
                    pane.screen.readChar( x, y )
                if ( CHANGEABLE_CHARACTERS_FOR_UNICODE_TUNNING.includes( char ) ) {
                    const surroundings =
                        getRestOfSurroundingsForFineTunnigUnicodeBoxes( pane, x, y )
                    const newChar =
                        fineTuneUnicodeBoxCharWithSurroundings( char, surroundings )
                    pane.screen.writeChar( x, y, newChar )
                }
            }
        }
    }

//
// ─── GET REST OF THE CHARACTERS ─────────────────────────────────────────────────
//

    function getRestOfSurroundingsForFineTunnigUnicodeBoxes ( pane: PaneView, x: number, y: number ): string {
        let surroundings =
            ""
        surroundings +=
            ( y > 0 ? pane.screen.readChar( x, y - 1 ) : "*" )
        surroundings +=
            ( x < pane.width - 1 ? pane.screen.readChar( x + 1, y ) : "*" )
        surroundings +=
            ( y < pane.height - 1 ? pane.screen.readChar( x, y + 1 ) : "*" )
        surroundings +=
            ( x > 0 ? pane.screen.readChar( x - 1, y ) : "*" )

        return surroundings
    }

//
// ─── FINE TUNE UNICODE BOX ──────────────────────────────────────────────────────
//

    function fineTuneUnicodeBoxCharWithSurroundings ( char: string, surroundings: string ): string {
        const [ top, right, bottom, left ] =
            surroundings
        let diagnostics =
            ""

        // top
        if ( LIGHT_CONNECTIONS_FROM_BOTTOM.includes( char ) || LIGHT_CONNECTIONS_FROM_TOP.includes( top ) ) {
            diagnostics += "L"
        } else if ( HEAVY_CONNECTIONS_FROM_BOTTOM.includes( char ) || HEAVY_CONNECTIONS_FROM_TOP.includes( top ) ) {
            diagnostics += "H"
        } else {
            diagnostics += "*"
        }

        // right
        if ( LIGHT_CONNECTIONS_FROM_LEFT.includes( char ) || LIGHT_CONNECTIONS_FROM_RIGHT.includes( right ) ) {
            diagnostics += "L"
        } else if ( HEAVY_CONNECTIONS_FROM_LEFT.includes( char ) || HEAVY_CONNECTIONS_FROM_RIGHT.includes( right ) ) {
            diagnostics += "H"
        } else {
            diagnostics += "*"
        }

        // bottom
        if ( LIGHT_CONNECTIONS_FROM_TOP.includes( char ) || LIGHT_CONNECTIONS_FROM_BOTTOM.includes( bottom ) ) {
            diagnostics += "L"
        } else if ( HEAVY_CONNECTIONS_FROM_TOP.includes( char ) || HEAVY_CONNECTIONS_FROM_BOTTOM.includes( bottom ) ) {
            diagnostics += "H"
        } else {
            diagnostics += "*"
        }

        // left
        if ( LIGHT_CONNECTIONS_FROM_RIGHT.includes( char ) || LIGHT_CONNECTIONS_FROM_LEFT.includes( left ) ) {
            diagnostics += "L"
        } else if ( HEAVY_CONNECTIONS_FROM_RIGHT.includes( char ) || HEAVY_CONNECTIONS_FROM_LEFT.includes( left ) ) {
            diagnostics += "H"
        } else {
            diagnostics += "*"
        }

        const replacement =
            ( MAIN_CHAR_REPLACEMENTS as never )[ diagnostics ]

        if ( replacement === undefined ) {
            throw new Error(
                `Unicode Box Fine Tuner: ${ char } with diagnostics ${ diagnostics } could not be replaced`
            )
        }

        return replacement
    }

// ────────────────────────────────────────────────────────────────────────────────
