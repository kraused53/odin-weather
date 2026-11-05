 import path from 'node:path';
 import HtmlWebpackPlugin from "html-webpack-plugin";
 import { fileURLToPath } from 'node:url';

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

 export default {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                use: ["html-loader"],
            },
        ],
    },
};
