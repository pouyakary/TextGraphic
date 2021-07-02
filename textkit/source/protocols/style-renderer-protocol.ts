
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { Subset }
        from "../tools/types"

//
// ─── STYLE PROTOCOL ─────────────────────────────────────────────────────────────
//

    export interface StyleRendererProtocol<X extends object> {
        readonly defaultStyle: X

        readonly rootRowRightStylingInfo:    string
        readonly rootRowLeftStylingInfo:     string
        readonly rootRightStylingInfo:       string
        readonly rootLeftStylingInfo:        string

        renderLeftStylingInfo( style: X ):      string
        renderRightStylingInfo( style?: X ):    string

        margeNewStyleOptionsWithPreviosuStyleState ( style: X,
                                                   options: Subset<X> ): X
    }

// ────────────────────────────────────────────────────────────────────────────────
