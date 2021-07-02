
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { CanvasView, CanvasChildrenProfile }
        from "../main"
    import { ScreenMatrixPixel }
        from "../../../../protocols/view-protocol"
    import { EMPTY_STRING, WHITE_SPACE_CHARACTER }
        from "../../../../constants/characters"

//
// ─── RAY TRACE ──────────────────────────────────────────────────────────────────
//

    export function rayTraceScreenPixel <EnvironmentStyleSettings extends Object> (
            canvas:                   CanvasView<EnvironmentStyleSettings>,
            left:                   number,
            top:                    number,
            x:                      number,
            y:                      number,
        ): ScreenMatrixPixel {

        //

        let result: CanvasChildrenProfile<EnvironmentStyleSettings> | null =
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
