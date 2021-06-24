
//
// ─── TEST JUSTIFIER ─────────────────────────────────────────────────────────────
//

    export function clusterWordsToLinesOfSize ( lineSize: number ,
                                                    text: string ): string[ ] {
        //
        const results =
            new Array<string> ( )

        return results
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

        function flushBuffer ( ) {
            if ( buffer !== "" ) {
                results.push( buffer )
            }
            buffer = ""
        }

        function flushBufferIfPreviousCharacterWasSpace ( ) {
            if ( previousCharWasSpace ) {
                flushBuffer( )
            }
            previousCharWasSpace =
                false
        }

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
