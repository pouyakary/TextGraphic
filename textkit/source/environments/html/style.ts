
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { PortableColor, PortableStyle }
        from "../../protocols"

//
// ─── EXPORT TYPES ───────────────────────────────────────────────────────────────
//

    export type HTMLTextDecorationLineStyle =
        "wavy" | "dashed" | "solid"

    export type HTMLTextDecorationLineType =
        "overline" | "line-through" | "underline" | "none"

//
// ─── STYLE ──────────────────────────────────────────────────────────────────────
//

    export interface HTMLStyleSettings extends PortableStyle<PortableColor> {
        line:           HTMLTextDecorationLineType
        lineStyle:      HTMLTextDecorationLineStyle
    }

//
// ─── MERGE PREVIOUS STATE WITH THE NEW ──────────────────────────────────────────
//

    export function mergeNewWebStyleOptionsWithThePreviousSettings (
            previous: HTMLStyleSettings,
            newStyle: Partial<HTMLStyleSettings>
        ): HTMLStyleSettings {

        //
        return {
            textColor:          newStyle.textColor          ? newStyle.textColor        : previous.textColor,
            backgroundColor:    newStyle.backgroundColor    ? newStyle.backgroundColor  : previous.backgroundColor,
            bold:               newStyle.bold               ? newStyle.bold             : previous.bold,
            italic:             newStyle.italic             ? newStyle.italic           : previous.italic,
            underline:          newStyle.underline          ? newStyle.underline        : previous.underline,
            blink:              newStyle.blink              ? newStyle.blink            : previous.blink,
            line:               newStyle.line               ? newStyle.line             : previous.line,
            lineStyle:          newStyle.lineStyle          ? newStyle.lineStyle        : previous.lineStyle,
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
