
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PortableStyle, PortableColor, StyleRendererProtocol }
        from "../../protocols"
    import { ShapeView }
        from "../../views/mono-style-views"
    import { WHITE_SPACE_CHARACTER, BLOCK_CHARACTER }
        from "../../constants/characters"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export type GraphFormula =
        ( x: number, y: number, width: number, height: number ) => boolean

    export interface GraphSettings <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> {
        renderer:           StyleRendererProtocol<ColorType, EnvironmentStyleSettings>,
        width:              number
        height:             number
        formula:            GraphFormula
        originX?:           number
        originY?:           number
        verticalZoom?:      number
        horizontalZoom?:    number
        style?:             Partial<EnvironmentStyleSettings>
        character?:         string
        transparent?:       boolean
    }

    type FixatedSettings <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> =
        Required<GraphSettings<ColorType, EnvironmentStyleSettings>>

//
// ─── CREATE MATH GRAPH ──────────────────────────────────────────────────────────
//

    export function create <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
            settings: GraphSettings<ColorType, EnvironmentStyleSettings>
        ): ShapeView<ColorType, EnvironmentStyleSettings> {
        //
        const { width, height, renderer, transparent, style, verticalZoom
              , horizontalZoom, formula, originX, originY, character
              } =
            checkAndCompleteGraphSettings( settings )

        // rendering the graph
        const lines =
            new Array<string> ( height )
        const graphWidth =
            2 / horizontalZoom
        const graphHeight =
            2 / verticalZoom
        const deltaOriginX =
            graphWidth / 2 - originX
        const deltaOriginY =
            graphHeight / 2 - originY

        for ( let row = 0; row < height; row++ ) {
            const y =
                ( ( ( height - row ) / height ) * graphHeight ) - deltaOriginY
            const line =
                new Array<string> ( width )

            for ( let column = 0; column < width; column++ ) {
                const x =
                    ( column / width ) * graphWidth - deltaOriginX
                line[ column ] =
                    ( formula( x, y, graphWidth, graphHeight )
                        ? character
                        : WHITE_SPACE_CHARACTER
                        )
            }
            lines[ row ] =
                line.join("")
        }

        // done
        const baseline =
            Math.floor( height / 2 )
        return new ShapeView (
            lines, baseline, renderer, style, transparent
        )
    }

//
// ─── FIXATE STYLE ───────────────────────────────────────────────────────────────
//

    function checkAndCompleteGraphSettings <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
            settings:   GraphSettings<ColorType, EnvironmentStyleSettings>
        ): FixatedSettings<ColorType, EnvironmentStyleSettings> {
        //
        const   { renderer, width, height, formula, originX, originY
                , verticalZoom, horizontalZoom, style, transparent, character
                } =
            settings

        // zoom
        if ( verticalZoom && verticalZoom <= 0 ) {
            throw new Error(
                `Graph's vertical zoom cannot be zero or less than zero. (found ${verticalZoom})`
            )
        }

        if ( horizontalZoom && horizontalZoom <= 0 ) {
            throw new Error(
                `Graph's horizontal zoom cannot be zero or less than zero. (found ${horizontalZoom})`
            )
        }

        // character
        let drawingCharacter =
            BLOCK_CHARACTER
        if ( character ) {
            if ( character.length === 1 ) {
                drawingCharacter = character
            } else {
                throw new Error (
                    `Graph's character should be a single character not "${character}".`
                )
            }
        }


        // done
        return { renderer, width, height, formula,
            character:      drawingCharacter,
            originX:        originX         ? originX           : 0,
            originY:        originY         ? originY           : 0,
            verticalZoom:   verticalZoom    ? verticalZoom      : 1,
            horizontalZoom: horizontalZoom  ? horizontalZoom    : 1,
            style:          style           ? style             : { },
            transparent:    transparent     ? transparent       : true,
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
