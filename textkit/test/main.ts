
import { SpacedBox, BoxFramePresets, ANSITerminalForegroundColor, LayeredPane } from
    "../source"

let background =
    SpacedBox.initWithEmptySpaceSurface( 20, 5 )
        .frame( BoxFramePresets.LightBoxPreset )
const drawingPane =
    new LayeredPane( background )

const helloChild =
    new SpacedBox([ "Hello" ], 0)
        .frame( BoxFramePresets.LightBoxPreset )
        .setANSITerminalStyle({
            bold: true,
            foregroundColor: ANSITerminalForegroundColor.Blue
        })
drawingPane.add( helloChild, 3, 1, 1 )

const worldChild =
    new SpacedBox([ "World" ], 0)
        .frame( BoxFramePresets.LightBoxPreset )
        .setANSITerminalStyle({
            italic: true,
            foregroundColor: ANSITerminalForegroundColor.Red
        })
drawingPane.add( worldChild, 7, 2, 2 )

const outOfBoxChild =
    new SpacedBox([ "Out of Box" ], 0)
        .frame( BoxFramePresets.LightBoxPreset )
        .setANSITerminalStyle({
            foregroundColor: ANSITerminalForegroundColor.Green
        })
drawingPane.add( outOfBoxChild, 17, 2, 3 )


let secondPaneBackground =
    SpacedBox.initWithEmptySpaceSurface( 40, 10 )
        .frame( BoxFramePresets.LightBoxPreset )
const secondDrawingPane =
    new LayeredPane( secondPaneBackground )

secondDrawingPane.add( drawingPane, 10, 3, 1 )

console.log({ code: drawingPane.ANSITerminalForm.split("\n")})
console.log( drawingPane.ANSITerminalForm )
console.log( secondDrawingPane.ANSITerminalForm )
