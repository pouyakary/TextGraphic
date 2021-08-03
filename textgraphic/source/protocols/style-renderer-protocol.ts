
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
    import { PortableColor }
        from "./portable-color"

//
// ─── STYLE PROTOCOL ─────────────────────────────────────────────────────────────
//

    /**
     *  TextGraphic is designed to be destination-independent. Some may use it to
     *  render text in a browser, but it can also be used to render text in a
     *  terminal. The way this independence is designed is by having a protocol
     *  that defines how style is rendered. Each new target platform is defined
     *  by implementing the `StyleRendererProtocol`.
     *
     *  The design philosophy here is to draw a border between the `ViewProtocol`
     *  and `StyleRendererProtocol` that gives the view implementors enough
     *  freedom to create new views but also keeps them from shooting themselves
     *  in the foot.
     *
     *  TextGraphic is about text and every implementation of a textual markup
     *  evolves some sort of a tag mechanism where some form of an indication
     *  marks the starting point of the markup and one other marks the ending.
     *
     *  For example these are 3 different ways of making the text word "fox"
     *  bold in different platforms:
     *  - _Markdown_: The quick brown `**`fox`**` jumps over the lazy dog.
     *  - _ANSI Terminal_: The quick brown `\x1b[1;m`fox`\x1b[0;m` jumps over the lazy dog.
     *  - _HTML_: The quick brown `<b>`fox`</b>` jumps over the lazy dog.
     *
     *  As it is easy to observe, the only different factor in the actual
     *  render is how one platform defines its markup indications. Therefore
     *  the separation of concerns within the TextGraphic is that the the renderer
     *  of the view (the `.styledForm` property) is responsible for inserting
     *  the appropriate style indicators&mdash;which in TextGraphic jargon is
     *  called the _styling info_&mdash;and the style renderer is tasked with
     *  forming the _Style_ into appropriate _StyleInfo_ for the particular
     *  section.
     *
     *  As each target may have different styling options, each platform that
     *  is defined for the TextGraphic needs to have two standards implemented.
     *
     *  1. A `ColorType` that extends the `PortableColor`.
     *  2. An `EnvironmentStyleSetting` that extends the `PortableStyle<ColorType>`
     *
     *  These two types define the the styling possibilities of the target
     *  platform, while extending the `PortableColor` and the `PortableStyle`
     *  they implement a minimum intersection of styling that can be rendered
     *  almost anywhere.
     *
     *  The nature of the result render is a character matrix in which some
     *  characters are styled. Therefore there are 3 distinct styling sets
     *  which the style renderer has to have an answer for:
     *
     *  1.  How to wrap a styled section of a line?
     *  2.  How to wrap each row (line) of the final render?
     *  3.  How to wrap the whole render matrix?
     *
     *  And then there are more styling problems that are unique to each
     *  target and therefore a responsibility for the style renderer.
     *
     *  4.  What additional color formats does the environment offer?
     *      (the `ColorType`)
     *  5.  What additional styling options does the environment offer?
     *      (the `EnvironmentStyleSetting`)
     *  6.  What is the default settings look like?
     *  7.  How do you merge a previous setting with a new one?
     *
     *  These should all be addressed within the implementations of the
     *  style renderer.
     */

    export interface StyleRendererProtocol <
            ColorType extends PortableColor,
            EnvironmentStyleSetting extends PortableStyle<ColorType>
        > {

        //
        // ─── STYLING ─────────────────────────────────────────────────────
        //

            /**
             *  Provides the factory style that is used as the initial style
             *  if no other style is provided and also can be used to be
             *  compared as the empty style.
             */

            readonly defaultStyle: EnvironmentStyleSetting


            /**
             *  This gets a _partial style_ which is an incomplete style that
             *  does not define the all the style properties and then the function
             *  acts as something like `Object.assign` where it overrides the
             *  style properties of `style` param with the available properties
             *  of the `options` param.
             */

            margeNewStyleOptionsWithPreviosuStyleState ( style: EnvironmentStyleSetting,
                                                       options: Partial<EnvironmentStyleSetting> ): EnvironmentStyleSetting

        //
        // ─── ENCODE CHARACTER ────────────────────────────────────────────
        //

            /**
             *  In some destinations, some special characters or sometimes
             *  all of them, need to be escaped, or encoded. For example in
             *  an XML language, the `<` character should be replaced with
             *  `\&lt;` XML entity. This function gets a character and if
             *  necessary, encodes it to the proper representation.
             */

            encodeCharacterForStyledRender( char: string ): string

        //
        // ─── STYLE INFO GENERATORS ───────────────────────────────────────
        //

            /**
             *  Renders the right styling information for a styled portion
             *  of a line. For example if `<span style="color: red">` if
             *  the current chunk is being rendered for the HTML target and
             *  is red.
             */

            renderLeftStylingInfo( style: EnvironmentStyleSetting ): string


            /**
             *  Returns the corresponding right styling information for
             *  the previous left info. For example in the context of
             *  rendering for HTML target, this would be the `</span>`
             */

            renderRightStylingInfo( style: EnvironmentStyleSetting ): string


            /**
             *  This function gets a list of rendered rows (lines) and
             *  wraps it into the expected body that contains the result.
             *  For example within ANSI Terminal, this will only be joining
             *  the lines together with a line break character (`\n`). But,
             *  in the HTML render, each line is being wrapped inside a
             *  `<textgraphic-row> ... </textgraphic-row` tag and then all of these
             *  rows, plus an additionally generated `<style>` tag is being
             *  wrapped inside of a `<textgraphic-area> ... </textgraphic-area>`.
             */

            wrapRootLinesAndFinalizeRender ( width: number,
                                              rows: string[ ] ): string

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
