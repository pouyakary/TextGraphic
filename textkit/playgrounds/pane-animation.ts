
import { ShapeView, BoxFramePresets, ANSITerminalForegroundColor, CanvasView, ANSITerminalStyleRenderer, LineView } from
    "../source"

const wait = ( ms: number ) =>
    new Promise( resolve => setTimeout( resolve, ms ) )

const styler =
    new ANSITerminalStyleRenderer( )

main( ); async function main ( ) {
    for ( let iteration = 0; true; iteration++ ) {
        // 1
        const firstCanvasBackground =
            ShapeView.initBlankRectangle( 20, 5, styler )
                .frame( BoxFramePresets.LightBoxPreset )
        const firstCanvas =
            CanvasView.initWithBackground( firstCanvasBackground, styler )

        const topLeftCanvasObject =
            new ShapeView([ " * " ], 0, styler, { }, false )
                .frame( BoxFramePresets.LightBoxPreset )
        topLeftCanvasObject.style = {
            foregroundColor: ANSITerminalForegroundColor.Blue
        }
        firstCanvas.add( topLeftCanvasObject, -5 + ( iteration % 30 ), 1, 1 )

        // 2
        const secondCanvasBackground =
            ShapeView.initBlankRectangle( 20, 5, styler )
                .frame( BoxFramePresets.LightBoxPreset )
        const secondCanvas =
            CanvasView.initWithBackground( secondCanvasBackground, styler )

        const secondCanvasObject =
            new ShapeView([ " * " ], 0, styler, { }, false )
                .frame( BoxFramePresets.LightBoxPreset )
        secondCanvasObject.style = {
            foregroundColor: ANSITerminalForegroundColor.Red
        }
        secondCanvas.add( secondCanvasObject, 3, -3 + ( iteration % 20), 1 )

        // 3
        const thirdCanvasBackground =
            ShapeView.initBlankRectangle( 20, 5, styler )
                .frame( BoxFramePresets.LightBoxPreset )
        const thirdCanvas =
            CanvasView.initWithBackground( thirdCanvasBackground, styler )

        const thirdCanvasObjectOne =
            new ShapeView([ " * " ], 0, styler, { }, false )
                .frame( BoxFramePresets.LightBoxPreset )
        thirdCanvasObjectOne.style ={
            foregroundColor: ANSITerminalForegroundColor.Green
        }
        thirdCanvas.add( thirdCanvasObjectOne, -4 + ( iteration % 30 ), 3, 1 )
        const thirdCanvasObjectTwo =
            new ShapeView([ " * " ], 0, styler, { }, false )
                .frame( BoxFramePresets.LightBoxPreset )
        thirdCanvasObjectTwo.style = {
            foregroundColor: ANSITerminalForegroundColor.Blue
        }
        thirdCanvas.add( thirdCanvasObjectTwo, 24 - ( iteration % 30 ), 2 , 1 )

        // text
        const title =
            new LineView(  "Multi Layer Animation Grouping in Pouya's TextKit", styler, { } )
        title.style = {
            italic:         true,
            foregroundColor: ANSITerminalForegroundColor.Red
        }

        // Main Canvas
        const mainCanvasBackground =
            ShapeView.initBlankRectangle( 77, 10, styler )
        const mainCanvas =
            CanvasView.initWithBackground( mainCanvasBackground, styler )

        mainCanvas.add( title, 15, 1, 1 )
        mainCanvas.add( firstCanvas, 4, 2, 1 )
        mainCanvas.add( secondCanvas, 29, 2, 1 )
        mainCanvas.add( thirdCanvas, 53, 2, 1 )

        mainCanvas.fineTuneUnicodeBoxes()

        console.clear( )
        console.log( mainCanvas.styledForm )

        await wait( 120 )
    }
}
