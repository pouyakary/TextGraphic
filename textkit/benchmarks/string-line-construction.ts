
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { Benchmark }
        from "./suite"

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const size =
        30000000
    const char =
        "*"
    const benchmark =
        new Benchmark( 10 )


//
// ─── STRING ADDITION ────────────────────────────────────────────────────────────
//

    benchmark.measure ( "Adding to string", ( ) => {
        let sum = ""
        for ( let i = 0; i < size; i++ ) {
            sum += char
        }
    })

//
// ─── STRING JOINING ─────────────────────────────────────────────────────────────
//

    benchmark.measure ( "Adding to an empty array and joining", ( ) => {
        let sum =
            new Array<string> ( )
        for ( let i = 0; i < size; i++ ) {
            sum.push( char )
        }
        sum.join("")
    })

//
// ─── ARRAY INITIATION AND JOINING ───────────────────────────────────────────────
//

    benchmark.measure ( "Initiating an Array and then filling it", ( ) => {
        let sum =
            new Array<string> ( size )
        for ( let i = 0; i < size; i++ ) {
            sum[ i ] = char
        }
        sum.join("")
    })

//
// ─── DONE ───────────────────────────────────────────────────────────────────────
//

    benchmark.showSummary( )

// ────────────────────────────────────────────────────────────────────────────────
