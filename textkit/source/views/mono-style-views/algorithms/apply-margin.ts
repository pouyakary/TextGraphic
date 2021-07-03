

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { MonoStyleViews }
        from ".."
    import { ShapeView }
        from "../views/shape-view"
    import { createEmptyStringLine }
        from "../../../tools/string"
    import { PortableStyle }
        from "../../../protocols"

//
// ─── APPLY MARGIN ───────────────────────────────────────────────────────────────
//

    export function applyMarginToMonoStyleView <EnvironmentStyleSettings extends PortableStyle<any>> (
            box:    MonoStyleViews<EnvironmentStyleSettings>,
            top:    number,
            right:  number,
            bottom: number,
            left:   number,
        ): ShapeView<EnvironmentStyleSettings> {

        //
        const topBottomSpaceLines =
            createEmptyStringLine( left + box.width + right )
        const leftSpaceLines =
            createEmptyStringLine( left )
        const rightSpaceLines =
            createEmptyStringLine( right )
        const lines =
            new Array<string> ( )

        // top
        for ( let counter = 0; counter < top; counter++ ) {
            lines.push( topBottomSpaceLines )
        }

        // middle
        for ( const line of box.lines ) {
            lines.push( leftSpaceLines + line + rightSpaceLines )
        }

        // bottom
        for ( let counter = 0; counter < bottom; counter++ ) {
            lines.push( topBottomSpaceLines )
        }

        //
        return new ShapeView(
            lines, box.baseline + top, box.styleRenderer, box.style, false
        )
    }

// ────────────────────────────────────────────────────────────────────────────────
