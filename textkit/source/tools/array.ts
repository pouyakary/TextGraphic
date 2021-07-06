
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── INSERT IN BETWEEN ──────────────────────────────────────────────────────────
//

    export function insertJoinersInBetweenArrayItems <X> ( array: X[ ], joiner: X ): X[ ] {
        if ( array.length === 0 ) {
            return array
        }

        const newArray =
            [ array[ 0 ] ]

        for ( let iterator = 1; iterator < array.length; iterator++ ) {
            newArray.push( joiner )
            newArray.push( array[ iterator ] )
        }

        return newArray
    }

//
// ─── LONGEST LINE ───────────────────────────────────────────────────────────────
//

    export function getLongestLineOfArray ( lines: string[ ] ) {
        let max = 0
        for ( const line of lines ) {
            const lineLength =
                [ ...line ].length
            if ( lineLength > max ) {
                max = lineLength
            }
        }

        return max
    }

// ────────────────────────────────────────────────────────────────────────────────
