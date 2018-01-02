module.exports = {

    entry: {
        reactMagnifier: './src/index.js',
    },
    output: {
        filename: './dist/react-magnifier.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-1']
                      }
                },
            },
        ],
    },
};
