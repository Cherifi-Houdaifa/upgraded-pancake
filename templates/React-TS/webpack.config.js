const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const mode = process.env.NODE_ENV;

module.exports = {
    mode: mode,
    entry: {
        main: path.resolve(__dirname, "./src/index.tsx"),
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].[contenthash].js",
        clean: true,
        publicPath: "/",
    },
    devtool: mode === "development" ? "eval-source-map" : undefined,
    devServer: {
        static: path.resolve(__dirname, "./build"),
        port: "4000",
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "ts-loader",
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "public/index.html"),
        }),
    ],
};
