
import { ShapeView, BoxFramePresets, ANSITerminalForegroundColor, PaneView } from
    "../source"

let background =
    ShapeView.initBlankRectangle( 20, 5 )
        .frame( BoxFramePresets.LightBoxPreset )
const drawingPane =
    new PaneView( background )

const helloChild =
    new ShapeView([ "Hello" ], 0)
        .frame( BoxFramePresets.LightBoxPreset )
        .setANSITerminalStyle({
            bold: true,
            foregroundColor: ANSITerminalForegroundColor.Blue
        })
drawingPane.add( helloChild, 3, 1, 1 )

const worldChild =
    new ShapeView([ "World" ], 0)
        .frame( BoxFramePresets.LightBoxWithRoundCornerPreset )
        .setANSITerminalStyle({
            italic: true,
            foregroundColor: ANSITerminalForegroundColor.Red
        })
drawingPane.add( worldChild, 7, 2, 2 )

const outOfBoxChild =
    new ShapeView([ "Out of Box" ], 0)
        .frame( BoxFramePresets.DoubleLineBoxPreset )
        .setANSITerminalStyle({
            foregroundColor: ANSITerminalForegroundColor.Green
        })
drawingPane.add( outOfBoxChild, 17, 2, 3 )

drawingPane.fineTuneUnicodeBoxes( )

// drawingPane.fineTuneUnicodeBoxes( )

let secondPaneBackground =
    ShapeView.initBlankRectangle( 40, 8 )
        .frame( BoxFramePresets.HHeavyVLightBoxPreset )
        .setANSITerminalStyle({
            foregroundColor: ANSITerminalForegroundColor.Red
        })
const secondDrawingPane =
    new PaneView( secondPaneBackground )

secondDrawingPane.add( drawingPane, 5, 1, 1 )
secondDrawingPane.add( drawingPane, 16, 2, 2 )

secondDrawingPane.fineTuneUnicodeBoxes( )

console.log( "\nA demo layered pane:\n")
console.log( drawingPane.ANSITerminalForm )
console.log( "\nThat same pane, putted inside another pane, twice:\n")
console.log( secondDrawingPane.ANSITerminalForm )
console.log( )