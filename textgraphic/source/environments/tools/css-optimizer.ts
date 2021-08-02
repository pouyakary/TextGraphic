
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { INDENTATION }
        from "./indentation"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    interface ClassRegistry {
        [ serializedCSSStyle: string ]: string;
    }

    export type StyleSerializer =
        ( style: string ) => string

//
// ─── STYLE OPTIMIZER ────────────────────────────────────────────────────────────
//

    export class CSSStyleOptimizer {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            #classRegistry:         ClassRegistry
            #generatedClassNames:   Set<string>
            #optimize:              boolean

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( optimize: boolean ) {
                this.#classRegistry =
                    { }
                this.#generatedClassNames =
                    new Set <string> ( )
                this.#optimize =
                    optimize
            }

        //
        // ─── GENERATE ATTRIBUTE ──────────────────────────────────────────
        //

            public generateAttribute ( serializedCSSStyle: string ) {
                if ( serializedCSSStyle === "" ) {
                    return ""
                }

                if ( !this.#optimize ) {
                    return ` style="${serializedCSSStyle}"`
                }

                return ` class="${ this.getClassNameByStyle( serializedCSSStyle ) }"`
            }

        //
        // ─── PROCESS STYLE ───────────────────────────────────────────────
        //

            private getClassNameByStyle ( serializedCSSStyle: string ) {
                if ( serializedCSSStyle in this.#classRegistry ) {
                    return this.#classRegistry[ serializedCSSStyle ]
                } else {
                    const newClassName =
                        this.generateClassName( )
                    this.#classRegistry[ serializedCSSStyle ] =
                        newClassName
                    return newClassName
                }
            }

        //
        // ─── GENERATE RANDOM CLASS NAME ──────────────────────────────────
        //

            private generateClassName ( ): string {
                //
                let name =
                    "tk-"
                for ( let i = 0; i < 4; i++ ) {
                    name += generateRandomCharacter( )
                }

                //
                if ( this.#generatedClassNames.has( name ) ) {
                    return this.generateClassName( )
                } else {
                    this.#generatedClassNames.add( name )
                    return name
                }
            }

        //
        // ─── GET STYLE HEADER ────────────────────────────────────────────
        //

            public generateHeaderStyleTag ( additionalCSSElementStyle: string ): string {
                if ( !this.#optimize && additionalCSSElementStyle === "" ) {
                    return ""
                }

                //
                const addition =
                    additionalCSSElementStyle === "" ? 0 : 1
                const classRows =
                    new Array<string> ( this.#generatedClassNames.size + addition )

                //
                if ( addition === 1 ) {
                    classRows[ 0 ] =
                        INDENTATION + INDENTATION + additionalCSSElementStyle
                }

                //
                if ( this.#optimize ) {
                    let offset =
                        addition
                    for ( const serializedStyle of Object.keys( this.#classRegistry ) ) {
                        const className =
                            this.#classRegistry[ serializedStyle ]
                        classRows[ offset ] =
                            `${ INDENTATION }${ INDENTATION }.${ className } {${ serializedStyle }}`
                        offset += 1
                    }
                }

                //
                const styleTagHead =
                    `\n${ INDENTATION }<style>\n`
                const styleTagContent =
                    classRows.join("\n")
                const styleTagTail =
                    `\n${ INDENTATION }</style>`

                return styleTagHead + styleTagContent + styleTagTail
            }

        // ─────────────────────────────────────────────────────────────────

    }

//
// ─── GENERATE RANDOM CHARACTER ──────────────────────────────────────────────────
//

    function generateRandomCharacter ( ) {
        const startPoint =
            97
        const stopPoint =
            122
        const codePoint =
            startPoint + Math.floor( Math.random( ) * (
                stopPoint - startPoint ) )
        return String.fromCharCode(
            codePoint
        )
    }

// ────────────────────────────────────────────────────────────────────────────────
