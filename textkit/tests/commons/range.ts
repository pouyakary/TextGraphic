
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


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
