
//
// ─── RANGE ──────────────────────────────────────────────────────────────────────
//

    export function * tenNumbersInRange ( min: number, max: number ): Generator<number> {
        const counter =
            Math.floor(( max - min ) / 10 )
        for ( let i = min; i < max; i += counter ) {
            yield i
        }
        return max
    }

// ────────────────────────────────────────────────────────────────────────────────
