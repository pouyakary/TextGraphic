
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "../../core-elements/spaced-box/main"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export interface ArchitecturalRulerCharSet {
        start?:     string
        line:       string
        end?:       string
    }

//
// ─── ARCHITECTURE RULERS ────────────────────────────────────────────────────────
//

    export function createVerticalArchitectureRuler ( size: number,
                                                     chars: ArchitecturalRulerCharSet,
                                                      text: string = "" ): SpacedBox {
        const lineChar =
            chars.line
        const startChar =
            chars.start ? chars.start : lineChar
        const endChar =
            chars.end ? chars.end : lineChar

        if ( text.length === 0 ) {
            const line =
                new Array<string>( size )
            for ( let i = 0; i < size; i++ ) {
                if ( i === 0 ) {
                    line.push()
                }
            }
            return new SpacedBox([

            ], 0 )
        }

        return SpacedBox.initEmptyBox( )
    }

//
// ─── CREATE VERTICAL LINE WITHOUT TEXT ──────────────────────────────────────────
//

    function createVerticalRulerWithoutText ( size: number, start: string, middle: string, end: string ): SpacedBox {
        const lineChars =
            ""
        return new SpacedBox([ ], 0)
    }

// ────────────────────────────────────────────────────────────────────────────────
