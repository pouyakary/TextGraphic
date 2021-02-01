
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "../spaced-box"
    import { insertJoinersInBetweenArrayItems }
        from "../../tools/array"

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

//
// ─── GENERATOR ──────────────────────────────────────────────────────────────────
//

    export function createTable ( input: SpacedBoxTable ): SpacedBox {
        completeSpacedBoxTable( input )

        const maxArrays =
            computeMaxArrays( input )

        const renderedRows =
            renderRows( input, maxArrays )
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

    function computeMaxArrays ( input: SpacedBoxTable ): MaxArrays {
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

    function renderRows ( table: SpacedBoxTable, maxArrays: MaxArrays ) {
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
                renderRow( row, rowHeight, columnsMaxWidths )

            renderedRows.push( renderedRow )
        }

        return renderedRows
    }

//
// ─── RENDER ROW ─────────────────────────────────────────────────────────────────
//

    function renderRow ( row: SpacedBoxTableRows, rowHeight: number, columnsMaxWidths: number[ ] ) {
        const strokeLine =
            createMiddleStroke( rowHeight )
        const toBeJoined =
            [ strokeLine ]

        for ( let columnIndex = 0; columnIndex < columnsMaxWidths.length; columnIndex++ ) {
            const column =
                row[ columnIndex ]
            const columnWidth =
                columnsMaxWidths[ columnIndex ]
            const box =
                shapeCellToBoxSize( column, columnWidth, rowHeight )

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

    function shapeCellToBoxSize ( cell: SpacedBox, width: number, height: number) {
        const marginRight =
            width - cell.width
        const marginBottom =
            height - cell.height
        cell.baseline =
            0
        const marginedBox =
            cell.applyMargin( 0, marginRight, marginBottom, 0 )
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
