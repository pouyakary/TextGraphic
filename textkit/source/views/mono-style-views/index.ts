
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { LineView }
        from "./views/line-view"
    import { ShapeView }
        from "./views/shape-view"
    import { GraphView }
        from "./views/graph-view"
    import { PortableStyle }
        from "../../protocols"

//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//

    export type MonoStyleViews<ColorType, EnvironmentStyleSettings extends PortableStyle<any>> =
        | ShapeView <ColorType, EnvironmentStyleSettings>
        | LineView  <ColorType, EnvironmentStyleSettings>
        | GraphView <ColorType, EnvironmentStyleSettings>

    export * from "./views/line-view"
    export * from "./views/shape-view"
    export * from "./views/graph-view"

// ────────────────────────────────────────────────────────────────────────────────
