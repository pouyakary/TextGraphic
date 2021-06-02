
const { SpacedBox, BoxFramePresets, createTableInTextForm, HorizontalAlign,
         VerticalAlign, ResizePolicy, TableCharSet, KaryGothic, ANSITerminalBackgroundColor, ANSITerminalForegroundColor, LayeredPane } =
    require( "../out/compiled/index.js" )

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
    [ "Name", "Surname", "E-mails" ],
    [ "Pouya", "Kary", "- pouya@kary.us\n - kary@gnu.org" ]
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
const table = createTableInTextForm( tableCells, {
    minWidth,
    charSet: KaryGothic,
})


console.log( )
console.log( " ", minWidth, "•".repeat( minWidth ) )
console.log( table.applyMargin( 1, 0, 1, 5 ).plainTextForm )


const stylingTestBox =
    new SpacedBox([ " Hello, World! "], 0 )

stylingTestBox.setANSITerminalStyle({
    bold: true,
    blink: true,
    foregroundColor:    ANSITerminalForegroundColor.Red,
})

console.log({ code: stylingTestBox.ANSITerminalForm })
console.log( stylingTestBox.ANSITerminalForm )

let background =
    SpacedBox.initEmptySpaceSurface( 20, 5 )
            .frame( BoxFramePresets.LightBoxPreset )
const pane =
    LayeredPane.initWithSpacedBox( background )

const helloChild =
    new SpacedBox(["Hello"], 0)
    .frame( BoxFramePresets.LightBoxPreset )
pane.insertChildAt( helloChild, 3, 1, 1 )

const worldChild =
    new SpacedBox(["World"], 0)
    .frame( BoxFramePresets.LightBoxPreset )
pane.insertChildAt( worldChild, 7, 2, 2 )

const outOfBoxChild =
    new SpacedBox(["Out of Box"], 0)
    .frame( BoxFramePresets.LightBoxPreset )
pane.insertChildAt( outOfBoxChild, 17, 2, 3 )

console.log( pane.plainTextForm )