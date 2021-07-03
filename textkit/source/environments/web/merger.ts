
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { WebStyleSettings }
        from "./style"
    import { Subset }
        from "../../tools/types"

//
// ─── MERGE PREVIOUS STATE WITH THE NEW ──────────────────────────────────────────
//

    export function mergeNewWebStyleOptionsWithThePreviousSettings (
            previous: WebStyleSettings,
            newStyle: Subset<WebStyleSettings>
        ): WebStyleSettings {

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
