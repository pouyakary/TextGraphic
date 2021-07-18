
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { MonoStyleViews }
        from ".."
    import { ShapeView }
        from "../views/shape-view"
    import { HorizontalAlign, VerticalAlign, PortableStyle, PortableColor }
        from "../../../protocols"

//
// ─── ALIGN IN BOX ───────────────────────────────────────────────────────────────
//

    export function alignMonoStyleViewWithinNewBoxBoundary <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<any>> (
            box:                MonoStyleViews<ColorType, EnvironmentStyleSettings>,
            boxWidth:           number,
            boxHeight:          number,
            horizontalAlign:    HorizontalAlign,
            verticalAlign:      VerticalAlign,
        ): ShapeView<ColorType, EnvironmentStyleSettings> {

        //
        let marginTop = 0, marginRight = 0, marginLeft = 0, marginBottom = 0

        const horizontalEmptySpace =
            boxWidth - box.width
        const verticalEmptySpace =
            boxHeight - box.height

        switch ( horizontalAlign ) {
            case HorizontalAlign.Left:
                marginRight =
                    horizontalEmptySpace
                break;
            case HorizontalAlign.Center:
                marginLeft =
                    Math.floor( horizontalEmptySpace / 2 )
                marginRight =
                    horizontalEmptySpace - marginLeft
                break;
            case HorizontalAlign.Right:
                marginLeft =
                    horizontalEmptySpace
                break;
        }

        switch ( verticalAlign ) {
            case VerticalAlign.Top:
                marginBottom =
                    verticalEmptySpace
                break;
            case VerticalAlign.Center:
                marginTop =
                    Math.floor( verticalEmptySpace / 2 )
                marginBottom =
                    verticalEmptySpace - marginTop
                break;
            case VerticalAlign.Bottom:
                marginTop =
                    verticalEmptySpace
                break;
        }

        const marginedBox =
            box.applyMargin( marginTop, marginRight, marginBottom, marginLeft )

        return marginedBox
    }

// ────────────────────────────────────────────────────────────────────────────────
