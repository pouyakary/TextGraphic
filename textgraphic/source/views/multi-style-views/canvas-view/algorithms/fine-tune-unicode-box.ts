
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { EMPTY_STRING }
        from "../../../../constants/characters"
    import { CanvasView }
        from "../main"
    import { PortableStyle, PortableColor }
        from "../../../../protocols"

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
// ─── FINE TUNE UNICODE BOX FOR LAYERED CANVAS ─────────────────────────────────────
//

    export function fineTuneUnicodeBoxForLayeredCanvas <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
            canvas: CanvasView<ColorType, EnvironmentStyleSettings>,
            startX: number,
            startY: number,
            endX:   number,
            endY:   number,
        ) {
        //
        for ( let y = startY; y < endY; y++ ) {
            for ( let x = startX; x < endX; x++ ) {
                fineTuneUnicodeBoxForLayeredCanvasAtPoint( canvas, x, y )
            }
        }
    }

//
// ─── FINE TUNE UNICODE BOX FOR LAYERED CANVAS AT POINT ──────────────────────────
//

    export function fineTuneUnicodeBoxForLayeredCanvasAtPoint <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
        canvas: CanvasView<ColorType, EnvironmentStyleSettings>,
        x: number,
        y: number,
    ) {
        //
        let char =
            canvas.screen.readChar( x, y )
        if ( CHANGEABLE_CHARACTERS_FOR_UNICODE_TUNNING.includes( char ) ) {
            const surroundings =
                getRestOfSurroundingsForFineTunnigUnicodeBoxes( canvas, x, y )
            const newChar =
                fineTuneUnicodeBoxCharWithSurroundings( char, surroundings )
            canvas.screen.writeChar( x, y, newChar )
        }
    }

//
// ─── GET REST OF THE CHARACTERS ─────────────────────────────────────────────────
//

    function getRestOfSurroundingsForFineTunnigUnicodeBoxes <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<any>> (
            canvas:     CanvasView<ColorType, EnvironmentStyleSettings>,
            x:          number,
            y:          number
        ): string {
        //
        let surroundings =
            EMPTY_STRING
        surroundings +=
            ( y > 0 ? canvas.screen.readChar( x, y - 1 ) : "*" )
        surroundings +=
            ( x < canvas.width - 1 ? canvas.screen.readChar( x + 1, y ) : "*" )
        surroundings +=
            ( y < canvas.height - 1 ? canvas.screen.readChar( x, y + 1 ) : "*" )
        surroundings +=
            ( x > 0 ? canvas.screen.readChar( x - 1, y ) : "*" )

        return surroundings
    }

//
// ─── FINE TUNE UNICODE BOX ──────────────────────────────────────────────────────
//

    function fineTuneUnicodeBoxCharWithSurroundings ( char: string, surroundings: string ): string {
        const [ top, right, bottom, left ] =
            surroundings
        let diagnostics =
            EMPTY_STRING

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
