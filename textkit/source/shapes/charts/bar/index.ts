
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PortableStyle, StyleRendererProtocol }
        from "../../../protocols"
    import { CanvasView }
        from "../../../views"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export interface BarChartDataPoint <ColorType> {
        value:  number
        label:  string
        color:  ColorType
    }

    export interface BarChartSettings <ColorType> {
        width:          number
        height:         number
        origin?:        number
        horizontal?:    boolean
        data:           BarChartDataPoint<ColorType>[ ]
    }

    type InternalFixatedBarChartSettings <ColorType> =
        Required<BarChartSettings<ColorType>>

//
// ─── BAR CHART ──────────────────────────────────────────────────────────────────
//

    export function createBarChart <ColorType, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
            renderer:   StyleRendererProtocol<EnvironmentStyleSettings>,
            settings:   BarChartSettings<ColorType>,
        ): CanvasView<ColorType, EnvironmentStyleSettings> {

        //
        const fixatedSettings =
            fixSettings( settings )


        // DUMMY PLACE HOLDER
        return  new CanvasView( 1, 1, renderer )
    }

//
// ─── FIX THE SETTINGS ───────────────────────────────────────────────────────────
//

    function fixSettings <ColorType> (
            settings: BarChartSettings<ColorType>
        ): InternalFixatedBarChartSettings <ColorType> {
        //
        return {
            width:          settings.width,
            height:         settings.height,
            origin:         settings.origin ? settings.origin : 0,
            horizontal:     settings.horizontal ? settings.horizontal : false,
            data:           settings.data,
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
