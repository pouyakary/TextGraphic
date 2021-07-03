
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { MultiStyleView }
        from ".."
    import { CanvasView }
        from "../canvas-view/main"
    import { PortableStyle }
        from "../../../protocols"

//
// ─── APPLY MARGIN TO CANVAS VIEW ──────────────────────────────────────────────────
//

    export function applyMarginToMultiStyleView <EnvironmentStyleSettings extends PortableStyle<any>> (
            view:           MultiStyleView<EnvironmentStyleSettings>,
            topMargin:      number,
            rightMargin:    number,
            bottomMargin:   number,
            leftMargin:     number,
        ): CanvasView<EnvironmentStyleSettings> {

        //
        const backgroundCanvas =
            new CanvasView(
                leftMargin + view.width + rightMargin,
                topMargin + view.height + bottomMargin,
                view.styleRenderer,
            )

        backgroundCanvas.add( view, leftMargin, topMargin, 1 )

        return backgroundCanvas
    }

// ────────────────────────────────────────────────────────────────────────────────
