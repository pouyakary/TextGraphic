
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "../spaced-box"
    import { insertJoinersInBetweenArrayItems }
        from "../../tools/array"
    import { Justification }
        from "../types"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    type SpacedBoxTableRows =
        SpacedBox[ ]

    type SpacedBoxTable =
        SpacedBoxTableRows[ ]

    interface MaxArrays {
        columnsMaxWidths:   number[ ]
        rowsMaxHeights:     number[ ]
    }

    interface TableLines {
        topLine:    SpacedBox
        middleLine: SpacedBox
        bottomLine: SpacedBox
    }

    export interface TableInitSettings {
        minWidth?:          number
        justifications?:    Justification[ ]
    }

    interface TableSettings {
        minWidth:           number
        justifications:     Justification[ ]
    }

//
// ─── GENERATOR ──────────────────────────────────────────────────────────────────
//

    export function createTable ( rows: SpacedBoxTable, input: TableInitSettings ): SpacedBox {
        if ( rows.length === 0 ) {
            return SpacedBox.initEmptyBox( )
        }

        completeSpacedBoxTable( rows )

        const settings =
            fixTableSettings( rows, input )

        const maxArrays =
            computeMaxArrays( rows, settings.minWidth )

        const renderedRows =
            renderRows( rows, maxArrays, settings.justifications )
        const decorationLines =
            createTableLines( maxArrays )
        const joinedTableParts =
            joinTableParts( renderedRows, decorationLines )
        const lines =
            flattenSpacedBoxLines( joinedTableParts )
        const baseline =
            computeNewBaseline( maxArrays )

        const table =
            new SpacedBox( lines, baseline )

        return table
    }

//
// ─── FIX SETTINGS ───────────────────────────────────────────────────────────────
//

    function fixTableSettings ( rows: SpacedBoxTable, input: TableInitSettings ): TableSettings {
        const minWidth =
            input.minWidth ? input.minWidth : 0
        const justifications =
            new Array<Justification> ( )
        const columns =
            rows[ 0 ].length

        if ( input.justifications ) {
            for ( let index = 0; index < columns; index++ ) {
                justifications.push( input.justifications[ index ]
                    ? input.justifications[ index ]
                    : Justification.Left
                )
            }
        } else {
            for ( let index = 0; index < columns; index++ ) {
                justifications.push( Justification.Left )
            }
        }

        return {
            minWidth, justifications
        }
    }

//
// ─── FLATTEN LINES ──────────────────────────────────────────────────────────────
//

    function flattenSpacedBoxLines ( boxes: SpacedBox[ ] ): string[ ] {
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

    function joinTableParts ( renderedRows: SpacedBox[ ], decorationLines: TableLines ): SpacedBox[ ] {
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

    function computeMaxArrays ( input: SpacedBoxTable, minWidth: number ): MaxArrays {
        const columnsMaxWidths =
            new Array<number> ( )
        const rowsMaxHeights =
            new Array<number> ( )

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
            const stretchWidths = ( ) => {
                while ( true ) {
                    for ( let index = columnsMaxWidths.length - 1; index >= 0; index-- ) {
                        if ( currentWidth === minWidth ) {
                            return
                        }
                        columnsMaxWidths[ index ]++
                        currentWidth++
                    }
                }
            }
            stretchWidths( )
        }

        return {
            columnsMaxWidths, rowsMaxHeights
        }
    }

//
// ─── MAKE COMPLETE TABLE ────────────────────────────────────────────────────────
//

    function completeSpacedBoxTable ( table: SpacedBoxTable ) {
        const width =
            Math.max( ...table.map( row => row.length ) )
        for ( const row of table ) {
            for ( let iterator = row.length; iterator < width; iterator++ ) {
                row.push( SpacedBox.initEmptyBox( ) )
            }
        }
        return table
    }

//
// ─── CREATE TABLE LINE ──────────────────────────────────────────────────────────
//

    function createTableLines ( maxArrays: MaxArrays ): TableLines {
        const middleLines =
            maxArrays.columnsMaxWidths.map( width =>
                "─".repeat( width ) )

        const topLine =
            makeTopBottomLineWith( middleLines, "┌", "┬", "┐" )
        const middleLine =
            makeTopBottomLineWith( middleLines, "├", "┼", "┤" )
        const bottomLine =
            makeTopBottomLineWith( middleLines, "└", "┴", "┘" )

        return {
            topLine, middleLine, bottomLine
        }
    }

    function makeTopBottomLineWith ( middleLines: string[ ], left: string, middle: string, right: string ): SpacedBox {
        const line =
            left + middleLines.join( middle ) + right
        const box =
            new SpacedBox( [ line ], 0 )
        return box
    }

//
// ─── RENDER ROWS ────────────────────────────────────────────────────────────────
//

    function renderRows ( table: SpacedBoxTable,
                      maxArrays: MaxArrays,
                 justifications: Justification[ ] ) {

        const { rowsMaxHeights, columnsMaxWidths } =
            maxArrays
        const renderedRows =
            new Array<SpacedBox> ( )

        for ( let rowIndex = 0; rowIndex < table.length; rowIndex++ ) {
            const row =
                table[ rowIndex ]
            const rowHeight =
                rowsMaxHeights[ rowIndex ]
            const renderedRow =
                renderRow( row, rowHeight, columnsMaxWidths, justifications )

            renderedRows.push( renderedRow )
        }

        return renderedRows
    }

//
// ─── RENDER ROW ─────────────────────────────────────────────────────────────────
//

    function renderRow ( row: SpacedBoxTableRows,
                   rowHeight: number,
            columnsMaxWidths: number[ ],
              justifications: Justification[ ] ) {

        const strokeLine =
            createMiddleStroke( rowHeight )
        const toBeJoined =
            [ strokeLine ]

        for ( let columnIndex = 0; columnIndex < columnsMaxWidths.length; columnIndex++ ) {
            const column =
                row[ columnIndex ]
            const columnWidth =
                columnsMaxWidths[ columnIndex ]
            const justification =
                justifications[ columnIndex ]
            const box =
                shapeCellToBoxSize( column, columnWidth, rowHeight, justification )

            toBeJoined.push( box )
            toBeJoined.push( strokeLine )
        }

        const renderedRow =
            SpacedBox.concatHorizontally( toBeJoined, SpacedBox.initEmptyBox( ) )

        return renderedRow
    }

//
// ─── SHAPE CELL TO SIZE ─────────────────────────────────────────────────────────
//

    function shapeCellToBoxSize ( cell: SpacedBox,
                                 width: number,
                             rowHeight: number,
                         justification: Justification ) {

        let marginRight = 0, marginLeft = 0

        const horizontalEmptySpace =
            width - cell.width
        const verticalEmptySpace =
            rowHeight - cell.height

        switch ( justification ) {
            case Justification.Left:
                marginRight =
                    horizontalEmptySpace
                break;
            case Justification.Center:
                marginLeft =
                    Math.floor( horizontalEmptySpace / 2 )
                marginRight =
                    horizontalEmptySpace - marginLeft
                break;
            case Justification.Right:
                marginLeft =
                    horizontalEmptySpace
                break;
        }


        const marginTop =
            Math.floor( verticalEmptySpace / 2 )
        const marginBottom =
            verticalEmptySpace - marginTop

        const marginedBox =
            cell.applyMargin( marginTop, marginRight, marginBottom, marginLeft )

        marginedBox.baseline = 0
        return marginedBox
    }

//
// ─── CREATE MIDDLE STROKE ───────────────────────────────────────────────────────
//

    function createMiddleStroke ( height: number ) {
        const lines =
            [ ]
        for ( let line = 0; line < height; line++ ) {
            lines.push( "│" )
        }
        const box =
            new SpacedBox( lines, 0 )
        return box
    }

// ────────────────────────────────────────────────────────────────────────────────
