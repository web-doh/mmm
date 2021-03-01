import path from "path";
import webpack from "webpack";
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/client/index.js"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },

  devServer: {
    open: true,
    hot: true,
    filename: "bundle.js",
    publicPath: "/",
    contentBase: "/dist/",
    proxy: {
      "**": "http://localhost:3000",
    },
    port: 4000,
    stats: {
      // 콘솔 로그를 최소화
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    roots: [__dirname, path.resolve(__dirname, "src/client")],
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],

  devtool: "eval-cheap-source-map",

  mode: "development",
};
