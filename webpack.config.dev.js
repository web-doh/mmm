import dotenv from "dotenv";
import path from "path";
import webpack from "webpack";
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
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },

  devServer: {
    hot: true,
    filename: "bundle.js",
    publicPath: "/",
    contentBase: "/dist/",
    proxy: {
      "**": "http://localhost:3001",
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
              modules: true
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
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    // new webpack.ProvidePlugin({
    //   process: "process/browser",
    // }),
    new webpack.DefinePlugin(clientEnv),
  ],

  devtool: "eval-cheap-source-map",

  mode: "development",
};
