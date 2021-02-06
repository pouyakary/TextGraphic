
import { SpacedBox, BoxFramePresets, createTable, HorizontalAlign, VerticalAlign, ResizePolicy }
    from "./renderkit"

// SpacedBox Join Test

const b1 = new SpacedBox( [ '1', '2', '-', '4' ], 2 )
const b2 = new SpacedBox( [ '1', '-', '3', '4', '5' ], 1 )
const b3 = new SpacedBox( [ '1', '-' ], 1 )
const b4 = new SpacedBox( [ '-', '2' ], 0 )
const b5 = new SpacedBox( [ '-', '2', '3' ], 0 )

const box = SpacedBox.concatHorizontally(
    [ b1, b2, b3, b4, b5 ], SpacedBox.initWithText( " + ", 0 )
)

const frame1 =
    box .applyMargin( 0, 4, 0, 4 )
        .frame( BoxFramePresets.CornersPreset )
        .applyMargin( 1, 3, 1, 3 )
        .frame( BoxFramePresets.LightBoxPreset )
        .applyMargin( 1, 0, 1, 5 )

const tableText = [
    [ "Pouya", "Can" ],
    [ "Render", SpacedBox.initWithText( " TABLES ", 1 ).frame( BoxFramePresets.CornersPreset ).applyMargin( 1, 4, 1, 4 ) ],
    [ SpacedBox.initWithText( " *\n* ", 1 ), SpacedBox.initWithText( "Oooo\n   Behave!", 1 ).applyMargin( 0, 0, 1, 0 ) ]
]

const tableCells =
    tableText.map( row =>
        row.map( cell =>
            typeof cell === "string"
                ? SpacedBox.initWithText( " " + cell + " ", 0 )
                : cell
        )
    )

const minWidth = 70
const table = createTable( tableCells, {
    minWidth,
    horizontalAligns: [
        HorizontalAlign.Right,
        HorizontalAlign.Center
    ],
    verticalAligns: [
        VerticalAlign.Center,
        VerticalAlign.Top,
        VerticalAlign.Bottom
    ],
    resizePolicies: [
        ResizePolicy.StandStill,
        ResizePolicy.Stretch,
    ]
})


console.log( )
console.log( " ", minWidth, "-".repeat( minWidth ) )
console.log( table.applyMargin( 1, 0, 1, 5 ).plainTextForm )
