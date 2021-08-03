
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


import * as TextGraphic from
    "../source"

const wait = ( ms: number ) =>
    new Promise( resolve => setTimeout( resolve, ms ) )

const styler =
    new TextGraphic.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

main( ); async function main ( ) {
    for ( let iteration = 0; true; iteration++ ) {
        // 1
        const firstCanvasBackground =
            TextGraphic.ShapeView.initBlankRectangle( 20, 5, styler )
                .frame( TextGraphic.Presets.LightBox )
        const firstCanvas =
            TextGraphic.CanvasView.initWithBackground( firstCanvasBackground, styler )

        const topLeftCanvasObject =
            new TextGraphic.ShapeView([ " * " ], 0, styler, { }, false )
                .frame( TextGraphic.Presets.LightBox )
        topLeftCanvasObject.style = {
            color: "blue"
        }
        firstCanvas.add( topLeftCanvasObject, -5 + ( iteration % 30 ), 1, 1 )

        // 2
        const secondCanvasBackground =
            TextGraphic.ShapeView.initBlankRectangle( 20, 5, styler )
                .frame( TextGraphic.Presets.LightBox )
        const secondCanvas =
            TextGraphic.CanvasView.initWithBackground( secondCanvasBackground, styler )

        const secondCanvasObject =
            new TextGraphic.ShapeView([ " * " ], 0, styler, { }, false )
                .frame( TextGraphic.Presets.LightBox )
        secondCanvasObject.style = {
            color: "red"
        }
        secondCanvas.add( secondCanvasObject, 3, -3 + ( iteration % 20), 1 )

        // 3
        const thirdCanvasBackground =
            TextGraphic.ShapeView.initBlankRectangle( 20, 5, styler )
                .frame( TextGraphic.Presets.LightBox )
        const thirdCanvas =
            TextGraphic.CanvasView.initWithBackground( thirdCanvasBackground, styler )

        const thirdCanvasObjectOne =
            new TextGraphic.ShapeView([ " * " ], 0, styler, { }, false )
                .frame( TextGraphic.Presets.LightBox )
        thirdCanvasObjectOne.style ={
            color: "green"
        }
        thirdCanvas.add( thirdCanvasObjectOne, -4 + ( iteration % 30 ), 3, 1 )
        const thirdCanvasObjectTwo =
            new TextGraphic.ShapeView([ " * " ], 0, styler, { }, false )
                .frame( TextGraphic.Presets.LightBox )
        thirdCanvasObjectTwo.style = {
            color: "blue"
        }
        thirdCanvas.add( thirdCanvasObjectTwo, 24 - ( iteration % 30 ), 2 , 1 )

        // text
        const title =
            new TextGraphic.LineView(
                "Multi Layer Animation Grouping in Pouya's TextGraphic",
                styler, { }
            )
        title.style = {
            italic:     true,
            color:  "red"
        }

        // Main Canvas
        const mainCanvasBackground =
            TextGraphic.ShapeView.initBlankRectangle( 77, 10, styler )
        const mainCanvas =
            TextGraphic.CanvasView.initWithBackground( mainCanvasBackground, styler )

        mainCanvas.add( title, 15, 1, 1 )
        mainCanvas.add( firstCanvas, 4, 2, 1 )
        mainCanvas.add( secondCanvas, 29, 2, 1 )
        mainCanvas.add( thirdCanvas, 53, 2, 1 )

        mainCanvas.fineTuneBoxIntersections()

        console.clear( )
        console.log( mainCanvas.styledForm )

        await wait( 120 )
    }
}
