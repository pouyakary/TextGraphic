
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── PORTABLE STYLE ─────────────────────────────────────────────────────────────
//

    export interface PortableStyle <Color> {
        /** Color of the Foreground Text */
        color:              Color
        /** Color of the Background */
        backgroundColor:    Color

        /** Makes the text and some borders bold */
        bold:       boolean
        /** Makes the text italic */
        italic:     boolean
        /** Draws a line under the text */
        underline:  boolean
        /** Makes the text blink (by hiding and showing in a time interval */
        blink:      boolean
    }

// ────────────────────────────────────────────────────────────────────────────────
