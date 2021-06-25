
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextKit
        from "../source"

//
// ─── SAMPLE ─────────────────────────────────────────────────────────────────────
//

    const SAMPLE_TEXT =
        `Lorem Ipsum is   simply dummy text   of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley   of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining   essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

//
// ─── HEADER ─────────────────────────────────────────────────────────────────────
//

    const LEFT_SPACING =
        "   "

    function header ( size: number ) {
        const leftPadSize =
            Math.ceil( ( size - size.toString( ).length - 4 ) / 2 )
        const rightPadSize =
            size - leftPadSize

        console.log( LEFT_SPACING + "◀︎" + "─".repeat( leftPadSize ) + " " + size.toString( ) + " " + "─".repeat( rightPadSize ) + "▶︎" )
    }

//
// ─── MOVE CURSOR ────────────────────────────────────────────────────────────────
//

    function moveCursor ( ) {
        const text =
            "TextKit Justifier Clustering Demo "
        process.stdout.write(
            `\x1b[${ process.stdout.rows - 1 };${ process.stdout.columns - text.length - 1 }H`
        )
        process.stdout.write(
            text
        )
    }

//
// ─── TEST ON SIZE ───────────────────────────────────────────────────────────────
//

    const sleep = ( ) =>
        new Promise ( resolve =>
            setTimeout( resolve, 70 ) )

    async function testOnSize ( lineSize: number ) {
        const justifiedText =
            TextKit.clusterWordsToLinesOfSize( lineSize, SAMPLE_TEXT )

        console.clear( )
        console.log( )
        header( lineSize )
        let lines =
            LEFT_SPACING
        for ( const word of justifiedText ) {
            lines += word
            if ( word === "\n" ) {
                lines += LEFT_SPACING
            }
        }
        console.log( lines )

        moveCursor( )
        await sleep( )
    }

//
// ─── TEXT JUSTIFIER ─────────────────────────────────────────────────────────────
//

    const MIN_LINE_SIZE =
        30
    const MAX_LINE_SIZE =
        110

    main( ); async function main ( ) {
        while ( true ) {
            for ( let lineSize = MIN_LINE_SIZE; lineSize < MAX_LINE_SIZE; lineSize++ ) {
                await testOnSize( lineSize )
            }

            for ( let lineSize = MAX_LINE_SIZE; lineSize > MIN_LINE_SIZE; lineSize-- ) {
                await testOnSize( lineSize )
            }
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
