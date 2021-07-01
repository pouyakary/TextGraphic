
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

    export function applyMarginToMultiStyleView <EnvironmentStyleSettings extends Object> (
            view:           MultiStyleView<EnvironmentStyleSettings>,
            topMargin:      number,
            rightMargin:    number,
            bottomMargin:   number,
            leftMargin:     number,
        ): PaneView<EnvironmentStyleSettings> {

        //
        const backgroundPane =
            new PaneView(
                leftMargin + view.width + rightMargin,
                topMargin + view.height + bottomMargin,
                view.styleRenderer,
                { }
            )

        backgroundPane.add( view, leftMargin, topMargin, 1 )

        return backgroundPane
    }

// ────────────────────────────────────────────────────────────────────────────────
