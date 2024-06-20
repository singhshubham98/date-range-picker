const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // First, we need to tell webpack where to start bundling the javascript files, this we can do by specifying entry property.
  entry: path.join(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        // Preprocess our own .css files
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: "file-loader",
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: "file-loader",
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  target: "web",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 3000,
  },
};
