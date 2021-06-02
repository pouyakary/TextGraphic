
const { SpacedBox, BoxFramePresets, ANSITerminalForegroundColor, LayeredPane } =
require( "../out/compiled/index.js" )

const wait = ms =>
    new Promise( resolve => setTimeout( resolve, ms ) )

main( ); async function main ( ) {
    for ( let iteration = 0; true; iteration++ ) {
        // 1
        const firstPaneBackground =
            SpacedBox.initEmptySpaceSurface( 20, 5 )
                .frame( BoxFramePresets.LightBoxPreset )
        const firstPane =
            LayeredPane.initWithSpacedBox( firstPaneBackground )
        const topLeftPaneObject =
            new SpacedBox([ " * " ], 0)
                .frame( BoxFramePresets.LightBoxPreset )
                .setANSITerminalStyle({ foregroundColor: ANSITerminalForegroundColor.Blue })
        firstPane.insertChildAt( topLeftPaneObject, -5 + ( iteration % 30 ), 1, 1 )

        // 2
        const secondPaneBackground =
            SpacedBox.initEmptySpaceSurface( 20, 5 )
                .frame( BoxFramePresets.LightBoxPreset )
        const secondPane =
            LayeredPane.initWithSpacedBox( secondPaneBackground )
        const secondPaneObject =
            new SpacedBox([ " * " ], 0)
                .frame( BoxFramePresets.LightBoxPreset )
                .setANSITerminalStyle({ foregroundColor: ANSITerminalForegroundColor.Red })
        secondPane.insertChildAt( secondPaneObject, 3, -3 + ( iteration % 20), 1 )

        // 3
        const thirdPaneBackground =
            SpacedBox.initEmptySpaceSurface( 20, 5 )
                .frame( BoxFramePresets.LightBoxPreset )
        const thirdPane =
            LayeredPane.initWithSpacedBox( thirdPaneBackground )
        const thirdPaneObject =
            new SpacedBox([ " * " ], 0)
                .frame( BoxFramePresets.LightBoxPreset )
                .setANSITerminalStyle({ foregroundColor: ANSITerminalForegroundColor.Red })
        thirdPane.insertChildAt( thirdPaneObject, -3 + ( iteration % 20 ) * 3, -3 + ( iteration % 20 ), 1 )

        // text
        const title =
            new SpacedBox([ "Multi Layer Animation Grouping in Pouya's TextKit"])
                .setANSITerminalStyle({ italic: true, foregroundColor: ANSITerminalForegroundColor.Red })

        // Main Pane
        const mainPaneBackground =
            SpacedBox.initEmptySpaceSurface( 77, 9 )
        const mainPane =
            LayeredPane.initWithSpacedBox( mainPaneBackground )

        mainPane.insertChildAt( title, 15, 1, 1 )
        mainPane.insertChildAt( firstPane, 4, 2, 1 )
        mainPane.insertChildAt( secondPane, 29, 2, 1 )
        mainPane.insertChildAt( thirdPane, 53, 2, 1 )

        console.clear( )
        console.log( mainPane.ANSITerminalForm )

        await wait( 100 )
    }
}
