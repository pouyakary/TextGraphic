
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "../shape-view/main"

//
// ─── CENTER TO BOUNDARY BOX ─────────────────────────────────────────────────────
//

    export function centerShapeViewToBoundaryBox ( box: ShapeView,
                                                 width: number,
                                                height: number ) {
        const top =
            box.height === height ? 0 : Math.floor( ( height - box.height ) / 2 )
        const right =
            Math.floor( ( width - box.width ) / 2 )
        const bottom =
            height - ( top + box.height )
        const left =
            box.width === width ? 0 : width - ( right + box.width )

        const result =
            box.applyMargin( top, right, bottom, left )

        return result
    }

// ────────────────────────────────────────────────────────────────────────────────
