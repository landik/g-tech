const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
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
    entry: './index.js',
    output: {
        filename: isDev?'bundle.js':'bundle.[hash].js',
        path: path.resolve(__dirname, 'build'),
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
            filename: 'style.css'
        })
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
                use: ['file-loader']
            }
        ]
    }
};