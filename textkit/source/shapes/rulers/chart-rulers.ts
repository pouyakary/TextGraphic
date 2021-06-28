
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { SpacedBox }
        from "../../core-elements/spaced-box/main"
    import { Direction }
        from "../../protocols/direction"

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

    export function createChartRuler ( inputSettings: CharRulerSettings ): SpacedBox {
        const settings =
            fixSettings( inputSettings )

        if ( settings.size < 1 ) {
            return SpacedBox.initEmptyBox( )
        }

        switch ( settings.facing ) {
            case Direction.Up:
                return createHorizontalChartRuler( settings, true )
            case Direction.Down:
                return createHorizontalChartRuler( settings, false )
            case Direction.Left:
                return createVerticalRuler( settings, true )
            case Direction.Right:
                return createVerticalRuler( settings, false )
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

    function createHorizontalChartRuler ( settings: FixedCharRulerSettings,
                                     isDirectionUp: boolean ): SpacedBox {
        //
        const rulerLine =
            createHorizontalRulerLine( settings )

        if ( settings.hideNumbers ) {
            return new SpacedBox( [ rulerLine ], 0 )
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

        return new SpacedBox( lines, baseline )
    }

//
// ─── CREATE VERTICAL RULER ──────────────────────────────────────────────────────
//

    function createVerticalRuler ( settings: FixedCharRulerSettings, facingLeft: boolean ): SpacedBox {
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

            return new SpacedBox( lines, 0 )
        }


        // not in the case of hide numbers
        function createNumberLabel ( no: string ) {
            const paddingLength =
                verticalGutterSize - 1 - no.length
            return facingLeft
                ? " " + no + " ".repeat( paddingLength )
                : " ".repeat( paddingLength ) + no + " "
        }

        lines[ 0 ] =
            facingLeft
                ? originChar + createNumberLabel( "1" )
                : createNumberLabel( "1" ) + originChar

        const middleLineTemplate =
            facingLeft
                ? middleChar + " ".repeat( verticalGutterSize )
                : " ".repeat( verticalGutterSize ) + middleChar

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

        return new SpacedBox( lines, 0 )
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
                numberLineArray[ i ] = "1" + " ".repeat( unit - unitNumberText.length ) + unitNumberText
            } else {
                numberLineArray[ i ] =
                    " ".repeat( unit - unitNumberText.length ) + unitNumberText
            }
        }

        numberLineArray.push(
            " ".repeat( size - unit * numberLineSections )
        )

        return numberLineArray.join( "" )
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
