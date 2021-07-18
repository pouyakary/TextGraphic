
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PortableColor, PortableStyle }
        from "../../protocols"
    import { convertPortableColorToCSSColor }
        from "../tools/css-portable-color-implementation"

//
// ─── STYLE ──────────────────────────────────────────────────────────────────────
//

    export interface SVGStyleSettings extends PortableStyle<PortableColor> {
    }

//
// ─── MERGER ─────────────────────────────────────────────────────────────────────
//

    export function mergeNewWebStyleOptionsWithThePreviousSettings (
            previous: SVGStyleSettings,
            newStyle: Partial<SVGStyleSettings>
        ): SVGStyleSettings {

        //
        return {
            color:          newStyle.color          ? newStyle.color        : previous.color,
            backgroundColor:    newStyle.backgroundColor    ? newStyle.backgroundColor  : previous.backgroundColor,
            bold:               newStyle.bold               ? newStyle.bold             : previous.bold,
            italic:             newStyle.italic             ? newStyle.italic           : previous.italic,
            underline:          newStyle.underline          ? newStyle.underline        : previous.underline,
            blink:              newStyle.blink              ? newStyle.blink            : previous.blink,
        }
    }

//
// ─── RENDER STYLE ───────────────────────────────────────────────────────────────
//

    export function convertSVGSettingsToInlineCSS ( style: SVGStyleSettings ) {
        const serializedProperties =
            new Array<string> ( )

        // color
        if ( style.color !== "factory" ) {
            const serializedColor =
                convertPortableColorToCSSColor( style.color )
            serializedProperties.push( `fill: ${ serializedColor }` )
        }

        // background color
        if ( style.backgroundColor !== "factory" ) {
            /* this needs technical investigation */
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
