
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PortableStyle }
        from "./portable-style"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    /**
     * SHOULD BE ADDED
     */
    export type StyleRendererOptimizationMethod =
        "inline" | "shared"

//
// ─── STYLE PROTOCOL ─────────────────────────────────────────────────────────────
//

    export interface StyleRendererProtocol <Style extends PortableStyle<any>> {
        readonly defaultStyle: Style

        margeNewStyleOptionsWithPreviosuStyleState ( style: Style,
                                                   options: Partial<Style> ): Style

        encodeCharacterForStyledRender( char: string ): string

        renderLeftStylingInfo( style: Style ): string
        renderRightStylingInfo( style: Style ): string

        wrapRootLinesAndFinalizeRender ( width: number,
                                         lines: string[ ] ): string
    }

// ────────────────────────────────────────────────────────────────────────────────
