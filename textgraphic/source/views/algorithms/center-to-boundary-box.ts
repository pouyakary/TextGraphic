
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ViewProtocol, PortableStyle, PortableColor, StyleRendererProtocol }
        from "../../protocols"

//
// ─── CENTER TO BOUNDARY BOX ─────────────────────────────────────────────────────
//

    export function centerViewProtocolToBoundaryBox <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<any>> (
            view:   ViewProtocol<ColorType, EnvironmentStyleSettings, StyleRendererProtocol<ColorType, EnvironmentStyleSettings>>,
            width:  number,
            height: number
        ): ViewProtocol<ColorType, EnvironmentStyleSettings, StyleRendererProtocol<ColorType, EnvironmentStyleSettings>> {

        //
        const top =
            view.height === height ? 0 : Math.floor( ( height - view.height ) / 2 )
        const right =
            Math.floor( ( width - view.width ) / 2 )
        const bottom =
            height - ( top + view.height )
        const left =
            view.width === width ? 0 : width - ( right + view.width )

        const result =
            view.applyMargin( top, right, bottom, left )

        return result
    }

// ────────────────────────────────────────────────────────────────────────────────
