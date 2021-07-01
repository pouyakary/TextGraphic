
import { ShapeView, BoxFramePresets, ANSITerminalForegroundColor, PaneView, ANSITerminalStyleRenderer, LineView } from
    "../source"

const wait = ( ms: number ) =>
    new Promise( resolve => setTimeout( resolve, ms ) )

const styler =
    new ANSITerminalStyleRenderer( )

main( ); async function main ( ) {
    for ( let iteration = 0; true; iteration++ ) {
        // 1
        const firstPaneBackground =
            ShapeView.initBlankRectangle( 20, 5, styler )
                .frame( BoxFramePresets.LightBoxPreset )
        const firstPane =
            PaneView.initWithBackground( firstPaneBackground, styler )

        const topLeftPaneObject =
            new ShapeView([ " * " ], 0, styler, { }, false )
                .frame( BoxFramePresets.LightBoxPreset )
        topLeftPaneObject.style = {
            foregroundColor: ANSITerminalForegroundColor.Blue
        }
        firstPane.add( topLeftPaneObject, -5 + ( iteration % 30 ), 1, 1 )

        // 2
        const secondPaneBackground =
            ShapeView.initBlankRectangle( 20, 5, styler )
                .frame( BoxFramePresets.LightBoxPreset )
        const secondPane =
            PaneView.initWithBackground( secondPaneBackground, styler )

        const secondPaneObject =
            new ShapeView([ " * " ], 0, styler, { }, false )
                .frame( BoxFramePresets.LightBoxPreset )
        secondPaneObject.style = {
            foregroundColor: ANSITerminalForegroundColor.Red
        }
        secondPane.add( secondPaneObject, 3, -3 + ( iteration % 20), 1 )

        // 3
        const thirdPaneBackground =
            ShapeView.initBlankRectangle( 20, 5, styler )
                .frame( BoxFramePresets.LightBoxPreset )
        const thirdPane =
            PaneView.initWithBackground( thirdPaneBackground, styler )

        const thirdPaneObjectOne =
            new ShapeView([ " * " ], 0, styler, { }, false )
                .frame( BoxFramePresets.LightBoxPreset )
        thirdPaneObjectOne.style ={
            foregroundColor: ANSITerminalForegroundColor.Green
        }
        thirdPane.add( thirdPaneObjectOne, -4 + ( iteration % 30 ), 3, 1 )
        const thirdPaneObjectTwo =
            new ShapeView([ " * " ], 0, styler, { }, false )
                .frame( BoxFramePresets.LightBoxPreset )
        thirdPaneObjectTwo.style = {
            foregroundColor: ANSITerminalForegroundColor.Blue
        }
        thirdPane.add( thirdPaneObjectTwo, 24 - ( iteration % 30 ), 2 , 1 )

        // text
        const title =
            new LineView(  "Multi Layer Animation Grouping in Pouya's TextKit", styler, { } )
        title.style = {
            italic:         true,
            foregroundColor: ANSITerminalForegroundColor.Red
        }

        // Main Pane
        const mainPaneBackground =
            ShapeView.initBlankRectangle( 77, 10, styler )
        const mainPane =
            PaneView.initWithBackground( mainPaneBackground, styler )

        mainPane.add( title, 15, 1, 1 )
        mainPane.add( firstPane, 4, 2, 1 )
        mainPane.add( secondPane, 29, 2, 1 )
        mainPane.add( thirdPane, 53, 2, 1 )

        mainPane.fineTuneUnicodeBoxes()

        console.clear( )
        console.log( mainPane.styledForm )

        await wait( 120 )
    }
}
