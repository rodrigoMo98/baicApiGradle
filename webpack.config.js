const copyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const {
	NODE_ENV = 'production',
} = process.env;


module.exports = {
    entry: "./src/index.ts",
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    mode: NODE_ENV,
    resolve: {
      extensions: [".ts", ".js"],
    },
    target: "node",
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ["ts-loader"],
        },
      ],
    },
    plugins: [
      new copyWebpackPlugin({
        patterns: [
          {
            from: "./package.json",
            to: "./",
          }
        ],
      }),
    ],
  };
  