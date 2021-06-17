
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "../main"

//
// ─── CENTER TO BOUNDARY BOX ─────────────────────────────────────────────────────
//

    export function centerSpacedBoxToBoundaryBox ( box: SpacedBox,
                                                 width: number,
                                                height: number ) {
        const top =
            Math.floor( height - box.height / 2 )
        const right =
            Math.floor( width - box.width / 2 )
        const bottom =
            height - ( top + box.height )
        const left =
            width - ( right + box.width )
        const result =
            box.applyMargin( top, right, bottom, left )

        return result
    }

// ────────────────────────────────────────────────────────────────────────────────
