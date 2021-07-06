
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ShapeView }
        from "../../views/mono-style-views/views/shape-view"
    import { StyleRendererProtocol, PortableStyle }
        from "../../protocols"
    import { Direction }
        from "../../protocols/direction"
    import { WHITE_SPACE_CHARACTER, EMPTY_STRING }
        from "../../constants/characters"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    export interface RulerCharSet {
        originChar:     string
        middleChar:     string
        separatorChar:  string
    }

    export interface CharRulerSettings {
        facing:                 Direction
        size:                   number
        chars:                  RulerCharSet
        verticalGutterSize?:    number
        hideNumbers?:           boolean
        unit?:                  number
        unitSize?:              number
    }

    interface FixedCharRulerSettings {
        facing:                 Direction
        size:                   number
        chars:                  RulerCharSet
        verticalGutterSize:     number
        hideNumbers:            boolean
        unit:                   number
        unitSize :              number
    }

//
// ─── RULER MAKER ────────────────────────────────────────────────────────────────
//

    export function createChartRuler <EnvironmentStyleSettings extends PortableStyle<any>> (
            styler:         StyleRendererProtocol<EnvironmentStyleSettings>,
            inputSettings:  CharRulerSettings,
        ): ShapeView<EnvironmentStyleSettings> {

        //
        const settings =
            fixSettings( inputSettings )

        if ( settings.size < 1 ) {
            return ShapeView.initEmptyBox( styler )
        }

        switch ( settings.facing ) {
            case Direction.Up:
                return createHorizontalChartRuler( settings, styler, true )
            case Direction.Down:
                return createHorizontalChartRuler( settings, styler, false )
            case Direction.Left:
                return createVerticalRuler( settings, styler, true )
            case Direction.Right:
                return createVerticalRuler( settings, styler, false )
        }
    }

//
// ─── FIX SETTINGS ───────────────────────────────────────────────────────────────
//

    function fixSettings ( settings: CharRulerSettings ): FixedCharRulerSettings {
        return {
            facing:
                settings.facing,
            size:
                Math.floor( settings.size ),
            chars:
                settings.chars,
            verticalGutterSize:
                settings.verticalGutterSize
                    ? Math.max(
                        Math.floor( settings.verticalGutterSize ),
                        Math.ceil( Math.log10( settings.size ) ) + 1 )
                    : Math.ceil( Math.log10( settings.size) ) + 1,
            hideNumbers:
                settings.hideNumbers || false,
            unit:
                settings.unit ? Math.floor( settings.unit ) : 10,
            unitSize:
                settings.unitSize ? settings.unitSize : 1,
        }
    }

//
// ─── HORIZONTAL CHART RULER ─────────────────────────────────────────────────────
//

    function createHorizontalChartRuler <EnvironmentStyleSettings extends PortableStyle<any>> (
            settings:       FixedCharRulerSettings,
            styler:         StyleRendererProtocol<EnvironmentStyleSettings>,
            isDirectionUp:  boolean
        ): ShapeView<EnvironmentStyleSettings> {

        //
        const rulerLine =
            createHorizontalRulerLine( settings )

        if ( settings.hideNumbers ) {
            return new ShapeView( [ rulerLine ], 0, styler, { }, true )
        }

        //
        const numberLine =
            createHorizontalRulerNumberLine( settings )

        const lines =
            isDirectionUp
                ? [ rulerLine, numberLine ]
                : [ numberLine, rulerLine ]
        const baseline =
            isDirectionUp
                ? 0
                : 1

        return new ShapeView( lines, baseline, styler, { }, true )
    }

//
// ─── CREATE VERTICAL RULER ──────────────────────────────────────────────────────
//

    function createVerticalRuler <EnvironmentStyleSettings extends PortableStyle<any>> (
            settings:       FixedCharRulerSettings,
            styler:         StyleRendererProtocol<EnvironmentStyleSettings>,
            facingLeft:     boolean
        ): ShapeView<EnvironmentStyleSettings> {

        //
        const { hideNumbers, size, chars, verticalGutterSize, unit, unitSize } =
            settings
        const { originChar, middleChar, separatorChar } =
            chars
        const lines =
            new Array<string> ( size )

        // in case of hide numbers
        if ( hideNumbers ) {
            lines[ 0 ] =
                originChar
            for ( let i = 1; i < size; i++ ) {
                lines[ i ] =
                    i % unit == unit - 1
                        ? separatorChar
                        : middleChar
            }

            return new ShapeView( lines, 0, styler, { }, true )
        }


        // not in the case of hide numbers
        function createNumberLabel ( no: string ) {
            const paddingLength =
                verticalGutterSize - 1 - no.length
            return facingLeft
                ? WHITE_SPACE_CHARACTER + no + WHITE_SPACE_CHARACTER.repeat( paddingLength )
                : WHITE_SPACE_CHARACTER.repeat( paddingLength ) + no + WHITE_SPACE_CHARACTER
        }

        lines[ 0 ] =
            facingLeft
                ? originChar + createNumberLabel( "1" )
                : createNumberLabel( "1" ) + originChar

        const middleLineTemplate =
            facingLeft
                ? middleChar + WHITE_SPACE_CHARACTER.repeat( verticalGutterSize )
                : WHITE_SPACE_CHARACTER.repeat( verticalGutterSize ) + middleChar

        function createMiddleLine ( i: number ) {
            const label =
                createNumberLabel( ( ( i * unitSize ) + 1 ).toString( ) )
            return facingLeft
                ? separatorChar + label
                : label + separatorChar

        }

        for ( let i = 1; i < size; i++ ) {
            lines[ i ] =
                ( i % unit == unit - 1
                    ? createMiddleLine( i )
                    : middleLineTemplate
                    )
        }

        return new ShapeView( lines, 0, styler, { }, true )
    }

//
// ─── HORIZONTAL RULER TOOLS ─────────────────────────────────────────────────────
//

    function createHorizontalRulerNumberLine ( settings: FixedCharRulerSettings ): string {
        //
        const { size, unit, unitSize } =
            settings
        const numberLineSections =
            Math.floor( size / unit )
        const numberLineArray =
            new Array<string>( numberLineSections )

        for ( let i = 0; i < numberLineSections; i++ ) {
            const unitNumberText =
                ( unit * unitSize * ( i + 1 ) ).toString( )
            if ( i === 0 ) {
                numberLineArray[ i ] =
                    "1" + WHITE_SPACE_CHARACTER.repeat( unit - unitNumberText.length ) + unitNumberText
            } else {
                numberLineArray[ i ] =
                    WHITE_SPACE_CHARACTER.repeat( unit - unitNumberText.length ) + unitNumberText
            }
        }

        numberLineArray.push(
            WHITE_SPACE_CHARACTER.repeat( size - unit * numberLineSections )
        )

        return numberLineArray.join( EMPTY_STRING )
    }


    function createHorizontalRulerLine ( settings: FixedCharRulerSettings ): string {
        //
        const { chars, size: width, unit } =
            settings
        const { originChar, middleChar, separatorChar } =
            chars

        let rulerLine =
            originChar
        for ( let i = 1; i < width; i++ ) {
            if ( i % unit === 0 ) {
                rulerLine += separatorChar
            } else {
                rulerLine += middleChar
            }
        }

        return rulerLine
    }

// ────────────────────────────────────────────────────────────────────────────────
