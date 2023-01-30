const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/index.js",
  output: {
    path: "/",
    filename: "bundle.js",
  },
  resolve: {
    alias: {
      process: "process/browser",
    },
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
        options: { presets: ["@babel/env", "@babel/preset-react"] },
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
