
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { Subset }
        from "../tools/types"

//
// ─── STYLE PROTOCOL ─────────────────────────────────────────────────────────────
//

    export interface StyleRendererProtocol<X extends object> {
        defaultStyle: X

        renderLeftStylingInfo( style: X ):      string
        renderRightStylingInfo( style?: X ):    string

        margeNewStyleOptionsWithPreviosuStyleState ( style: X,
                                                   options: Subset<X> ): X
    }

// ────────────────────────────────────────────────────────────────────────────────
