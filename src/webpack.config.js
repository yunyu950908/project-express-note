const path = require('path'),
    webpack = require("webpack"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    WebpackNotifierPlugin = require('webpack-notifier')


let base = {
    index: './js/app/index.js',
};

module.exports = {
    // https://webpack.js.org/configuration/devtool/#devtool
    devtool: 'source-map',
    // https://webpack.js.org/configuration/target/#target
    target: "web",
    watch: true,
    entry: base,
    output: {
        path: path.resolve(__dirname, '../public/javascripts'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            mod: path.resolve(__dirname, './js/mod/'),
            lib: path.resolve(__dirname, './js/lib/'),
            scss: path.resolve(__dirname, './scss/')
        }
    },
    // externals: {
    //     jquery: "jQuery"
    // },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css",
            disable: false,
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    module: {
        //entry => loaders ==> webpack ==> output
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            // {
            //     test: /\.scss$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader']
            // },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[sha512:hash:base64:7].[ext]'
                    }
                }
            },
            {
                test: /\.html/,
                use: {
                    loader: "html-loader",
                    options: {
                        minimize: false,
                        attrs: false
                    }
                }
            }
        ]
    }
};
