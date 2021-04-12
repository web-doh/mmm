const dotenv = require("dotenv");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
dotenv.config();

function getClientEnv() {
  return {
    "process.env": JSON.stringify(
      Object.keys(process.env)
        .filter((key) => /^REACT_APP/i.test(key))
        .reduce(
          (env, key) => {
            env[key] = process.env[key];
            return env;
          },
          { NODE_ENV: "development" }
        )
    ),
  };
}

const clientEnv = getClientEnv();

module.exports = {
  entry: ["./src/client/index.js", "./src/client/index.module.css"],
  output: {
    path: "/",
    filename: "bundle.js",
  },

  devServer: {
    hot: true,
    publicPath: "/",
    filename: "bundle.js",
    contentBase: path.resolve(__dirname, "public", "build"),
    proxy: {
      "**": { target: "http://localhost:5000", changeOrigin: true },
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
      children: true,
    },
    historyApiFallback: true,
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
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "static/media",
              name: "[name].[hash:8].[ext]",
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

    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),

    new webpack.ProvidePlugin({
      process: "process/browser",
      React: "react",
    }),
    new webpack.DefinePlugin(clientEnv),
  ],

  devtool: "eval-cheap-source-map",

  mode: "development",
};
