
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


import * as TextGraphic
    from "../source"

const sampleTimpaniCode =
    `hello *world* how are _you_ I'm ^ ~good~ ^ how about you?`

const terminalOutput =
    TextGraphic.Compilers.compileTimpaniToANSITerminalSequence( sampleTimpaniCode )

console.log( terminalOutput )