
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "../../views/mono-style-views/views/shape-view"
    import { StyleRendererProtocol, PortableStyle, PortableColor }
        from "../../protocols"
    import { EMPTY_STRING }
        from "../../constants/characters"

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

    export function createVerticalArchitectureRuler <ColorType extends PortableColor, EnvironmentStyleSettings extends PortableStyle<any>> (
            size: number,
            chars: ArchitecturalRulerCharSet,
            styler: StyleRendererProtocol<ColorType, EnvironmentStyleSettings>,
            text: string = EMPTY_STRING
        ): ShapeView<ColorType, EnvironmentStyleSettings> {

        //
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
