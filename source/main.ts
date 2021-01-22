
import { SpacedBox } from "./renderkit/spacedbox"

const b1 = new SpacedBox( [ '1', '2', '-', '4' ], 2 )
const b2 = new SpacedBox( [ '1', '-', '3', '4', '5' ], 1 )
const b3 = new SpacedBox( [ '1', '-' ], 1 )
const b4 = new SpacedBox( [ '-', '2' ], 0 )
const b5 = new SpacedBox( [ '-', '2', '3' ], 0 )

const box = SpacedBox.joinBoxesVertically([ b1, b2, b3, b4, b5 ], SpacedBox.initWithText( " + ", 0 ))

console.log( box.plainTextForm )