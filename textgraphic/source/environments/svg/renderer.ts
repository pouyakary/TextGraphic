
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
    import { SVGStyleSettings, mergeNewWebStyleOptionsWithThePreviousSettings
           , convertSVGSettingsToInlineCSS
           }
        from "./style"
    import { CSSStyleOptimizer }
        from "../tools/css-optimizer"
    import { LINE_BREAK_CHARACTER }
        from "../../constants/characters"
    import { INDENTATION }
        from "../tools/indentation"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export interface GlobalSVGSettings {
        fontSize:           number,
        fontFamily:         string,
    }

//
// ─── SVG STYLE RENDERER ─────────────────────────────────────────────────────────
//

    export class SVGStyleRenderer implements StyleRendererProtocol<PortableColor, SVGStyleSettings> {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            #fontFamily:    string
            #fontSize:      number
            #optimizer:     CSSStyleOptimizer

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( optimizeCSS: boolean, globalSettings: GlobalSVGSettings ) {
                this.#fontFamily =
                    globalSettings.fontFamily
                this.#fontSize =
                    globalSettings.fontSize
                this.#optimizer =
                    new CSSStyleOptimizer( optimizeCSS )
            }

        //
        // ─── DEFAULT STYLE ───────────────────────────────────────────────
        //

            get defaultStyle ( ) {
                return {
                    color:              "factory" as PortableColor,
                    backgroundColor:    "factory" as PortableColor,
                    bold:               false,
                    italic:             false,
                    underline:          false,
                    blink:              false,
                }
            }

        //
        // ─── RENDER STYLES ───────────────────────────────────────────────
        //

            public renderLeftStylingInfo ( style: SVGStyleSettings ): string {
                const css =
                    convertSVGSettingsToInlineCSS( style )
                const attribute =
                    this.#optimizer.generateAttribute( css )

                return `<tspan${attribute}>`
            }

            public renderRightStylingInfo ( ): string {
                return "</tspan>"
            }

        //
        // ─── MERGER ──────────────────────────────────────────────────────
        //

            public margeNewStyleOptionsWithPreviosuStyleState (
                    style:      SVGStyleSettings,
                    options:    Partial<SVGStyleSettings>,
                ): SVGStyleSettings {

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
                    case " ":
                        return "\u00a0"
                    case "&":
                        return "&amp;"
                    case "<":
                        return "&lt;"
                    case ">":
                        return "&gt;"
                    default:
                        return char
                }
            }

        //
        // ─── RENDER ──────────────────────────────────────────────────────
        //

            public wrapRootLinesAndFinalizeRender ( width: number, lines: string[ ] ): string {
                const renderedParts =
                    new Array<string> ( lines.length + 2 )

                // header
                renderedParts[ 0 ] =
                    this.generateSVGHeader( width, lines.length )

                // body
                for ( let i = 0; i <= lines.length; i++ ) {
                    const y =
                        ( ( i + 1 ) * this.#fontSize ) - 3
                    renderedParts[ i + 1 ] =
                        `${ INDENTATION }<text x="0" y="${ y }px">${ lines[ i ] }</text>`
                }

                // footer
                renderedParts[ lines.length + 1 ] =
                    "</svg>"

                //
                return renderedParts.join( LINE_BREAK_CHARACTER )
            }

        //
        // ─── GENERATE HEADER ─────────────────────────────────────────────
        //j

            private generateSVGHeader ( width: number, height: number ) {
                const TextGraphicComment =
                    `<!-- Generated by Pouya's TextGraphic -->\n`

                const TextGraphicAreaClassName =
                    "textgraphic-svg-area"

                const widthInPixels =
                    width * 0.6 * this.#fontSize
                const heightInPixels =
                    height * this.#fontSize
                const SVGHeader =
                    `<svg class="${ TextGraphicAreaClassName }" viewBox="0 0 ${ widthInPixels }px ${ heightInPixels }px" width="${ widthInPixels }px" height="${ heightInPixels }px" xmlns="http://www.w3.org/2000/svg">`

                const additionalCSS =
                    `.${ TextGraphicAreaClassName } {font: ${ this.#fontSize }px monospace}`

                const styleTag =
                    this.#optimizer.generateHeaderStyleTag( additionalCSS )

                return TextGraphicComment + SVGHeader + styleTag
            }

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
