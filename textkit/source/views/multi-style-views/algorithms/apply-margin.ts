
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { MultiStyleView }
        from ".."
    import { PaneView }
        from "../pane-view/main"

//
// ─── APPLY MARGIN TO PANE VIEW ──────────────────────────────────────────────────
//

    export function applyMarginToMultiStyleView ( view: MultiStyleView,
                                             topMargin: number ,
                                           rightMargin: number ,
                                          bottomMargin: number ,
                                            leftMargin: number ): PaneView {
        //
        const backgroundPane =
            new PaneView(
                leftMargin + view.width + rightMargin,
                topMargin + view.height + bottomMargin
            )

        backgroundPane.add( view, leftMargin, topMargin, 1 )

        return backgroundPane
    }