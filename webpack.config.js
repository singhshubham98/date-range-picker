const path = require("path");

const commonConfig = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "/dist",
    library: {
      name: "DateRangePicker", // Global variable name for your library
      type: "umd", // Supports AMD/CommonJS/IIFE
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        // Add a rule for styled components if you're using them
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // Enable CSS Modules for scoped styles
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM",
    },
    // "date-fns": {
    //   commonjs: "date-fns",
    //   commonjs2: "date-fns",
    //   amd: "date-fns",
    //   root: "date-fns",
    // },
    "@mui/material": {
      commonjs: "@mui/material",
      commonjs2: "@mui/material",
      amd: "@mui/material",
      root: "MaterialUI",
    },
  },
  optimization: {
    minimize: true,
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
};

module.exports = commonConfig;
