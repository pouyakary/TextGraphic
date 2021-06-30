
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView, BoxFramePresets, PaneView }
        from "../source/index"

//
// ─── CONST BACKGROUND ───────────────────────────────────────────────────────────
//

    const background =
        new PaneView(
            ShapeView.initBlankRectangle( 7, 4 )
        )

    const sampleBox1 =
        ShapeView.initBlankRectangle( 3, 1 )
            .frame( BoxFramePresets.LightBoxPreset )

    const sampleBox2 =
        ShapeView.initBlankRectangle( 3, 1 )
            .frame( BoxFramePresets.HeavyBoxPreset )

    background.add( sampleBox1, 0, 0, 1 )
    background.add( sampleBox2, 2, 1, 2 )

    background.fineTuneUnicodeBoxes( )

    console.log( background.ANSITerminalForm )

// ────────────────────────────────────────────────────────────────────────────────
