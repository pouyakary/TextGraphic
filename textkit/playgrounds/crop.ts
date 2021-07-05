
import * as TextKit
    from "../source"
import * as Tools
    from "./tools"

const CANVAS_WIDTH =
    40
const CANVAS_HEIGHT =
    20

const renderer =
    new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

const sampleCanvas =
    new TextKit.CanvasView( CANVAS_WIDTH, CANVAS_HEIGHT, renderer )

const alien =
    TextKit.createShapeViewAlienSample( renderer )
alien.addStyle({ textColor: "blue" })

const bird =
    TextKit.createShapeViewBirdSample( renderer )
bird.addStyle({ textColor: "green" })

for ( let i = 0; i < 30; i++ ) {
    const x =
        -5 + Math.floor( Math.random( ) * ( CANVAS_WIDTH + 10 ) )
    const y =
        -5 + Math.floor( Math.random( ) * ( CANVAS_HEIGHT + 10 ) )
    if ( i % 2 == 1 ) {
        sampleCanvas.add( bird, x, y, i )
    } else {
        sampleCanvas.add( alien, x, y, i )
    }
}

const [ left, right ] =
    sampleCanvas.sliceHorizontally( 10 )

Tools.runRenderLoop( 0, 10, async spacing => {
    const masterCanvas =
        new TextKit.CanvasView( CANVAS_WIDTH + spacing , CANVAS_HEIGHT,  renderer )

    masterCanvas.add( right, left.width + spacing, 0, 0 )
    masterCanvas.add( left, 0, 0, 0 )

    console.clear( )
    console.log( masterCanvas.styledForm )
    Tools.setCursorToBottomRight( "TextKit Demo: Canvas View Cropping and Slicing ")
    await Tools.sleep( 150 )
})