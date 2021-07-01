
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PaneView, PaneChildrenProfile }
        from "../main"
    import { ScreenMatrixPixel }
        from "../../../../protocols/view-protocol"

//
// ─── RAY TRACE ──────────────────────────────────────────────────────────────────
//

    export function rayTraceScreenPixel <EnvironmentStyleSettings extends Object> (
            pane:                   PaneView<EnvironmentStyleSettings>,
            left:                   number,
            top:                    number,
            x:                      number,
            y:                      number,
            paneLeftStylingInfo:    string,
            paneRightStylingInfo:   string,
        ): ScreenMatrixPixel {

        //

        let result: PaneChildrenProfile<EnvironmentStyleSettings> | null =
            null
        const xQuery =
            x - left
        const yQuery =
            y - top

        for ( const profile of pane.getChildren( ) ) {
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

        if ( result ) {
            return result.child.getCharAtRelativePosition(
                result.x, result.y, x, y
            )
        } else {
            return [
                paneLeftStylingInfo,
                " ",
                paneRightStylingInfo
            ]
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
