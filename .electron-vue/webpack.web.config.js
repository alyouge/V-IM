"use strict";

process.env.BABEL_ENV = "web";

const path = require("path");
const webpack = require("webpack");

const BabiliWebpackPlugin = require("babili-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let webConfig = {
  devtool: "#cheap-module-eval-source-map",
  entry: {
    web: path.join(__dirname, "../src/renderer/main.js")
  },
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
      nodeModules: false
    }),
    new webpack.DefinePlugin({
      "process.env.IS_WEB": "true"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "../dist/web")
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "../src/renderer"),
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: [".js", ".vue", ".json", ".css"]
  },
  target: "web"
};

/**
 * Adjust webConfig for production settings
 */
if (process.env.NODE_ENV === "production") {
  webConfig.devtool = "";

  webConfig.plugins.push(
    new BabiliWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "../static"),
        to: path.join(__dirname, "../dist/web/static"),
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

module.exports = webConfig;
