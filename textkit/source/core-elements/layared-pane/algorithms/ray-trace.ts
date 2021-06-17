
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { LayeredPane, PaneChildrenProfile }
        from "../main"
    import { ScreenMatrixPixel }
        from "../../../protocols/string-box"

//
// ─── RAY TRACE ──────────────────────────────────────────────────────────────────
//

    export function rayTraceScreenPixel ( pane: LayeredPane,
                                          left: number,
                                           top: number,
                                             x: number,
                                             y: number ): ScreenMatrixPixel {

        let result: PaneChildrenProfile | null =
            null
        const xQuery =
            x - left
        const yQuery =
            y - top

        for ( const profile of pane.children ) {
            const horizontalBoundary =
                ( xQuery >= profile.x ) && ( xQuery < profile.x + profile.child.width )
            const verticalBoundary =
                ( yQuery >= profile.y ) && ( yQuery < profile.y + profile.child.height )

            if ( horizontalBoundary && verticalBoundary ) {
                if ( result ) {
                    if ( profile.zIndex > result.zIndex ) {
                        if ( profile.child.transparent ) {
                            const [ style, character ] =
                                profile.child.getCharAtRelativePosition(
                                    profile.x, profile.y, x, y
                                )
                            if ( character !== " " ) {
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

        return ( result
            ?   result.child.getCharAtRelativePosition(
                    result.x, result.y, x, y
                )
            :   pane.background.getCharAtRelativePosition(
                    0, 0, x, y
                )
            )
    }

// ────────────────────────────────────────────────────────────────────────────────
