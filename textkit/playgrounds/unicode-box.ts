
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView, BoxFramePresets, CanvasView, ANSITerminalStyleRenderer }
        from "../source/index"

//
// ─── ENVIRONMENTS ───────────────────────────────────────────────────────────────
//

    const styler =
        new ANSITerminalStyleRenderer( )

//
// ─── CONST BACKGROUND ───────────────────────────────────────────────────────────
//

    const background =
        new CanvasView( 7, 4, styler )

    const sampleBox1 =
        ShapeView.initBlankRectangle( 3, 1, styler )
            .frame( BoxFramePresets.LightBoxPreset )

    const sampleBox2 =
        ShapeView.initBlankRectangle( 3, 1, styler )
            .frame( BoxFramePresets.HeavyBoxPreset )

    background.add( sampleBox1, 0, 0, 1 )
    background.add( sampleBox2, 2, 1, 2 )

    background.fineTuneUnicodeBoxes( )

    console.log( background.styledForm )

// ────────────────────────────────────────────────────────────────────────────────
