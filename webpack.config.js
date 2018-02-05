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
  optimization: {
    sideEffects: true
  },
  module: {
    rules: [
      // Manually force `redux-little-router` to have side effects false.
      //
      // https://github.com/webpack/webpack/issues/6065#issuecomment-351060570
      {
        test: /\.js$/,
        include: [
          path.resolve("node_modules/redux-little-router")
        ],
        sideEffects: false
      }
    ]
  },
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
