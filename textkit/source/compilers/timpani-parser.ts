
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORT ─────────────────────────────────────────────────────────────────────
//

    import { EMPTY_STRING }
        from "../constants/characters"
    import * as EscapeSequences
        from "../environments/ansi-terminal/escape-sequences"

//
// ─── INTERFACES ─────────────────────────────────────────────────────────────────
//

    export type TimpaniStyleType =
        "normal" | "bold" | "underline" | "italic" | "highlighted"

    export interface TimpaniToken {
        type:   TimpaniStyleType
        parts:  ( TimpaniToken | string )[ ]
    }

    /**
     * ```
     * [ ANSIStartTag, StringText ]
     * ```
     */
    export interface FlattenANSITerminalNode {
        terminalTag:    string
        text:           string
    }

//
// ─── ENTRY POINT ────────────────────────────────────────────────────────────────
//

    export function parseTimpaniMarkup ( timpaniCode: string ): TimpaniToken[ ] {
        return new TimpaniLanguageParser( timpaniCode ).parse( )
    }


    export function parseTimpaniToANSITerminal ( timpaniCode: string ): FlattenANSITerminalNode[] {
        const timpaniTree =
            parseTimpaniMarkup( timpaniCode )
        const flattenANSIArray =
            convertTimpaniTreeToFLattenANSITerminal( timpaniTree )
        return flattenANSIArray
    }


    export function compileTimpaniToANSITerminalSequence ( timpaniCode: string ): string {
        const parsedANSITerminal =
            parseTimpaniToANSITerminal( timpaniCode )
        let terminalOutput =
            EMPTY_STRING
        for ( const part of parsedANSITerminal ) {
            terminalOutput += part.terminalTag + part.text + EscapeSequences.Reset
        }
        return terminalOutput
    }
//
// ─── PARSER CORE ────────────────────────────────────────────────────────────────
//

    class TimpaniLanguageParser {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            #code:                  string
            #pointer:               number
            #length:                number
            #results:               TimpaniToken[ ]
            #currentStringStack:    string

        //
        // ─── INIT ────────────────────────────────────────────────────────
        //

            constructor ( code: string ) {
                this.#code =
                    code
                this.#length =
                    code.length
                this.#pointer =
                    0
                this.#results =
                    new Array<TimpaniToken>( )
                this.#currentStringStack =
                    EMPTY_STRING
            }

        //
        // ─── PARSE ───────────────────────────────────────────────────────
        //

            public parse ( ): TimpaniToken[ ] {
                this.switchLooper( )
                this.finalizeCurrentStack( )
                return this.#results
            }

        //
        // ─── GET NEXT CHAR ───────────────────────────────────────────────
        //

            private getNextChar ( ) {
                return this.#code[ this.#pointer++ ]
            }

        //
        // ─── FINALIZE CURRENT STACK ──────────────────────────────────────
        //

            private finalizeCurrentStack ( ) {
                if ( this.#currentStringStack !== EMPTY_STRING ) {
                    this.#results.push({
                        type: "normal",
                        parts: [ this.#currentStringStack ]
                    })
                }
                this.#currentStringStack = EMPTY_STRING
            }

        //
        // ─── SWITCH LOOPER ───────────────────────────────────────────────
        //

            private switchLooper ( ) {
                this.loop( char => {
                    switch ( char ) {
                        case "*":
                            this.finalizeCurrentStack( )
                            this.#results.push(
                                this.parseOneCharSignedGrammar( "*", "bold" )
                            )
                            break

                        case "_":
                            this.finalizeCurrentStack( )
                            this.#results.push(
                                this.parseOneCharSignedGrammar( "_", "underline" )
                            )
                            break

                        case "~":
                            this.finalizeCurrentStack( )
                            this.#results.push(
                                this.parseOneCharSignedGrammar( "~", "italic" )
                            )
                            break


                        case "^":
                            this.finalizeCurrentStack( )
                            this.#results.push(
                                this.parseOneCharSignedGrammar( "^", "highlighted" )
                            )
                            break

                        default:
                            this.#currentStringStack += char
                            break
                    }
                })
            }

        //
        // ─── LOOP ────────────────────────────────────────────────────────
        //

            private loop ( f: ( char: string ) => void | number ) {
                while ( this.#pointer < this.#length ) {
                    const currentChar =
                        this.getNextChar( )
                    const breakStatus =
                        f( currentChar )

                    if ( breakStatus === 0 )
                        break
                }
            }

        //
        // ─── ONE STRING SIGNED GRAMMAR ───────────────────────────────────
        //

            private parseOneCharSignedGrammar ( sign: string, type: TimpaniStyleType ): TimpaniToken {
                let token =
                    EMPTY_STRING
                let oneCharResult: TimpaniToken = {
                    // just a dummy
                    type: "normal",
                    parts: [ EMPTY_STRING ]
                }

                this.loop( char => {
                    if ( char === sign ) {
                        oneCharResult = {
                            type:   type,
                            parts:  new TimpaniLanguageParser( token ).parse( )
                        }
                        return 0

                    } else {
                        token += char
                    }
                })

                return oneCharResult
            }

        // ─────────────────────────────────────────────────────────────────

    }

//
// ─── CONVERT TIMPANI TREE TO FLATTEN ANSI TERMINAL CODE ─────────────────────────
//

    function convertTimpaniTreeToFLattenANSITerminal (
            tree:           TimpaniToken[ ],
            parentANSITag:  string = EMPTY_STRING,
        ): FlattenANSITerminalNode[ ] {

        //
        let result =
            new Array<FlattenANSITerminalNode> ( )

        for ( const rootPart of tree ) {
            const terminalTag =
                generateANSITerminalStartingTagFromTimpaniCode(
                    rootPart.type, parentANSITag
                )

            for ( const subPart of rootPart.parts ) {
                if ( typeof subPart === "string" ) {
                    result.push({
                        terminalTag:    terminalTag,
                        text:           subPart
                    })
                } else {
                    const sequence =
                        convertTimpaniTreeToFLattenANSITerminal([ subPart ], terminalTag )
                    result =
                        result.concat( sequence )
                }
            }
        }

        return result
    }

//
// ─── GENERATE ANSI TERMINAL STARTING TAG BASED ON TIMPANI CODE ──────────────────
//

    function generateANSITerminalStartingTagFromTimpaniCode (
            code:       TimpaniStyleType,
            parentTag:  string
        ): string {

        //
        switch ( code ) {
            case "bold":
                return parentTag + EscapeSequences.Bold
            case "italic":
                return parentTag + EscapeSequences.Italic
            case "underline":
                return parentTag + EscapeSequences.Underline
            case "highlighted":
                return parentTag + EscapeSequences.Reversed
            case "normal":
                return parentTag
        }
    }

// ────────────────────────────────────────────────────────────────────────────────