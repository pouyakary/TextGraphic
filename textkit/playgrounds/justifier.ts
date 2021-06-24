
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as TextKit
        from "../source"

//
// ─── TEXT JUSTIFIER ─────────────────────────────────────────────────────────────
//

    const inputWords =
        "hello world   how are you?\n\nhaha!"

    const words =
        TextKit.separateWordsBySpaceAndIncludeSpacesInResult( inputWords )

    console.log( words )

// ────────────────────────────────────────────────────────────────────────────────
