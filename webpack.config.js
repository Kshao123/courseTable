const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',

    entry: {
        index: './src/index.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "lib"),
        libraryTarget: 'commonjs2'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=env&presets[]=react'
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/],
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: true,
                            localIdentName:"[name]__[local]___[hash:base64:5]"
                        },
                    },
                    {
                        loader: require.resolve('less-loader'), // compiles Less to CSS
                    },
                ],
            },
            // {
            //     test: /\.css$/,
            //     exclude: /node_modules|antd\.css/,
            //     use: [
            //         require.resolve('style-loader'),
            //         {
            //             loader: require.resolve('css-loader'),
            //             options: {
            //                 importLoaders: 1,
            //                 // 改动
            //                 modules: false,   // 新增对css modules的支持
            //                 localIndetName: '[name]__[local]__[hash:base64:5]', //
            //             },
            //         },
            //         {
            //             loader: require.resolve('postcss-loader'),
            //             options: {
            //                 ident: 'postcss',
            //                 plugins: () => [
            //                     require('postcss-flexbugs-fixes'),
            //                     autoprefixer({
            //                         browsers: [
            //                             '>1%',
            //                             'last 4 versions',
            //                             'Firefox ESR',
            //                             'not ie < 9', // React doesn't support IE8 anyway
            //                         ],
            //                         flexbox: 'no-2009',
            //                     }),
            //                 ],
            //             },
            //         },
            //     ],
            // },
            // {
            //     test: /\.css$/,
            //     include: /node_modules|antd\.css/,
            //     use: [
            //         require.resolve('style-loader'),
            //         {
            //             loader: require.resolve('css-loader'),
            //             options: {
            //                 importLoaders: 1,
            //                 // 改动
            //                 // modules: true,   // 新增对css modules的支持
            //                 // localIndetName: '[name]__[local]__[hash:base64:5]', //
            //             },
            //         },
            //         {
            //             loader: require.resolve('postcss-loader'),
            //             options: {
            //                 ident: 'postcss',
            //                 plugins: () => [
            //                     require('postcss-flexbugs-fixes'),
            //                     autoprefixer({
            //                         browsers: [
            //                             '>1%',
            //                             'last 4 versions',
            //                             'Firefox ESR',
            //                             'not ie < 9', // React doesn't support IE8 anyway
            //                         ],
            //                         flexbox: 'no-2009',
            //                     }),
            //                 ],
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: ['style-loader','css-loader']
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['lib'])
    ]
};
