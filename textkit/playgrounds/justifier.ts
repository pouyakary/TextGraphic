
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
    //      Canvas Horizontal
    //      Padding                                                        Vertical
    //                                                                     Canvas Padding

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const SAMPLE_TEXT =
        `Lorem Ipsum is   simply dummy text   of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley   of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining   essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

    const RULER_STYLES = {
        italic: true,
        textColor: "blue" as TextKit.PortableColor
    }

    const LEFT_SPACING =
        4

    const VERTICAL_SPACING =
        1
    const HORIZONTAL_SPACING =
        1
    const CANVAS_VERTICAL_PADDING =
        1
    const CANVAS_HORIZONTAL_PADDING =
        2

//
// ─── ENVIRONMENT ────────────────────────────────────────────────────────────────
//

    const styler =
        new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

//
// ─── HORIZONTAL RULER ───────────────────────────────────────────────────────────
//

    function createHorizontalRuler ( size: number ) {
        const charSet: TextKit.Shapes.RulerCharSet = {
            originChar: "└",
            middleChar: "─",
            separatorChar: "┴"
        }

        const rulerSettings: TextKit.Shapes.CharRulerSettings = {
            size: size,
            facing: TextKit.Direction.Down,
            chars: charSet
        }

        const ruler =
            TextKit.Shapes.createChartRuler( styler, rulerSettings )
                .applyMargin( 0, 0, 0, LEFT_SPACING )
        ruler.style = RULER_STYLES

        return ruler
    }

//
// ─── VERTICAL RULER ─────────────────────────────────────────────────────────────
//

    function createVerticalRuler ( height: number ) {
        const charSet: TextKit.Shapes.RulerCharSet = {
            originChar: "┐",
            middleChar: "│",
            separatorChar: "┤"
        }

        const rulerSettings: TextKit.Shapes.CharRulerSettings = {
            size: height,
            facing: TextKit.Direction.Right,
            unit: 3,
            chars: charSet
        }

        const ruler =
            TextKit.Shapes.createChartRuler( styler, rulerSettings )
                .applyMargin( 0, 0, 0, LEFT_SPACING )
        ruler.style = RULER_STYLES

        return ruler
    }

//
// ─── CREATE TEXT JUSTIFIED ──────────────────────────────────────────────────────
//

    function createTextJustified ( size: number ) {
        const justifiedText =
            TextKit.Layouts.createMonoStyleJustificationLayout(
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
        const canvasWidth =
            justifiedText.width + verticalRuler.width + HORIZONTAL_SPACING + CANVAS_HORIZONTAL_PADDING
        const canvasHeight =
            justifiedText.height + horizontalRuler.height + VERTICAL_SPACING + ( CANVAS_VERTICAL_PADDING * 2 )
        const canvas =
            new TextKit.CanvasView( canvasWidth, canvasHeight, styler )

        //
        canvas.add( verticalRuler,
            CANVAS_HORIZONTAL_PADDING,
            CANVAS_VERTICAL_PADDING + horizontalRuler.height + VERTICAL_SPACING,
            1 )

        //
        canvas.add( horizontalRuler,
            CANVAS_HORIZONTAL_PADDING + verticalRuler.width + HORIZONTAL_SPACING,
            CANVAS_VERTICAL_PADDING,
            1 )

        //
        canvas.add( justifiedText,
            CANVAS_HORIZONTAL_PADDING + verticalRuler.width + HORIZONTAL_SPACING,
            CANVAS_VERTICAL_PADDING + horizontalRuler.height + VERTICAL_SPACING,
            1 )

        //
        console.clear( )
        console.log( canvas.styledForm )

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
