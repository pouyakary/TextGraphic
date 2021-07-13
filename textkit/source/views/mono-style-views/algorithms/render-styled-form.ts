
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { MonoStyleViews }
        from ".."
    import { PortableStyle }
        from "../../../protocols"
    import { LINE_BREAK_CHARACTER }
        from "../../../constants/characters"

//
// ─── RENDER STYLED FORM ─────────────────────────────────────────────────────────
//

    export function renderStyledFormForMultiLineMonoStyleViews <ColorType, EnvironmentStyleSettings extends PortableStyle<ColorType>> (
        view:                   MonoStyleViews<ColorType, EnvironmentStyleSettings>,
        getRow:                 ( y: number ) => string,
        leftStylingInfoCache:   string,
        rightStylingInfoCache:  string,
    ): string {
    //
        const styledLines =
            new Array<string> ( view.height )
        const { rootLeftStylingInfo, rootRowLeftStylingInfo,
                rootRowRightStylingInfo, rootRightStylingInfo } =
            view.styleRenderer

        for ( let row = 0; row < view.height; row++ ) {
            const encodedLine =
                getRow( row )
                    .replace( /./g,
                        view.styleRenderer.encodeCharacterForStyledRender
                    )
            styledLines[ row ] =
                ( rootRowLeftStylingInfo
                + leftStylingInfoCache
                + encodedLine
                + rightStylingInfoCache
                + rootRowRightStylingInfo
                )
        }

        return  ( rootLeftStylingInfo
                + styledLines.join( LINE_BREAK_CHARACTER )
                + rootRightStylingInfo
                )
    }

// ────────────────────────────────────────────────────────────────────────────────
