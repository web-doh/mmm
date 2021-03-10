import path from "path";
import webpack from "webpack";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
          { NODE_ENV: "production" }
        )
    ),
  };
}

const clientEnv = getClientEnv();

module.exports = {
  entry: ["./src/client/index.js", "./src/client/index.module.css"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    roots: [__dirname, path.resolve(__dirname, "src/client")],
    extensions: [".js", ".jsx"],
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
              modules: true,
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

  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
};
