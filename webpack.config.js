
const path =
    require( "path" )

const distFolder =
    path.resolve( __dirname, "out", "dist", )
const entryPoint = name =>
    path.resolve( __dirname, "out", "compiled", "source", name )

const nodeConfiguration = {
    mode:       "production",
    target:     "node",
    entry:      entryPoint( "index.js" ),
    output: {
        libraryTarget:  "commonjs",
        path:           distFolder,
        filename:       "textgraphic.node.js",
    },
}

const webConfiguration = {
    mode:       "production",
    target:     "web",
    entry:      entryPoint( "web-index.js" ),
    output: {
        libraryTarget:  "window",
        path:           distFolder,
        filename:       "textgraphic.web.js",
    },
}


module.exports =
    [ nodeConfiguration, webConfiguration ]


