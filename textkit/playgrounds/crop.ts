
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextKit
        from "../source"
    import * as Tools
        from "./tools"

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const CANVAS_WIDTH =
        60
    const CANVAS_HEIGHT =
        20

//
// ─── ENV ────────────────────────────────────────────────────────────────────────
//

    const renderer =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── CANVAS ─────────────────────────────────────────────────────────────────────
//

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

        const generator =
            ( i % 2 == 1
                ? TextKit.createShapeViewAlienSample
                : TextKit.createShapeViewBirdSample
                )

        const shape =
            generator( renderer )
        const color =
            TextKit.randomPortableForegroundLabeledColor( )
        shape.addStyle({
            textColor: color
        })

        sampleCanvas.add( shape, x, y, i )
    }

    const text =
        new TextKit.LineView( "A Demo Canvas Being Sliced", renderer, { })
            .applyMargin( 0, 2, 0, 2 )
            .frame( TextKit.Presets.LightBoxPreset )
            .applyMargin( 0, 2, 0, 2 )
    text.transparent = false

    sampleCanvas.add( text,
        Math.floor( ( sampleCanvas.width - text.width ) / 2 ),
        Math.floor( ( sampleCanvas.height - text.height ) / 2 ),
        1000
    )

//
// ─── SLICES ─────────────────────────────────────────────────────────────────────
//

    const [ left, right ] =
        sampleCanvas.sliceHorizontally( Math.floor( sampleCanvas.width / 2 ) )

//
// ─── DEMO RENDER LOOP ───────────────────────────────────────────────────────────
//

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

// ────────────────────────────────────────────────────────────────────────────────
