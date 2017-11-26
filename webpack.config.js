const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: "./devContent/main.js"
  },
  output: {
    filename: "[name].bundle.js",
    // default value, relative to HTML page (same directory)
    publicPath: ""
  },
  devServer: {
    contentBase: "./devContent",
    port: 9000,
    open: true,
    lazy: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["react", "env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              // Webpack requires an identifier (ident) in options when {Function}/require is used.
              // The ident can be freely named as long as it is unique.
              ident: "postcss",
              // The query parameter importLoaders allows to configure how many loaders
              // before css-loader should be applied to @imported resources.
              plugins: () => [require("postcss-cssnext")()]
            }
          }
        ]
      }
    ]
  }
};
