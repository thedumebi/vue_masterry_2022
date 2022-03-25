const path = require("path");
const MiniCssExtractplugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js%/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
      {
        test: /\.scss$|\.sass$/,
        use: [
          MiniCssExtractplugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ], //order matters, webpack runs from bottom to top so sass-loader runs first
      },
    ],
  },
  plugins: [
    new MiniCssExtractplugin({
      filename: "main.css",
    }),
  ],
  watch: true,
};
