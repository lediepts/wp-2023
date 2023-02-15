// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.js",
  watchOptions: {
    ignored: ["files/**/*.js", "node_modules/**"],
    aggregateTimeout: 600,
    poll: 1000,
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: 'bundle.js',
  },
  devServer: {
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 9000,
    open: true,
    client: {
      overlay: true,
    },
    static: {
      directory: path.join(__dirname, './assets'),
    },
  },
  optimization: {
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
      favicon: "favicon.ico",
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        loader: "file-loader",
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        exclude: /(node_modules)/,
        options: {
          outputPath: "assets/images",
        },
      },
      {
        loader: "file-loader",
        test: /\.pdf$/i,
        exclude: /(node_modules)/,
        options: {
          outputPath: "assets/pdf",
        },
      },
      {
        loader: "file-loader",
        test: /\.woff$|\.woff2$|\.eot$|\.ttf$/i,
        options: {
          outputPath: "assets/fonts",
        },
      },
      {
        loader: "file-loader",
        test: /\.wav$|\.mp4$|\.mp3$/i,
        options: {
          outputPath: "assets/media",
        },
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
