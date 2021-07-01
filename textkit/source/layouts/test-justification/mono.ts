
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { Justification }
        from "../../protocols/justification"
    import { ShapeView }
        from "../../views/mono-style-views/views/shape-view"

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const IS_WORD_SPACE =
        /^\s+$/

//
// ─── MONO STYLED TEXT JUSTIFICATION ─────────────────────────────────────────────
//

    export function justifyPlainText ( text: string,
                                      width: number,
                              justification: Justification ): ShapeView {
        //
        const lines =
            new Array<string> ( )
        let buffer =
            new Array<string> ( )
        let bufferLength =
            0

        //
        function flushBufferOnCarriageReturn ( ) {
            // not including the right trailing white space
            if ( IS_WORD_SPACE.test( buffer[ buffer.length - 1 ] ) ) {
                const lastWord =
                    buffer.pop( )
                if ( lastWord ) {
                    bufferLength -=
                        lastWord.length
                }
            }

            // justify the content
            const line =
                spaceLineForPlainTextJustification(
                    buffer, bufferLength, width, justification )
            lines.push( line )

            // rest buffer
            buffer =
                [ ]
            bufferLength =
                0
        }

        //
        function appendWordToBuffer ( word: string ) {
            buffer.push( word )
            bufferLength +=
                word.length
        }

        //
        for ( const word of clusterWordsToLinesOfSize( width, text ) ) {
            if ( word === "\n" ) {
                flushBufferOnCarriageReturn( )
            } else {
                appendWordToBuffer( word )
            }
        }
        if ( buffer.length > 0 ) {
            flushBufferOnCarriageReturn( )
        }

        //
        return new ShapeView( lines, 0 )
    }

//
// ─── SPACE LINES ────────────────────────────────────────────────────────────────
//

    function spaceLineForPlainTextJustification ( lineBuffer: string[ ],
                                                  lineLength: number,
                                                       width: number,
                                               justification: Justification ): string {
        // Justification: Left
        if ( justification === Justification.Left ) {
            const line =
                lineBuffer.join( "" )
            const rightSpacing =
                " ".repeat( width - lineLength )
            return line + rightSpacing
        }

        // Justification: Right
        if ( justification === Justification.Right ) {
            const line =
                lineBuffer.join( "" )
            const leftSpacing =
                " ".repeat( width - lineLength )
            return leftSpacing + line
        }

        // Justification: Center
        if ( justification === Justification.Center ) {
            const line =
                lineBuffer.join( "" )
            const leftSpacing =
                " ".repeat( Math.floor( ( width - lineLength ) / 2 ) )
            const rightSpacingWidth =
                width - leftSpacing.length - line.length
            const rightSpacing =
                rightSpacingWidth > 0 ? " ".repeat( rightSpacingWidth ) : ""
            return leftSpacing + line + rightSpacing
        }

        // Justification: Justified
        if ( justification === Justification.Justified ) {
            let lineSize =
                lineLength
            for ( let i = 0; true; i++ ) {
                const wordIndex =
                    i % lineBuffer.length
                if ( IS_WORD_SPACE.test( lineBuffer[ wordIndex ] ) ) {
                    lineBuffer[ wordIndex ] += " "
                    lineSize += 1
                }
                if ( lineSize > width -1 ) {
                    return lineBuffer.join( "" )
                }
            }
        }

        //
        throw new Error(
            `TEXTKIT RUNTIME ERROR: JUSTIFICATION ${ Justification[ justification ].toUpperCase( ) } NOT IMPLEMENTED`
        )
    }

//
// ─── TEST JUSTIFIER ─────────────────────────────────────────────────────────────
//

    export function * clusterWordsToLinesOfSize ( lineSize: number ,
                                                      text: string ): Generator<string> {
        //
        const words =
            separateWordsBySpaceAndIncludeSpacesInResult( text )
        let currentLineSize =
            0

        //
        function flushNewLine ( ) {
            currentLineSize =
                0
            return "\n"
        }

        function updateOnReturn ( word: string ) {
            currentLineSize +=
                word.length
            return word
        }

        //
        for ( const word of words ) {
            if ( currentLineSize + word.length > lineSize ) {
                yield flushNewLine( )
                if ( ! IS_WORD_SPACE.test( word ) ) {
                    yield updateOnReturn( word )
                }
            } else {
                yield updateOnReturn( word )
            }
        }
    }

//
// ─── SEPARATE WORDS BY SPACE ────────────────────────────────────────────────────
//

    export function separateWordsBySpaceAndIncludeSpacesInResult ( text: string ): string[ ] {
        const results =
            new Array<string> ( )
        let previousCharWasSpace =
            false
        let buffer =
            ""

        //
        function flushBuffer ( ) {
            if ( buffer !== "" ) {
                results.push( buffer )
            }
            buffer = ""
        }

        //
        function flushBufferIfPreviousCharacterWasSpace ( ) {
            if ( previousCharWasSpace ) {
                flushBuffer( )
            }
            previousCharWasSpace =
                false
        }

        //
        for ( const char of text ) {
            if ( char === " " || char === "\t" ) {
                if ( previousCharWasSpace ) {
                    buffer += char
                } else {
                    flushBuffer( )
                    buffer += char
                }
                previousCharWasSpace =
                true
            }

            else if ( char === "\n" ) {
                flushBufferIfPreviousCharacterWasSpace( )
                flushBuffer( )
                results.push( "\n" )
            }

            else {
                flushBufferIfPreviousCharacterWasSpace( )
                buffer += char
            }
        }

        flushBuffer( )

        return results
    }

// ────────────────────────────────────────────────────────────────────────────────
