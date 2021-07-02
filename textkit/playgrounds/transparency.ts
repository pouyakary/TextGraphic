
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ANSITerminalForegroundColor, BoxFramePresets, CanvasView
           , ShapeView, ANSITerminalStyleRenderer, LineView
           }
        from "../source"

//
// ─── ENVIRONMENT ────────────────────────────────────────────────────────────────
//

    const styler =
        new ANSITerminalStyleRenderer( )

//
// ─── TESTING TRANSPARENCY ───────────────────────────────────────────────────────
//

    const box1 =
        ShapeView.initBlankRectangle( 8, 3, styler )
            .frame( BoxFramePresets.LightBoxPreset )

    box1.style = {
        foregroundColor: ANSITerminalForegroundColor.Blue
    }

    const box2 =
        ShapeView.initBlankRectangle( 8, 3, styler )
            .frame( BoxFramePresets.LightBoxPreset )
    box2.style = {
        foregroundColor: ANSITerminalForegroundColor.Red
    }

    box2.transparent = true


    const box3 =
        ShapeView.initBlankRectangle( 8, 3, styler )
            .frame( BoxFramePresets.LightBoxPreset )

    box3.style = {
        foregroundColor: ANSITerminalForegroundColor.Green
    }


    const canvas =
        new CanvasView( 65, 10, styler )

    canvas.add( box1, 3, 1, 1 )
    canvas.add( box2, 8, 2, 2 )
    canvas.add( box3, 14, 3, 3 )

    const text =
        new LineView( "And there goes the transparency! 😎", styler, { } )
    text.style = {
        italic: true,
        foregroundColor: ANSITerminalForegroundColor.Black
    }

    canvas.add( text, 27, 4, 3 )

    canvas.fineTuneUnicodeBoxes( )

    console.log( canvas.styledForm )

// ────────────────────────────────────────────────────────────────────────────────
