const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: ["./style/index.css"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "css/[name].bundle.css"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: `${__dirname}/postcss.config.js`,
                            },
                        },
                    },
                ],
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            {
                test: /\.(woff|woff2)$/,
                loader: "url-loader?prefix=font/&limit=5000",
                // query: {outputPath: "font/", publicPath: "../font/"}
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream",
                // query: {outputPath: "font/", publicPath: "../font/"}
            },
            {
                test: /\.(jpe?g|png|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].bundle.css' : 'css/[name].[hash].css',
            chunkFilename: devMode ? 'css/[id].bundle.css' : 'css/[id].[hash].css',
        }),
    ],
};