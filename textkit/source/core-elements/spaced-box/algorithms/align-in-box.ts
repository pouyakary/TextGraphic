
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "../main"
    import { HorizontalAlign, VerticalAlign }
        from "../../../shapes/types"

//
// ─── ALIGN IN BOX ───────────────────────────────────────────────────────────────
//

    export function alignSpacedBoxWithinNewBoxBoundary ( box: SpacedBox,
                                                    boxWidth: number,
                                                   boxHeight: number,
                                             horizontalAlign: HorizontalAlign,
                                               verticalAlign: VerticalAlign ) {

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
        marginedBox.baseline =
            0

        return marginedBox
    }

// ────────────────────────────────────────────────────────────────────────────────
