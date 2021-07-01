
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "../views/shape-view"
    import { MonoStyleViews }
        from "../index"

//
// ─── CENTER TO BOUNDARY BOX ─────────────────────────────────────────────────────
//

    export function centerMonoStyleViewToBoundaryBox ( box: MonoStyleViews,
                                                     width: number,
                                                    height: number ): ShapeView {
        const top =
            box.height === height ? 0 : Math.floor( ( height - box.height ) / 2 )
        const right =
            Math.floor( ( width - box.width ) / 2 )
        const bottom =
            height - ( top + box.height )
        const left =
            box.width === width ? 0 : width - ( right + box.width )

        const result =
            box.cloneWithAppliedMargin( top, right, bottom, left )

        return result
    }

// ────────────────────────────────────────────────────────────────────────────────
