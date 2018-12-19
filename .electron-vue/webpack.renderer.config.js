"use strict";

process.env.BABEL_ENV = "renderer";

const path = require("path");
const { dependencies } = require("../package.json");
const webpack = require("webpack");

const BabiliWebpackPlugin = require("babili-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * List of node_modules to include in webpack bundle
 *
 * Required for specific packages like Vue UI libraries
 * that provide pure *.vue files that need compiling
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/webpack-configurations.html#white-listing-externals
 */
let whiteListedModules = ["vue"];

let rendererConfig = {
  devtool: "#cheap-module-eval-source-map",
  entry: {
    renderer: path.join(__dirname, "../src/renderer/main.js")
  },
  externals: [
    ...Object.keys(dependencies || {}).filter(
      d => !whiteListedModules.includes(d)
    )
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              loaders: {
                less: ExtractTextPlugin.extract({
                  use: [
                    "css-loader?minimize",
                    "autoprefixer-loader",
                    "less-loader"
                  ],
                  fallback: "vue-style-loader"
                }),
                css: ExtractTextPlugin.extract({
                  use: ["css-loader", "autoprefixer-loader", "less-loader"],
                  fallback: "vue-style-loader"
                }),
                scss: ExtractTextPlugin.extract({
                  use: ["css-loader", "autoprefixer-loader", "sass-loader"],
                  fallback: "vue-style-loader"
                })
              }
            }
          },
          {
            loader: "iview-loader",
            options: {
              prefix: false
            }
          }
        ]
      },
      {
        test: /iview\/.*?js$/,
        loader: "babel-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader?minimize", "autoprefixer-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader?minimize", "autoprefixer-loader", "less-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader?minimize", "autoprefixer-loader", "sass-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: "url-loader?limit=1024"
      },
      {
        test: /\.(html|tpl)$/,
        loader: "html-loader"
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== "production",
    __filename: process.env.NODE_ENV !== "production"
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.ejs"),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      nodeModules:
        process.env.NODE_ENV !== "production"
          ? path.resolve(__dirname, "../node_modules")
          : false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: "[name].js",
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "../dist/electron")
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "../src/renderer"),
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: [".js", ".vue", ".json", ".css", ".node"]
  },
  target: "electron-renderer"
};

/**
 * Adjust rendererConfig for development settings
 */
if (process.env.NODE_ENV !== "production") {
  rendererConfig.plugins.push(
    new webpack.DefinePlugin({
      __static: `"${path.join(__dirname, "../static").replace(/\\/g, "\\\\")}"`
    })
  );
}

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === "production") {
  rendererConfig.devtool = "";

  rendererConfig.plugins.push(
    new BabiliWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "../static"),
        to: path.join(__dirname, "../dist/electron/static"),
        ignore: [".*"]
      }
    ]),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  );
}

module.exports = rendererConfig;
