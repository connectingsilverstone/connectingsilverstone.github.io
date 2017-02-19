var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = __dirname + "/build";

var config = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : false,
    output: {
        path: path,
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};

// Add more configurations if you want! :)
var users = Object.assign({}, config, {
    name: "users",
    entry: "./src/users.js",
    output: {
        path: path,
        filename: "./build/users-deploy.js"
    },
});

module.exports = [
    users
];