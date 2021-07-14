
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { MultiStyleView }
        from ".."
    import { CanvasView }
        from "../canvas-view/main"
    import { PortableStyle }
        from "../../../protocols"

//
// ─── APPLY MARGIN TO CANVAS VIEW ──────────────────────────────────────────────────
//

    export function applyMarginToMultiStyleView <ColorType, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
            view:           MultiStyleView<ColorType, EnvironmentStyleSettings>,
            topMargin:      number,
            rightMargin:    number,
            bottomMargin:   number,
            leftMargin:     number,
        ): CanvasView<ColorType, EnvironmentStyleSettings> {

        //
        const backgroundCanvas =
            new CanvasView(
                leftMargin + view.width + rightMargin,
                topMargin + view.height + bottomMargin,
                view.styleRenderer,
            )

        backgroundCanvas.add( view, leftMargin, topMargin, 1 )

        return backgroundCanvas
    }

// ────────────────────────────────────────────────────────────────────────────────
