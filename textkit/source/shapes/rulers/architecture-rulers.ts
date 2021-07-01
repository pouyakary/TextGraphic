
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "../../views/mono-style-views/views/shape-view"
    import { StyleRendererProtocol }
        from "../../protocols/style-renderer-protocol"

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

    export function createVerticalArchitectureRuler <EnvironmentStyleSettings extends Object> ( size: number,
                                                                                               chars: ArchitecturalRulerCharSet,
                                                                                              styler: StyleRendererProtocol<EnvironmentStyleSettings>,
                                                                                                text: string = "" ): ShapeView<EnvironmentStyleSettings> {
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

            ], 0, styler, { }, true )
        }

        return ShapeView.initEmptyBox( styler )
    }

//
// ─── CREATE VERTICAL LINE WITHOUT TEXT ──────────────────────────────────────────
//


// ────────────────────────────────────────────────────────────────────────────────
