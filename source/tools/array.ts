
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

// ────────────────────────────────────────────────────────────────────────────────
