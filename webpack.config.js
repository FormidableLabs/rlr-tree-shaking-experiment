"use strict";

const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const ENTRY_POINTS = [
  "one-off-import",
  "root-import"
]

module.exports = ENTRY_POINTS.map((e) => ({
  mode: "development",
  context: path.resolve("src"),
  entry: {
    [e]: `./${e}.js`
  },
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
    pathinfo: true
  },
  devtool: false,
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          dead_code: true   // Only DCE
        },
        mangle: false,      // DEMO ONLY: Don't change variable names.
        output: {
          comments: true,   // DEMO ONLY: Helpful comments
          beautify: true    // DEMO ONLY: Preserve whitespace
        }
      },
      sourceMap: false
    })
  ]
}));
