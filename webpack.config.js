const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin()
        ]
    }

    return config
};

module.exports={
    context: path.resolve(__dirname, 'src'),
    entry: {
        'js/index.js':'./index.js',
        // 'css/style.css':'./styles/style.scss'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name]',
        publicPath: '/'
    },
    mode: 'development',
    devtool: isDev ? 'source-map' : '',
    devServer: {
        contentBase: path.resolve(__dirname,'build'),
        port: '3000',
        hot: isDev
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    optimization: optimization(),
    plugins: [
        new HTMLWebpackPlugin({
            template: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src','static'),
                to: path.resolve(__dirname, 'build','static'),
                force: true,
            }
        ]),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            hmr:true, //Hot Module Replace
                            reloadAll:true
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            hmr:true, //Hot Module Replace
                            reloadAll:true
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'css/fonts/[name].[ext]',
                            }
                        }
                    ]
            }
        ]
    }
};