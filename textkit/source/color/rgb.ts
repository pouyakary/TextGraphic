
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── COLOR CLASS ────────────────────────────────────────────────────────────────
//

    export class RGBColor {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            readonly red:   number
            readonly green: number
            readonly blue:  number

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( red: number, green: number, blue: number ) {
                if ( red >= 0 && red <= 256 ) {
                    this.red =
                        Math.floor( red )
                } else {
                    throw new Error (`24 Bit Color cannot be initiated with red value: ${red}.`)
                }

                if ( blue >= 0 && blue <= 256 ) {
                    this.blue =
                        Math.floor( blue )
                } else {
                    throw new Error (`24 Bit Color cannot be initiated with blue value: ${red}.`)
                }

                if ( green >= 0 && green <= 256 ) {
                    this.green =
                        Math.floor( green )
                } else {
                    throw new Error (`24 Bit Color cannot be initiated with green value: ${red}.`)
                }
            }

        //
        // ─── 24 BIT ──────────────────────────────────────────────────────
        //

            get webRGBForm ( ): string {
                const colorCode =
                    ( "rgb("
                    + this.red.toString( ) + ", " +
                    + this.green.toString( ) + ", " +
                    + this.blue.toString( )
                    + ")"
                    )
                return colorCode
            }

        //
        // ─── HEX VALUE ───────────────────────────────────────────────────
        //

            get hexForm ( ) {
                const red =
                    colorToHexValue( this.red )
                const green =
                    colorToHexValue( this.green )
                const blue =
                    colorToHexValue( this.blue )
                return "#" + red + green + blue
            }

        //
        // ─── RANDOM COLOR ────────────────────────────────────────────────
        //

            public static random ( ) {
                return new RGBColor(
                    Math.random( ) * 256,
                    Math.random( ) * 256,
                    Math.random( ) * 256,
                )
            }

        // ─────────────────────────────────────────────────────────────────

    }

//
// ─── TOOLS ──────────────────────────────────────────────────────────────────────
//

    function colorToHexValue ( color: number ) {
        const hex =
            color.toString( 16 )
        return hex.length === 1 ? "0" + hex : hex
    }

// ────────────────────────────────────────────────────────────────────────────────
