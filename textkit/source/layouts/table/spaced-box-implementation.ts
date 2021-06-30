
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "../../views/mono-styled-views/shape-view/main"
    import { insertJoinersInBetweenArrayItems }
        from "../../tools/array"
    import { HorizontalAlign, VerticalAlign, ResizingPolicy }
        from "../../shapes/types"
    import { TableCharSet, LightTablePreset }
        from "../../shapes/presets/table-frames"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    type ShapeViewTableRows =
        ShapeView[ ]

    type ShapeViewTable =
        ShapeViewTableRows[ ]

    interface MaxArrays {
        columnsMaxWidths:   number[ ]
        rowsMaxHeights:     number[ ]
    }

    interface TableLines {
        topLine:    ShapeView
        middleLine: ShapeView
        bottomLine: ShapeView
    }

    export interface TableInitSettings {
        minWidth?:              number
        horizontalAligns?:      HorizontalAlign[ ]
        verticalAligns?:        VerticalAlign[ ]
        horizontalResizing?:    ResizingPolicy[ ]
        charSet?:               TableCharSet
    }

    interface TableSettings {
        minWidth:               number
        horizontalAligns:       HorizontalAlign[ ]
        verticalAligns:         VerticalAlign[ ]
        horizontalResizing:     ResizingPolicy[ ]
        charSet:                TableCharSet
    }

//
// ─── GENERATOR ──────────────────────────────────────────────────────────────────
//

    export function createShapeViewTableInTextForm ( rows: ShapeViewTable,
                                                    input: TableInitSettings ): ShapeView {
        if ( rows.length === 0 ) {
            return ShapeView.initEmptyBox( )
        }

        completeShapeViewTable( rows )

        const settings =
            fixTableSettings( rows, input )
        const maxArrays =
            computeMaxArrays( rows, settings )

        const renderedRows =
            renderRows( rows, maxArrays, settings )
        const decorationLines =
            createTableLines( maxArrays, settings.charSet )
        const joinedTableParts =
            joinTableParts( renderedRows, decorationLines )
        const lines =
            flattenShapeViewLines( joinedTableParts )
        const baseline =
            computeNewBaseline( maxArrays )

        const table =
            new ShapeView( lines, baseline )

        return table
    }

//
// ─── FIX SETTINGS ───────────────────────────────────────────────────────────────
//

    function fixTableSettings ( rows: ShapeViewTable,
                               input: TableInitSettings ): TableSettings {

        const horizontalAligns =
            new Array<HorizontalAlign> ( )
        const verticalAligns =
            new Array<VerticalAlign> ( )
        const columns =
            rows[ 0 ].length

        // minWidth
        const minWidth =
            input.minWidth ? input.minWidth : 0

        // character set
        const charSet =
            input.charSet ? input.charSet : LightTablePreset

        // Horizontal Aligns
        if ( input.horizontalAligns ) {
            for ( let index = 0; index < columns; index++ ) {
                horizontalAligns.push( input.horizontalAligns[ index ]
                    ? input.horizontalAligns[ index ]
                    : HorizontalAlign.Left
                )
            }
        } else {
            for ( let index = 0; index < columns; index++ ) {
                horizontalAligns.push( HorizontalAlign.Left )
            }
        }

        // Vertical Aligns
        if ( input.verticalAligns ) {
            for ( let index = 0; index < rows.length; index++ ) {
                verticalAligns.push( input.verticalAligns[ index ]
                    ? input.verticalAligns[ index ]
                    : VerticalAlign.Center
                )
            }
        }
        else {
            for ( let index = 0; index < rows.length; index++ ) {
                verticalAligns.push( VerticalAlign.Center )
            }
        }

        // Resize Policy
        const horizontalResizing =
            new Array<ResizingPolicy> ( )

        if ( input.horizontalResizing ) {
            for ( let index = 0; index < columns; index++ ) {
                horizontalResizing.push( input.horizontalResizing[ index ]
                    ? input.horizontalResizing[ index ]
                    : ResizingPolicy.Stretch
                )
            }
        } else {
            for ( let index = horizontalResizing.length; index < columns; index++ ) {
                horizontalResizing[ index ] =
                    ResizingPolicy.Stretch
            }
        }

        // Done
        return {
            minWidth, verticalAligns, horizontalAligns,
            horizontalResizing, charSet
        }
    }

//
// ─── FLATTEN LINES ──────────────────────────────────────────────────────────────
//

    function flattenShapeViewLines ( boxes: ShapeView[ ] ): string[ ] {
        const lines =
            new Array<string> ( )
        for ( const box of boxes ) {
            for ( const line of box.lines ) {
                lines.push( line )
            }
        }
        return lines
    }

//
// ─── JOIN TABLE PARTS ───────────────────────────────────────────────────────────
//

    function joinTableParts ( renderedRows: ShapeView[ ],
                           decorationLines: TableLines ): ShapeView[ ] {
        const linesWithMiddleDecorations =
            insertJoinersInBetweenArrayItems( renderedRows, decorationLines.middleLine )
        const joinedTableParts = [
            decorationLines.topLine,
            ...linesWithMiddleDecorations,
            decorationLines.bottomLine,
        ]
        return joinedTableParts
    }

//
// ─── COMPUTE NEW BASELINE ───────────────────────────────────────────────────────
//

    function computeNewBaseline ( maxArrays: MaxArrays ): number {
        const sumOfRowHeights =
            maxArrays.rowsMaxHeights.reduce(( sum, row ) => sum + row )
        const sumOfMiddlePartHeights =
            2 + maxArrays.rowsMaxHeights.length - 1
        const newBaseLine =
            Math.floor( ( sumOfRowHeights + sumOfMiddlePartHeights ) / 2 )
        return newBaseLine
    }

//
// ─── COMPUTE MAX ARRAYS ─────────────────────────────────────────────────────────
//

    function computeMaxArrays ( input: ShapeViewTable,
                             settings: TableSettings ): MaxArrays {
        const columnsMaxWidths =
            new Array<number> ( )
        const rowsMaxHeights =
            new Array<number> ( )

        const { minWidth, horizontalResizing: resizePolicy } =
            settings

        //                  ┌───────────┐
        //                  │ Max Width │
        //                  ├───────────┘
        //                  │
        //                  ▼
        //        3   2  5
        //       ┌───┬──┬─────┐
        //     1 │---│--│-----│
        //       ├───┼──┼─────┤  ◀────┬───────────┐
        //     2 │-  │- │-----│       │Max Height │
        //       │   │  │-----│       └───────────┘
        //       └───┴──┴─────┘

        // in this part we have to compute the widths of columns
        // and find the max height in the row

        for ( const row of input ) {
            let maxHeight = 0
            for ( const column of row ) {
                if ( column.height > maxHeight ) {
                    maxHeight = column.height
                }
            }
            rowsMaxHeights.push( maxHeight )
        }

        // max widths
        const width = input[ 0 ].length
        for ( let columnIterator = 0; columnIterator < width; columnIterator++ ) {
            let maxWidth = 0
            for ( const row of input ) {
                const columnWidth =
                    row[ columnIterator ].width
                if ( columnWidth > maxWidth ) {
                    maxWidth = columnWidth
                }
            }
            columnsMaxWidths.push( maxWidth )
        }

        // adding the minWidth
        let currentWidth =
            2 + columnsMaxWidths.reduce(( previousWidth, columnWidth ) =>
                previousWidth + columnWidth + 1 )

        if ( minWidth > currentWidth ) {
            const resizePolicyInBoolean =
                resizePolicy.map( policy =>
                    policy === ResizingPolicy.Stretch )
            const isNotAllStandStill =
                resizePolicyInBoolean.reduce(( sum, current ) =>
                    sum || current )

            if ( isNotAllStandStill ) {
                const stretchWidths = ( ) => {
                    while ( true ) {
                        for ( let index = columnsMaxWidths.length - 1; index >= 0; index-- ) {
                            if ( currentWidth === minWidth ) {
                                return
                            }
                            if ( resizePolicyInBoolean[ index ] ) {
                                columnsMaxWidths[ index ]++
                                currentWidth++
                            }
                        }
                    }
                }
                stretchWidths( )
            }

            columnsMaxWidths[ columnsMaxWidths.length - 1 ] +=
                minWidth - currentWidth
        }

        return {
            columnsMaxWidths, rowsMaxHeights
        }
    }

//
// ─── MAKE COMPLETE TABLE ────────────────────────────────────────────────────────
//

    function completeShapeViewTable ( table: ShapeViewTable ) {
        const width =
            Math.max( ...table.map( row => row.length ) )
        for ( const row of table ) {
            for ( let iterator = row.length; iterator < width; iterator++ ) {
                row.push( ShapeView.initEmptyBox( ) )
            }
        }
        return table
    }

//
// ─── CREATE TABLE LINE ──────────────────────────────────────────────────────────
//

    function createTableLines ( maxArrays: MaxArrays, charSet: TableCharSet ): TableLines {
        const { columnsMaxWidths } =
            maxArrays

        const topMiddleLines =
            makeHorizontalLines( columnsMaxWidths, charSet.top )
        const middleMiddleLines =
            makeHorizontalLines( columnsMaxWidths, charSet.horizontalMiddle )
        const bottomMiddleLines =
            makeHorizontalLines( columnsMaxWidths, charSet.bottom )

        const topLine =
            makeTopBottomLineWith( topMiddleLines,
                charSet.topLeft, charSet.topJoins, charSet.topRight )
        const middleLine =
            makeTopBottomLineWith( middleMiddleLines,
                charSet.leftJoins, charSet.middleJoins, charSet.rightJoins )
        const bottomLine =
            makeTopBottomLineWith( bottomMiddleLines,
                charSet.bottomLeft, charSet.bottomJoins, charSet.bottomRight )

        return {
            topLine, middleLine, bottomLine
        }
    }


    function makeTopBottomLineWith ( middleLines: string[ ],
                                            left: string,
                                          middle: string,
                                           right: string ): ShapeView {
        const line =
            left + middleLines.join( middle ) + right
        const box =
            new ShapeView( [ line ], 0 )
        return box
    }


    function makeHorizontalLines ( columnsMaxWidths: number[ ],
                                          character: string ): string[ ] {
        return columnsMaxWidths.map( width =>
            character.repeat( width ) )
    }

//
// ─── RENDER ROWS ────────────────────────────────────────────────────────────────
//

    function renderRows ( table: ShapeViewTable,
                      maxArrays: MaxArrays,
                       settings: TableSettings ) {

        const { rowsMaxHeights, columnsMaxWidths } =
            maxArrays
        const renderedRows =
            new Array<ShapeView> ( )

        for ( let rowIndex = 0; rowIndex < table.length; rowIndex++ ) {
            const row =
                table[ rowIndex ]
            const rowHeight =
                rowsMaxHeights[ rowIndex ]
            const renderedRow =
                renderRow( row, rowIndex, rowHeight, columnsMaxWidths, settings )

            renderedRows.push( renderedRow )
        }

        return renderedRows
    }

//
// ─── RENDER ROW ─────────────────────────────────────────────────────────────────
//

    function renderRow ( row: ShapeViewTableRows,
                    rowIndex: number,
                   rowHeight: number,
            columnsMaxWidths: number[ ],
                    settings: TableSettings ) {

        const leftStrokeLine =
            createVerticalStrokeLine( rowHeight, settings.charSet.left )
        const middleStrokeLine =
            createVerticalStrokeLine( rowHeight, settings.charSet.verticalMiddle )
        const rightStrokeLine =
            createVerticalStrokeLine( rowHeight, settings.charSet.right )
        const toBeJoined =
            [ leftStrokeLine ]

        const columns =
            columnsMaxWidths.length
        for ( let columnIndex = 0; columnIndex < columns; columnIndex++ ) {
            const column =
                row[ columnIndex ]
            const columnWidth =
                columnsMaxWidths[ columnIndex ]
            const horizontalAlign =
                settings.horizontalAligns[ columnIndex ]
            const verticalAlign =
                settings.verticalAligns[ rowIndex ]
            const box =
                column.alignInBox(
                    columnWidth, rowHeight, horizontalAlign, verticalAlign
                )

            toBeJoined.push( box )

            const verticalLine =
                ( columnIndex === columns - 1
                    ?  rightStrokeLine
                    : middleStrokeLine
                    )
            toBeJoined.push( verticalLine )
        }

        const renderedRow =
            ShapeView.concatHorizontally( toBeJoined, ShapeView.initEmptyBox( ) )

        return renderedRow
    }

//
// ─── ROW MIDDLE STROKE LINE ─────────────────────────────────────────────────────
//

    function createVerticalStrokeLine ( height: number, character: string ) {
        const lines =
            [ ]
        for ( let line = 0; line < height; line++ ) {
            lines.push( character )
        }
        const box =
            new ShapeView( lines, 0 )
        return box
    }

// ────────────────────────────────────────────────────────────────────────────────
