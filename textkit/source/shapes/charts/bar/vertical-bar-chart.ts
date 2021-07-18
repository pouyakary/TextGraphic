
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
        from "../../../protocols"
    import { BarChartSettings }
        from "./index"
    import { CanvasView }
        from "../../../views"

//
// ─── API ────────────────────────────────────────────────────────────────────────
//

    export function createVerticalBarChart <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
            renderer:   StyleRendererProtocol<ColorType, EnvironmentStyleSettings>,
            settings:   BarChartSettings<ColorType>,
        ): CanvasView<ColorType, EnvironmentStyleSettings> {
        //
        return new CanvasView(1, 1, renderer)
    }

// ────────────────────────────────────────────────────────────────────────────────
