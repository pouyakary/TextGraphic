
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { Justification }
        from "../../protocols/justification"
    import { StyleRendererProtocol }
        from "../../protocols/style-renderer-protocol"
    import { ShapeView }
        from "../../views/mono-style-views/views/shape-view"
    import { WHITE_SPACE_CHARACTER, LINE_BREAK_CHARACTER, TAB_CHARACTER, EMPTY_STRING }
        from "../../constants/characters"

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const IS_WORD_SPACE =
        /^\s+$/

//
// ─── MONO STYLED TEXT JUSTIFICATION ─────────────────────────────────────────────
//

    export function createMonoStyleJustificationLayout <EnvironmentStyleSettings extends Object> (
            text:           string,
            width:          number,
            justification:  Justification,
            styler:         StyleRendererProtocol<EnvironmentStyleSettings>
        ): ShapeView<EnvironmentStyleSettings> {

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
            if ( word === LINE_BREAK_CHARACTER ) {
                flushBufferOnCarriageReturn( )
            } else {
                appendWordToBuffer( word )
            }
        }
        if ( buffer.length > 0 ) {
            flushBufferOnCarriageReturn( )
        }

        //
        return new ShapeView( lines, 0, styler, { }, false )
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
                lineBuffer.join( EMPTY_STRING )
            const rightSpacing =
                WHITE_SPACE_CHARACTER.repeat( width - lineLength )
            return line + rightSpacing
        }

        // Justification: Right
        if ( justification === Justification.Right ) {
            const line =
                lineBuffer.join( EMPTY_STRING )
            const leftSpacing =
                WHITE_SPACE_CHARACTER.repeat( width - lineLength )
            return leftSpacing + line
        }

        // Justification: Center
        if ( justification === Justification.Center ) {
            const line =
                lineBuffer.join( EMPTY_STRING )
            const leftSpacing =
                WHITE_SPACE_CHARACTER.repeat( Math.floor( ( width - lineLength ) / 2 ) )
            const rightSpacingWidth =
                width - leftSpacing.length - line.length
            const rightSpacing =
                rightSpacingWidth > 0
                    ? WHITE_SPACE_CHARACTER.repeat( rightSpacingWidth )
                    : EMPTY_STRING
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
                    lineBuffer[ wordIndex ] += WHITE_SPACE_CHARACTER
                    lineSize += 1
                }
                if ( lineSize > width -1 ) {
                    return lineBuffer.join( EMPTY_STRING )
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
            return LINE_BREAK_CHARACTER
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
            EMPTY_STRING

        //
        function flushBuffer ( ) {
            if ( buffer !== EMPTY_STRING ) {
                results.push( buffer )
            }
            buffer = EMPTY_STRING
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
            if ( char === WHITE_SPACE_CHARACTER || char === TAB_CHARACTER ) {
                if ( previousCharWasSpace ) {
                    buffer += char
                } else {
                    flushBuffer( )
                    buffer += char
                }
                previousCharWasSpace =
                true
            }

            else if ( char === LINE_BREAK_CHARACTER ) {
                flushBufferIfPreviousCharacterWasSpace( )
                flushBuffer( )
                results.push( LINE_BREAK_CHARACTER )
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
