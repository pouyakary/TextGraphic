
import { compileTimpaniToANSITerminalSequence }
    from "../source"

const sampleTimpaniCode =
    `hello *world* how are _you_ I'm ^ ~good~ ^ how about you?`

const terminalOutput =
    compileTimpaniToANSITerminalSequence( sampleTimpaniCode )

console.log( terminalOutput )