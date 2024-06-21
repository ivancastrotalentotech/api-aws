import * as path from 'path';
import { Configuration, EnvironmentPlugin } from 'webpack';
import * as  CopyPlugin from 'copy-webpack-plugin';
import * as nodeExternals from 'webpack-node-externals';

const envs = {
    LAST_COMPILED : new Date().toLocaleString()
};

const config: Configuration = {
    entry  : path.join(__dirname, 'dist/main.js'),
    output : {
        path     : path.join(__dirname, 'build'),
        filename : 'api-aws.js',
    },
    mode      : 'production',
    target    : 'node',
    externals : [ nodeExternals() as any ],
    resolve   : {
        extensions: [ '.js' ],
    },
    plugins: [
        new EnvironmentPlugin(envs),
        new CopyPlugin({
            patterns: [ { from: 'package.json', to: '.' } ],
        }),
    ],
    module: {
        rules: [
            {
                test    : /\.ts$/,
                include : /src/,
                use     : [ { loader: 'ts-loader' } ],
            },
        ],
    },
};

export default config;