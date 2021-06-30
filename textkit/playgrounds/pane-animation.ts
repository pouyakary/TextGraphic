
import { ShapeView, BoxFramePresets, ANSITerminalForegroundColor, PaneView } from
    "../source"

const wait = ( ms: number ) =>
    new Promise( resolve => setTimeout( resolve, ms ) )

main( ); async function main ( ) {
    for ( let iteration = 0; true; iteration++ ) {
        // 1
        const firstPaneBackground =
            ShapeView.initBlankRectangle( 20, 5 )
                .frame( BoxFramePresets.LightBoxPreset )
        const firstPane =
            new PaneView( firstPaneBackground )
        const topLeftPaneObject =
            new ShapeView([ " * " ], 0)
                .frame( BoxFramePresets.LightBoxPreset )
                .setANSITerminalStyle({ foregroundColor: ANSITerminalForegroundColor.Blue })
        firstPane.add( topLeftPaneObject, -5 + ( iteration % 30 ), 1, 1 )

        // 2
        const secondPaneBackground =
            ShapeView.initBlankRectangle( 20, 5 )
                .frame( BoxFramePresets.LightBoxPreset )
        const secondPane =
            new PaneView( secondPaneBackground )
        const secondPaneObject =
            new ShapeView([ " * " ], 0)
                .frame( BoxFramePresets.LightBoxPreset )
                .setANSITerminalStyle({ foregroundColor: ANSITerminalForegroundColor.Red })
        secondPane.add( secondPaneObject, 3, -3 + ( iteration % 20), 1 )

        // 3
        const thirdPaneBackground =
            ShapeView.initBlankRectangle( 20, 5 )
                .frame( BoxFramePresets.LightBoxPreset )
        const thirdPane =
            new PaneView( thirdPaneBackground )
        const thirdPaneObjectOne =
            new ShapeView([ " * " ], 0)
                .frame( BoxFramePresets.LightBoxPreset )
                .setANSITerminalStyle({
                    foregroundColor: ANSITerminalForegroundColor.Green
                })
        thirdPane.add( thirdPaneObjectOne, -4 + ( iteration % 30 ), 3, 1 )
        const thirdPaneObjectTwo =
            new ShapeView([ " * " ], 0)
                .frame( BoxFramePresets.LightBoxPreset )
                .setANSITerminalStyle({
                    foregroundColor: ANSITerminalForegroundColor.Blue
                })
        thirdPane.add( thirdPaneObjectTwo, 24 - ( iteration % 30 ), 2 , 1 )

        // text
        const title =
            ShapeView.initWithText( "Multi Layer Animation Grouping in Pouya's TextKit", 0 )
                .setANSITerminalStyle({
                    italic:         true,
                    foregroundColor: ANSITerminalForegroundColor.Red
                })

        // Main Pane
        const mainPaneBackground =
            ShapeView.initBlankRectangle( 77, 10 )
        const mainPane =
            new PaneView( mainPaneBackground )

        mainPane.add( title, 15, 1, 1 )
        mainPane.add( firstPane, 4, 2, 1 )
        mainPane.add( secondPane, 29, 2, 1 )
        mainPane.add( thirdPane, 53, 2, 1 )

        mainPane.fineTuneUnicodeBoxes()

        console.clear( )
        console.log( mainPane.ANSITerminalForm )

        await wait( 120 )
    }
}
