import * as path from 'path';
import * as Webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader';
import {VueLoaderPlugin} from 'vue-loader';

export default function Config(env): Webpack.Configuration {
    return {
        mode: 'development',
        stats: { modules: false },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            symlinks: true,
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            },
            plugins: [
                new TsConfigPathsPlugin()
            ]
        },
        entry: {
            'ui': [
                './ui/index.ts',
                './styles/styles.scss'
            ]
        },
        module: {
            rules: [
                { test: /\.tsx?$/, use: [{loader: 'awesome-typescript-loader', options: {useBabel: true, babelOptions: { presets: ["env"], plugins: ["transform-vue-jsx", "syntax-dynamic-import"], sourceMaps: true } }}] },
                { test: /\.(html)$/, use: [{loader: 'file-loader', options: { name: '[name].[ext]' }}] },
                { test: /\.vue$/, loader: "vue-loader" },
                { test: /\.pug$/, oneOf: [{resourceQuery: /^\?vue/, use: ['pug-plain-loader']}, {use: ['raw-loader', 'pug-plain-loader']}] },                         
                { test: /\.css$/, oneOf: [{resourceQuery: /module/, use: ["vue-style-loader", {loader: 'css-loader', options: {modules: true, localIdentName: '[local]_[hash:base64:8]' }}]}, {use: ["vue-style-loader", "css-loader"]}] },                
                { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] },                
                { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000000' }
            ]
        },
        output: {
            path: path.join(__dirname, "./assets/js"),
            filename: '[name].js',
            chunkFilename: '[name].js'
        },
        plugins: [
            new VueLoaderPlugin(),
            new CheckerPlugin(),
            new MiniCssExtractPlugin({filename: '[name].css', chunkFilename: '[id].css'})
        ]
    };
};
