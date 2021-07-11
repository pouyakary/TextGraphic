
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
    import { BarChartSettings, BarChartDataPoint }
        from "./index"
    import { CanvasView }
        from "../../../views"

//
// ─── API ────────────────────────────────────────────────────────────────────────
//

    export function createVerticalBarChart <ColorType, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
            renderer:   StyleRendererProtocol<EnvironmentStyleSettings>,
            settings:   BarChartSettings<ColorType>,
        ): CanvasView<EnvironmentStyleSettings> {
        //
        return new CanvasView(1, 1, renderer)
    }

// ────────────────────────────────────────────────────────────────────────────────
