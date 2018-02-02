"use strict";

var path = require("path");
var webpack = require("webpack");

var ENTRY_POINTS = [
  "one-off-import",
  "root-import"
]

module.exports = ENTRY_POINTS.map((e) => ({
  context: path.resolve("src"),
  entry: {
    [e]: `./${e}.js`
  },
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
    pathinfo: true
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: false,    // DEMO ONLY: Don't change variable names.
      beautify: true,   // DEMO ONLY: Preserve whitespace
      output: {
        comments: true  // DEMO ONLY: Helpful comments
      },
      sourceMap: false
    })
  ]
}));
