
//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//


import * as TextKit from
    "../source"

const wait = ( ms: number ) =>
    new Promise( resolve => setTimeout( resolve, ms ) )

const styler =
    new TextKit.Environments.ANSITerminal.ANSITerminalStyleRenderer( )

main( ); async function main ( ) {
    for ( let iteration = 0; true; iteration++ ) {
        // 1
        const firstCanvasBackground =
            TextKit.ShapeView.initBlankRectangle( 20, 5, styler )
                .frame( TextKit.Presets.LightBox )
        const firstCanvas =
            TextKit.CanvasView.initWithBackground( firstCanvasBackground, styler )

        const topLeftCanvasObject =
            new TextKit.ShapeView([ " * " ], 0, styler, { }, false )
                .frame( TextKit.Presets.LightBox )
        topLeftCanvasObject.style = {
            color: "blue"
        }
        firstCanvas.add( topLeftCanvasObject, -5 + ( iteration % 30 ), 1, 1 )

        // 2
        const secondCanvasBackground =
            TextKit.ShapeView.initBlankRectangle( 20, 5, styler )
                .frame( TextKit.Presets.LightBox )
        const secondCanvas =
            TextKit.CanvasView.initWithBackground( secondCanvasBackground, styler )

        const secondCanvasObject =
            new TextKit.ShapeView([ " * " ], 0, styler, { }, false )
                .frame( TextKit.Presets.LightBox )
        secondCanvasObject.style = {
            color: "red"
        }
        secondCanvas.add( secondCanvasObject, 3, -3 + ( iteration % 20), 1 )

        // 3
        const thirdCanvasBackground =
            TextKit.ShapeView.initBlankRectangle( 20, 5, styler )
                .frame( TextKit.Presets.LightBox )
        const thirdCanvas =
            TextKit.CanvasView.initWithBackground( thirdCanvasBackground, styler )

        const thirdCanvasObjectOne =
            new TextKit.ShapeView([ " * " ], 0, styler, { }, false )
                .frame( TextKit.Presets.LightBox )
        thirdCanvasObjectOne.style ={
            color: "green"
        }
        thirdCanvas.add( thirdCanvasObjectOne, -4 + ( iteration % 30 ), 3, 1 )
        const thirdCanvasObjectTwo =
            new TextKit.ShapeView([ " * " ], 0, styler, { }, false )
                .frame( TextKit.Presets.LightBox )
        thirdCanvasObjectTwo.style = {
            color: "blue"
        }
        thirdCanvas.add( thirdCanvasObjectTwo, 24 - ( iteration % 30 ), 2 , 1 )

        // text
        const title =
            new TextKit.LineView(
                "Multi Layer Animation Grouping in Pouya's TextKit",
                styler, { }
            )
        title.style = {
            italic:     true,
            color:  "red"
        }

        // Main Canvas
        const mainCanvasBackground =
            TextKit.ShapeView.initBlankRectangle( 77, 10, styler )
        const mainCanvas =
            TextKit.CanvasView.initWithBackground( mainCanvasBackground, styler )

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
