
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { StyleRendererProtocol, PortableColor }
        from "../../protocols"
    import { WebStyleSettings, WebTextDecorationLineStyle, WebTextDecorationLineType }
        from "./style"
    import { Subset }
        from "../../tools/types"
    import { convertPortableColorToCSSColor }
        from "./web-terminal-portable-color-implementation"
    import { mergeNewWebStyleOptionsWithThePreviousSettings }
        from "./merger"

//
// ─── ANSI TERMINAL STYLE RENDERER ───────────────────────────────────────────────
//

    export class WebStyleRenderer implements
        StyleRendererProtocol<WebStyleSettings> {

            //
            // ─── CONSTRUCTOR ─────────────────────────────────────────────────
            //

                constructor ( ) { }

            //
            // ─── DEFAULT STYLE ───────────────────────────────────────────────
            //

                get defaultStyle ( ) {
                    return {
                        textColor:          "factory" as PortableColor,
                        backgroundColor:    "factory" as PortableColor,
                        bold:               false,
                        italic:             false,
                        underline:          false,
                        blink:              false,
                        line:               "none" as WebTextDecorationLineType,
                        lineStyle:          "solid" as WebTextDecorationLineStyle,
                    }
                }


            //
            // ─── RENDER STYLES ───────────────────────────────────────────────
            //

                public renderLeftStylingInfo ( style: WebStyleSettings ): string {
                    const css =
                        convertWebSettingsToInlineCSS( style )
                    return css === ""
                        ? "<span>"
                        : `<span style="${css}">`
                }

                public renderRightStylingInfo ( ): string {
                    return "</span>"
                }

            //
            // ─── CANVAS INFORMATION ────────────────────────────────────────────
            //

                readonly rootRowLeftStylingInfo  = "   <textkit-row>"
                readonly rootRowRightStylingInfo = "</textkit-row>"
                readonly rootLeftStylingInfo     = "<textkit-area>\n"
                readonly rootRightStylingInfo    = "\n</textkit-area>"

            //
            // ─── MERGER ──────────────────────────────────────────────────────
            //

                public margeNewStyleOptionsWithPreviosuStyleState (
                        style:      WebStyleSettings,
                        options:    Subset<WebStyleSettings>,
                    ): WebStyleSettings {

                    //
                    return mergeNewWebStyleOptionsWithThePreviousSettings(
                        style, options
                    )
                }

            //
            // ─── ENCODE CHARACTER ────────────────────────────────────────────
            //

                public encodeCharacterForStyledRender ( char: string ) {
                    switch ( char ) {
                        case "&":
                            return "&amp;"
                        case "<":
                            return "&lt;"
                        case ">":
                            return "&gt;"
                        case "█":
                            return "&#9608;"
                        default:
                            return char
                    }
                }

            // ─────────────────────────────────────────────────────────────────

        }

//
// ─── RENDER STYLE ───────────────────────────────────────────────────────────────
//

    function convertWebSettingsToInlineCSS ( style: WebStyleSettings ) {
        const serializedProperties =
            new Array<string> ( )

        // line decoration
        if ( style.underline || style.line !== "none" ) {
            const lineType =
                style.underline ? "underline" : style.line
            const lineDecorationSerialized =
                `${ style.lineStyle } ${lineType}`
            serializedProperties.push( lineDecorationSerialized )
        }

        // color
        if ( style.textColor !== "factory" ) {
            const serializedColor =
                convertPortableColorToCSSColor( style.textColor )
            serializedProperties.push( `color: ${ serializedColor }` )
        }

        // background color
        if ( style.backgroundColor !== "factory" ) {
            const serializedColor =
                convertPortableColorToCSSColor( style.backgroundColor )
            serializedProperties.push( `background-color: ${ serializedColor }` )
        }

        // italic
        if ( style.italic ) {
            serializedProperties.push( "font-style: italic" )
        }

        // bold
        if ( style.bold ) {
            serializedProperties.push( "font-weight: bold" )
        }

        // done
        return serializedProperties.join( "; " )
    }

// ────────────────────────────────────────────────────────────────────────────────
