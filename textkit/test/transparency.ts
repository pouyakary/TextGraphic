
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ANSITerminalForegroundColor, BoxFramePresets, LayeredPane, SpacedBox }
        from "../source"

//
// ─── TESTING TRANSPARENCY ───────────────────────────────────────────────────────
//

    const box1 =
        SpacedBox.initWithEmptySpaceSurface( 8, 3 )
            .frame( BoxFramePresets.LightBoxPreset )
            .setANSITerminalStyle({
                foregroundColor: ANSITerminalForegroundColor.Blue
            })

    const box2 =
        SpacedBox.initWithEmptySpaceSurface( 8, 3 )
            .frame( BoxFramePresets.LightBoxPreset )
            .setANSITerminalStyle({
                foregroundColor: ANSITerminalForegroundColor.Red
            })

    box2.transparent = true


    const box3 =
        SpacedBox.initWithEmptySpaceSurface( 8, 3 )
            .frame( BoxFramePresets.LightBoxPreset )
            .setANSITerminalStyle({
                foregroundColor: ANSITerminalForegroundColor.Green
            })

    const pane =
        new LayeredPane(
            SpacedBox.initWithEmptySpaceSurface( 65, 10 )
        )

    pane.add( box1, 3, 2, 1 )
    pane.add( box2, 8, 3, 2 )
    pane.add( box3, 14, 4, 3 )

    const text =
        SpacedBox.initWithText( "And there goes the transparency! 😎", 0 )
        .setANSITerminalStyle({
            italic: true,
            foregroundColor: ANSITerminalForegroundColor.Black
        })

    pane.add( text, 27, 5, 3 )

    pane.fineTuneUnicodeBoxes( )

    console.log( pane.ANSITerminalForm )

// ────────────────────────────────────────────────────────────────────────────────
