
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
    }

// ────────────────────────────────────────────────────────────────────────────────
