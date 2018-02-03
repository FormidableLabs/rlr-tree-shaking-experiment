"use strict";

const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const ENTRY_POINTS = [
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
    // TODO: WHY IS EVERYTHING STILL MINIFIED????
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: true,
    //     mangle: false,    // DEMO ONLY: Don't change variable names.
    //     beautify: true,   // DEMO ONLY: Preserve whitespace
    //     output: {
    //       comments: true  // DEMO ONLY: Helpful comments
    //     }
    //   },
    //   sourceMap: false
    // })
  ]
}));
