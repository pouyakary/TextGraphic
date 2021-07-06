
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { Subset }
        from "../tools/types"
    import { PortableStyle }
        from "./portable-style"

//
// ─── STYLE PROTOCOL ─────────────────────────────────────────────────────────────
//

    export interface StyleRendererProtocol <Style extends PortableStyle<any>> {
        readonly defaultStyle: Style

        readonly rootRowRightStylingInfo:    string
        readonly rootRowLeftStylingInfo:     string
        readonly rootRightStylingInfo:       string
        readonly rootLeftStylingInfo:        string

        renderLeftStylingInfo( style: Style ):      string
        renderRightStylingInfo( style?: Style ):    string

        margeNewStyleOptionsWithPreviosuStyleState ( style: Style,
                                                   options: Subset<Style> ): Style

        encodeCharacterForStyledRender( char: string ): string
    }

// ────────────────────────────────────────────────────────────────────────────────
