
const { SpacedBox, BoxFramePresets, ANSITerminalForegroundColor, LayeredPane } =
    require( "../out/compiled/index.js" )

let background =
    SpacedBox.initEmptySpaceSurface( 20, 5 )
            .frame( BoxFramePresets.LightBoxPreset )
const drawingPane =
    LayeredPane.initWithSpacedBox( background )

const helloChild =
    new SpacedBox([ "Hello" ], 0)
    .frame( BoxFramePresets.LightBoxPreset )
    .setANSITerminalStyle({ bold: true, foregroundColor: ANSITerminalForegroundColor.Blue })
drawingPane.insertChildAt( helloChild, 3, 1, 1 )

const worldChild =
    new SpacedBox([ "World" ], 0)
    .frame( BoxFramePresets.LightBoxPreset )
    .setANSITerminalStyle({ italic: true, foregroundColor: ANSITerminalForegroundColor.Red })
drawingPane.insertChildAt( worldChild, 7, 2, 2 )

const outOfBoxChild =
    new SpacedBox([ "Out of Box" ], 0)
    .frame( BoxFramePresets.LightBoxPreset )
    .setANSITerminalStyle({ foregroundColor: ANSITerminalForegroundColor.Green })
drawingPane.insertChildAt( outOfBoxChild, 17, 2, 3 )

console.clear( )
console.log( drawingPane.ANSITerminalForm )