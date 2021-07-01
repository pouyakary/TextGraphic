
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextKit
        from "../source"
    import * as Tools
        from "./tools"

//
// ─── DOCS ───────────────────────────────────────────────────────────────────────
//

    //   ┌──────────────────────────────────────────────────────────────────────────────────┐
    //   │                                                                 ●                │
    //   │                   ┌─────────────────────────────────────────────┼─────────────┐  │
    //   │                   │                                             │             │  │
    //   │                   │                     Horizontal Ruler        │             │  │
    //   │                   │                                             │             │  │
    //   │                   └─────────────────────────────────────────────┼─────────────┘  │
    //   │                                 ●                               │                │
    //   │    ┌──────────┐   ┌─────────────┼───────────────────────────────┼─────────────┐  │
    //   │    │          │   │             │                               │             │  │
    //   │    │          │   │             │                               │             │  │
    //   │    │          │   │             │                               │             │  │
    //   │    │          │   │             │                               │             │  │
    //   │    │          │   │             │                               │             │  │
    //   │    │          │   │             │                               │             │  │
    //   │    │          │   │             │                               │             │  │
    //   │    │          │   │             │                               │             │  │
    //   │    │ Vertical │   │             │        Justified Text         │             │  │
    //   │    │  Ruler   │   │             │                               │             │  │
    //   │    │          │   │             │                               │             │  │
    //   │    │          │   │             │                               │             │  │
    //   │  ● │          │ ● │             │                               │             │  │
    //   │  │ │          │ │ │             │                               │             │  │
    //   │  │ │          │ │ │             │                               │             │  │
    //   │  │ │          │ │ │             │                               │             │  │
    //   │  │ │          │ │ │             │                               │             │  │
    //   │  │ │          │ │ │             │                               │             │  │
    //   │  │ └──────────┘ │ └─────────────┼───────────────────────────────┼─────────────┘  │
    //   │  │              │               │                         ●     │                │
    //   └──┼──────────────┼───────────────┼─────────────────────────┼─────┼────────────────┘
    //      │              ▼               │                         │     │
    //      │                              ▼                         └─────┤
    //      │              Horizontal                                      │
    //      │              Spacing         Vertical                        │
    //      ▼                              Spacing                         │
    //                                                                     ▼
    //      Pane Horizontal
    //      Padding                                                        Vertical
    //                                                                     Pane Padding

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const SAMPLE_TEXT =
        `Lorem Ipsum is   simply dummy text   of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley   of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining   essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

    const RULER_STYLES: TextKit.ANSITerminalSetStyleOptions = {
        italic: true,
        foregroundColor: TextKit.ANSITerminalForegroundColor.Blue
    }

    const LEFT_SPACING =
        4

    const VERTICAL_SPACING =
        1
    const HORIZONTAL_SPACING =
        1
    const PANE_VERTICAL_PADDING =
        1
    const PANE_HORIZONTAL_PADDING =
        2

//
// ─── ENVIRONMENT ────────────────────────────────────────────────────────────────
//

    const styler =
        new TextKit.ANSITerminalStyleRenderer( )

//
// ─── HORIZONTAL RULER ───────────────────────────────────────────────────────────
//

    function createHorizontalRuler ( size: number ) {
        const charSet: TextKit.RulerCharSet = {
            originChar: "└",
            middleChar: "─",
            separatorChar: "┴"
        }

        const rulerSettings: TextKit.CharRulerSettings = {
            size: size,
            facing: TextKit.Direction.Down,
            chars: charSet
        }

        const ruler =
            TextKit.createChartRuler( styler, rulerSettings )
                .applyMargin( 0, 0, 0, LEFT_SPACING )
        ruler.style = RULER_STYLES

        return ruler
    }

//
// ─── VERTICAL RULER ─────────────────────────────────────────────────────────────
//

    function createVerticalRuler ( height: number ) {
        const charSet: TextKit.RulerCharSet = {
            originChar: "┐",
            middleChar: "│",
            separatorChar: "┤"
        }

        const rulerSettings: TextKit.CharRulerSettings = {
            size: height,
            facing: TextKit.Direction.Right,
            unit: 3,
            chars: charSet
        }

        const ruler =
            TextKit.createChartRuler( styler, rulerSettings )
                .applyMargin( 0, 0, 0, LEFT_SPACING )
        ruler.style = RULER_STYLES

        return ruler
    }

//
// ─── CREATE TEXT JUSTIFIED ──────────────────────────────────────────────────────
//

    function createTextJustified ( size: number ) {
        const justifiedText =
            TextKit.justifyPlainText(
                SAMPLE_TEXT, size, TextKit.Justification.Center, styler )
            .applyMargin( 0, 0, 0, LEFT_SPACING )

        return justifiedText
    }

//
// ─── TEST ON SIZE ───────────────────────────────────────────────────────────────
//

    async function renderFrame ( size: number ) {
        //
        const horizontalRuler =
            createHorizontalRuler( size )
        const verticalRuler =
            createVerticalRuler( size )
        const justifiedText =
            createTextJustified( size )

        //
        const paneWidth =
            justifiedText.width + verticalRuler.width + HORIZONTAL_SPACING + PANE_HORIZONTAL_PADDING
        const paneHeight =
            justifiedText.height + horizontalRuler.height + VERTICAL_SPACING + ( PANE_VERTICAL_PADDING * 2 )
        const pane =
            new TextKit.PaneView( paneWidth, paneHeight, styler, { } )

        //
        pane.add( verticalRuler,
            PANE_HORIZONTAL_PADDING,
            PANE_VERTICAL_PADDING + horizontalRuler.height + VERTICAL_SPACING,
            1 )

        //
        pane.add( horizontalRuler,
            PANE_HORIZONTAL_PADDING + verticalRuler.width + HORIZONTAL_SPACING,
            PANE_VERTICAL_PADDING,
            1 )

        //
        pane.add( justifiedText,
            PANE_HORIZONTAL_PADDING + verticalRuler.width + HORIZONTAL_SPACING,
            PANE_VERTICAL_PADDING + horizontalRuler.height + VERTICAL_SPACING,
            1 )

        //
        console.clear( )
        console.log( pane.styledForm )

        Tools.setCursorToBottomRight( "TextKit Justifier Clustering Demo " )
        await Tools.sleep( 50 )
    }

//
// ─── TEXT JUSTIFIER ─────────────────────────────────────────────────────────────
//

    main( ); async function main ( ) {
        try {
            await Tools.runRenderLoop( 30, 100, renderFrame )
        } catch ( err ) {
            console.error( err )
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
