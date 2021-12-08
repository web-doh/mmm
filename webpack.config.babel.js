import path from "path";
import webpack from "webpack";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageminWebP = require("imagemin-webp");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "public", "build"),
    publicPath: "/",
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
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
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

  optimization: {
    minimize: true,
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      React: "react",
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),

    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin(clientEnv),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/client/assets/**/**",
          to: "./src/client/assets/[name].webp",
        },
      ],
    }),
    new ImageminPlugin({
      plugins: [ImageminWebP({ quality: 80 })],
    }),
  ],

  stats: {
    children: true,
  },

  mode: "production",
};
