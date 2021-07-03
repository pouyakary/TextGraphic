
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextKit
        from "../source"

//
// ─── ENVIRONMENT ────────────────────────────────────────────────────────────────
//

    const styler =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── TESTING TRANSPARENCY ───────────────────────────────────────────────────────
//

    const box1 =
        TextKit.ShapeView.initBlankRectangle( 8, 3, styler )
            .frame( TextKit.Presets.LightBoxPreset )

    box1.style = {
        textColor: "blue"
    }

    const box2 =
        TextKit.ShapeView.initBlankRectangle( 8, 3, styler )
            .frame( TextKit.Presets.LightBoxPreset )
    box2.style = {
        textColor: "red"
    }

    box2.transparent = true


    const box3 =
        TextKit.ShapeView.initBlankRectangle( 8, 3, styler )
            .frame( TextKit.Presets.LightBoxPreset )

    box3.style = {
        textColor: "green"
    }


    const canvas =
        new TextKit.CanvasView( 65, 10, styler )

    canvas.add( box1, 3, 1, 1 )
    canvas.add( box2, 8, 2, 2 )
    canvas.add( box3, 14, 3, 3 )

    const text =
        new TextKit.LineView( "And there goes the transparency! 😎", styler, { } )
    text.style = {
        italic: true,
    }

    canvas.add( text, 27, 4, 3 )

    canvas.fineTuneUnicodeBoxes( )

    console.log( canvas.styledForm )

// ────────────────────────────────────────────────────────────────────────────────
