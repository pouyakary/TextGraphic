
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ViewProtocol, PortableStyle, StyleRendererProtocol }
        from "../../protocols"

//
// ─── CENTER TO BOUNDARY BOX ─────────────────────────────────────────────────────
//

    export function centerViewProtocolToBoundaryBox <EnvironmentStyleSettings extends PortableStyle<any>> (
            view:   ViewProtocol<EnvironmentStyleSettings, StyleRendererProtocol<EnvironmentStyleSettings>>,
            width:  number,
            height: number
        ): ViewProtocol<EnvironmentStyleSettings, StyleRendererProtocol<EnvironmentStyleSettings>> {

        //
        const top =
            view.height === height ? 0 : Math.floor( ( height - view.height ) / 2 )
        const right =
            Math.floor( ( width - view.width ) / 2 )
        const bottom =
            height - ( top + view.height )
        const left =
            view.width === width ? 0 : width - ( right + view.width )

        const result =
            view.applyMargin( top, right, bottom, left )

        return result
    }

// ────────────────────────────────────────────────────────────────────────────────
