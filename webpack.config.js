const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
    },
    devtool: 'inline-source-map',
    // what to do with the TS files
    module: {
        rules: [
            {
                // any file that ends in .ts should be handled by this rule 
                test: /\.ts$/, 
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        // which file extensions it should add to the imports it finds
        extensions: ['.ts', '.js']
    }
};