
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { CanvasView, CanvasChildrenProfile }
        from "../main"
    import { ScreenMatrixPixel }
        from "../../../../protocols/view-protocol"
    import { EMPTY_STRING, WHITE_SPACE_CHARACTER }
        from "../../../../constants/characters"
    import { PortableStyle, PortableColor }
        from "../../../../protocols"

//
// ─── RAY TRACE ──────────────────────────────────────────────────────────────────
//

    export function rayTraceScreenPixel <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
            canvas: CanvasView<ColorType, EnvironmentStyleSettings>,
            left:   number,
            top:    number,
            x:      number,
            y:      number,
        ): ScreenMatrixPixel {

        //

        let result: CanvasChildrenProfile<ColorType, EnvironmentStyleSettings> | null =
            null
        const xQuery =
            x - left
        const yQuery =
            y - top

        for ( const profile of canvas.getChildren( ) ) {
            const horizontalBoundary =
                ( xQuery >= profile.x ) && ( xQuery < profile.x + profile.child.width )
            const verticalBoundary =
                ( yQuery >= profile.y ) && ( yQuery < profile.y + profile.child.height )

            if ( horizontalBoundary && verticalBoundary ) {
                if ( result ) {
                    if ( profile.zIndex > result.zIndex ) {
                        if ( profile.child.transparent ) {
                            const [ _, character ] =
                                profile.child.getCharAtRelativePosition(
                                    profile.x, profile.y, x, y
                                )
                            if ( character !== WHITE_SPACE_CHARACTER ) {
                                result = profile
                            }
                        } else {
                            result = profile
                        }
                    }
                } else {
                    result = profile
                }
            }
        }

        if ( result ) {
            return result.child.getCharAtRelativePosition(
                result.x, result.y, x, y
            )
        } else {
            return [ EMPTY_STRING, WHITE_SPACE_CHARACTER, EMPTY_STRING ]
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
