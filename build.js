"strict"

//
// Copyright (c) 2021 - present by Pouya Kary <pouya@kary.us>
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    const fs =
        require( "fs" )
    const path =
        require( "path" )
    const { exec } =
        require( "child_process" )

//
// ─── TOOLS ──────────────────────────────────────────────────────────────────────
//

    async function run ( command ) {
        return new Promise( ( resolve, reject ) => {
            exec( command, ( error, stdout, stderr ) => {
                if ( error ) {
                    reject( `Shell Failure: ERROR: ${error.message}` )
                }
                if ( stderr ) {
                    reject( `Shell Failure: STDERR: ${stderr}` )
                }
                resolve( stdout )
            })
        })
    }

    function title ( name ) {
        console.log( `--> Build Step: ${ name }` )
    }

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const OUT_DIRECTORY =
        path.resolve( __dirname, "out" )
    const DIST_DIRECTORY =
        path.join( OUT_DIRECTORY, "dist" )
    const DOCS_DIRECTORY =
        path.join( OUT_DIRECTORY, "docs" )
    const PATH_TO_DECLARATION_FILE_OUTPUT_DUMMY =
        path.join( DIST_DIRECTORY, "textgraphic.node.js" )
    const PATH_TO_DECLARATION_FILE =
        path.join( DIST_DIRECTORY, "textgraphic.node.d.ts" )
    const ENTRY_POINT =
        path.resolve( __dirname, "textgraphic", "source", "index.ts" )


//
// ─── CLEANING ───────────────────────────────────────────────────────────────────
//

    async function clean ( ) {
        title( "Cleaning" )
        await run ( `rm -rf ${ OUT_DIRECTORY }`)
    }

//
// ─── TYPE SCRIPT ────────────────────────────────────────────────────────────────
//

    async function compileTypeScriptCodes ( ) {
        title( "Compiling TypeScript codes." )
        await run( "tsc" )
    }

//
// ─── CREATE DECLARATION FILE ───────────────────────────────────────────────────
//

    async function buildDeclarationFile ( ) {
        title( "Creating the declaration file." )
        // this part is a little bit tricky
        await run ( `rm -f ${ PATH_TO_DECLARATION_FILE_OUTPUT_DUMMY }` )
        await run ( `tsc ${ ENTRY_POINT }  --declaration   --target ES2016   --module amd   --moduleResolution node   --out ${ PATH_TO_DECLARATION_FILE_OUTPUT_DUMMY }` )
        await run ( `rm -f ${ PATH_TO_DECLARATION_FILE_OUTPUT_DUMMY }` )

        // fixing the declaration file
        let declarationFile =
            fs.readFileSync( PATH_TO_DECLARATION_FILE, "utf8" )
        declarationFile =
            declarationFile.replace(
                'declare module "index" {',
                'declare module "textgraphic" {',
            )
        fs.writeFileSync(
            PATH_TO_DECLARATION_FILE,
            declarationFile
        )
    }

//
// ─── PACK ───────────────────────────────────────────────────────────────────────
//

    async function pack ( ) {
        title( "Packing for Node and Web." )
        await run( "webpack" )
    }

//
// ─── DOCUMENTATIONS ─────────────────────────────────────────────────────────────
//

    async function generateDocumentations ( ) {
        title( "Generating documentations" )
        await run ( `npx typedoc --out ${ DOCS_DIRECTORY } --name "TextGraphic" --hideGenerator ${ ENTRY_POINT }` )
    }

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    main( ); async function main ( ) {
        // order is very very important. DO NOT CHANGE
        await clean( )
        await compileTypeScriptCodes( )
        await buildDeclarationFile( )
        await pack( )
        await generateDocumentations( )
        console.log( "    Successfully Done" )
    }


// ────────────────────────────────────────────────────────────────────────────────

