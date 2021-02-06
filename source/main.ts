
import { SpacedBox, BoxFramePresets, createTable, Justification }
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
    [ "Render", SpacedBox.initWithText( " TABLES ", 1 ).frame( BoxFramePresets.CornersPreset ).applyMargin( 1, 4, 1, 4 ) ]
]

const tableCells =
    tableText.map( row =>
        row.map( cell =>
            typeof cell === "string"
                ? SpacedBox.initWithText( " " + cell + " ", 0 )
                : cell
        )
    )

for ( let i = 0; i < 4; i++ ) {
    const minWidth = 30 + i * 10
    const table = createTable( tableCells, {
        justifications: [ Justification.Right, Justification.Center ],
        minWidth
    })


    console.log( " ", minWidth, "-".repeat( minWidth ) )
    console.log( table.applyMargin( 1, 0, 1, 5 ).plainTextForm )
}
