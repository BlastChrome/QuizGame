const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", // Path to your template file
      filename: "index.html", // Output file
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // Ensure this is set for `webpack-dev-server`
  },
  module: {
    rules: [
      {
        // Babel Loader
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        // CSS and SCSS Loader
        test: /\.s?[ac]ss$/,
        use: [
          "style-loader", // Injects styles into the DOM using <style> tags
          "css-loader", // Turns CSS into JavaScript modules
          "sass-loader", // Turns SCSS into CSS
        ],
      },
      {
        // Image and Font Loader
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000, // You can specify your preferred port here
    hot: true,
    open: true,
  },
};
