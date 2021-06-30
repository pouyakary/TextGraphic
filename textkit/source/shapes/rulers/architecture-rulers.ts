
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "../../views/mono-styled-views/shape-view/main"

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
                                                      text: string = "" ): ShapeView {
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
            return new ShapeView([

            ], 0 )
        }

        return ShapeView.initEmptyBox( )
    }

//
// ─── CREATE VERTICAL LINE WITHOUT TEXT ──────────────────────────────────────────
//

    function createVerticalRulerWithoutText ( size: number, start: string, middle: string, end: string ): ShapeView {
        const lineChars =
            ""
        return new ShapeView([ ], 0)
    }

// ────────────────────────────────────────────────────────────────────────────────
