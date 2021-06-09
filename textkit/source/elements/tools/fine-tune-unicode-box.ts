
//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const LIGHT_CONNECTIONS_FROM_LEFT =
        "┌┬├┼└┴╓╥╟╫╙╨┎┰┠╂┖┸┱┭┽╀╁┟╅┞╉╃┹┵─╾┈┄╌"
    const HEAVY_CONNECTIONS_FROM_LEFT =
        "┏┳┣╋┗┻┯┷┿┝╒╤╞╪╘╧╔╦╠╬╚╩┲┡┾╆╈╇╊━╼═┉╍┅"
    const LIGHT_CONNECTIONS_FROM_TOP =
        "┌┬┐├┼┤┍┯┑┝┿┥╒╤╕╞╪╡╿┮┭┡┽╀┾┩╇┞╄╃│╷┊┆╎"
    const HEAVY_CONNECTIONS_FROM_TOP =
        "┏┳┓┣╋┫┎┰┒┠╂┨╔╦╗╠╬╣╚╩╝╓╥╖╟╫╢╽┱┲╁┟╆╈╅╉╊┢┪┃║╻┋┇╏"
    const LIGHT_CONNECTIONS_FROM_RIGHT =
        "┬┐┼┤┴┘╼╥╖╫╜╼┮┲╀╁┾╆┧┦┶┺─┈┄╌╴╯"
    const HEAVY_CONNECTIONS_FROM_RIGHT =
        "┳┓╋┫┻┛┯┿┷┙┥┑╤╪╧╛╡╕╦╬╩╝╣╗╾┱┩╈╇╅╉╃┹┵┪━┉╍┅╸"
    const LIGHT_CONNECTIONS_FROM_BOTTOM =
        "├┼┤└┴┘┝┿┥┕┷┙╞╪╡╘╧╛╽┽╁┾┟╆╈╅┧┢┶┵┪╵╭│┊┆╎"
    const HEAVY_CONNECTIONS_FROM_BOTTOM =
        "┣╋┫┗┻┛┠╂┨┖┸┚╠╬╣╚╩╝╟╫╢╙╨╜╿┡╀┩╇┞╄╉╊╃┦┹┺╹┃┋┇╏║"

    const MAIN_CHAR_REPLACEMENTS = {
        "LLLL": "┼",
        "LLLH": "┽",
        "LLL ": "├",
        "LLHL": "╁",
        "LLHH": "╅",
        "LLH ": "┟",
        "LL L": "┴",
        "LL H": "┵",
        "LL  ": "└",
        "LHLL": "┾",
        "LHLH": "┿",
        "LHL ": "┝",
        "LHHL": "╆",
        "LHHH": "╈",
        "LHH ": "┢",
        "LH L": "┶",
        "LH H": "┷",
        "LH  ": "┕",
        "L LL": "┤",
        "L LH": "┥",
        "L L ": "│",
        "L HL": "┧",
        "L HH": "┪",
        "L H ": "╽",
        "L  L": "┘",
        "L  H": "┙",
        "HLLL": "╀",
        "HLLH": "╃",
        "HLL ": "┞",
        "HLHL": "╂",
        "HLHH": "╉",
        "HLH ": "┠",
        "HL L": "┸",
        "HL H": "┹",
        "HL  ": "┖",
        "HHLL": "╄",
        "HHLH": "╇",
        "HHL ": "┡",
        "HHHL": "╊",
        "HHHH": "╋",
        "HHH ": "┣",
        "HH L": "┺",
        "HH H": "┻",
        "HH  ": "┗",
        "H LL": "┦",
        "H LH": "┩",
        "H L ": "╿",
        "H HL": "┨",
        "H HH": "┫",
        "H H ": "┃",
        "H  L": "┚",
        "H  H": "┛",
        " LLL": "┬",
        " LLH": "┭",
        " LL ": "┌",
        " LHL": "┰",
        " LHH": "┱",
        " LH ": "┎",
        " L L": "─",
        " L H": "╾",
        " HLL": "┮",
        " HLH": "┯",
        " HL ": "┍",
        " HHL": "┲",
        " HHH": "┳",
        " HH ": "┏",
        " H L": "╼",
        " H H": "━",
        "  LL": "┐",
        "  HL": "┒",
        "  HH": "┓",
        "    ": " ",
    }

//
// ─── FINE TUNE UNICODE BOX ──────────────────────────────────────────────────────
//

    export function fineTuneUnicodeBoxCharWithSurroundings ( surroundings: string ) {
        const [ top, right, bottom, left ] =
            surroundings
        let diagnostics =
            ""

        // top
        if ( LIGHT_CONNECTIONS_FROM_TOP.includes( top ) ) {
            diagnostics += "L"
        } else if ( HEAVY_CONNECTIONS_FROM_TOP ) {
            diagnostics += "H"
        } else {
            diagnostics += " "
        }

        // right
        if ( LIGHT_CONNECTIONS_FROM_RIGHT.includes( right ) ) {
            diagnostics += "L"
        } else if ( HEAVY_CONNECTIONS_FROM_RIGHT.includes( right ) ) {
            diagnostics += "H"
        } else {
            diagnostics += " "
        }

        // bottom
        if ( LIGHT_CONNECTIONS_FROM_BOTTOM.includes( bottom ) ) {
            diagnostics += "L"
        } else if ( HEAVY_CONNECTIONS_FROM_BOTTOM.includes( bottom ) ) {
            diagnostics += "H"
        } else {
            diagnostics += " "
        }

        // left
        if ( LIGHT_CONNECTIONS_FROM_LEFT.includes( left ) ) {
            diagnostics += "L"
        } else if ( HEAVY_CONNECTIONS_FROM_LEFT.includes( left ) ) {
            diagnostics += "H"
        } else {
            diagnostics += " "
        }


    }

// ────────────────────────────────────────────────────────────────────────────────
