const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const appDirectory = fs.realpathSync(process.cwd());

// module.exports = {
//         entry: path.resolve(appDirectory, "src/main_user.ts"), //path to the main .ts file
//         output: {
//                 filename: "bundle_user.js", //name for the js file that is created/compiled in memory
//                 clean: true,
//         },
//         resolve: {
//                 extensions: [".tsx", ".ts", ".js"],
//         },
//         devServer: {
//                 host: "0.0.0.0",
//                 port: 8080, //port that we're using for local host (localhost:8080)
//                 static: path.resolve(appDirectory, "public"), //tells webpack to serve from the public folder
//                 hot: true,
//                 devMiddleware: {
//                         publicPath: "/",
//                 },
//         },
//         module: {
//                 rules: [
//                         {
//                                 test: /\.tsx?$/,
//                                 use: "ts-loader",
//                                 exclude: /node_modules/,
//                         },
//                         {
//                                 test: /\.css$/,
//                                 use: ["style-loader", "css-loader"],
//                         },
//                         // {
//                         //         test: /\.(png|jpg|gif)$/,
//                         //         use: [
//                         //                 {
//                         //                         loader: "file-loader",
//                         //                         // options: {
//                         //                         //         limit: 8192,
//                         //                         //         fallback: require.resolve("file-loader"),
//                         //                         // },
//                         //                 },
//                         //         ],
//                         // },
//                 ],
//         },
//         plugins: [
//                 new HtmlWebpackPlugin({
//                         inject: true,
//                         template: path.resolve(appDirectory, "public/user_screen.html"),
//                 }),
//         ],
//         mode: "production",
// };



module.exports = {
        entry: path.resolve(appDirectory, "src/main.ts"), //path to the main .ts file
        output: {
                filename: "bundle.js", //name for the js file that is created/compiled in memory
                clean: true,
        },
        resolve: {
                extensions: [".tsx", ".ts", ".js"],
        },
        devServer: {
                host: "0.0.0.0",
                port: 8080, //port that we're using for local host (localhost:8080)
                static: path.resolve(appDirectory, "public"), //tells webpack to serve from the public folder
                hot: true,
                devMiddleware: {
                        publicPath: "/",
                },
        },
        module: {
                rules: [
                        {
                                test: /\.tsx?$/,
                                use: "ts-loader",
                                exclude: /node_modules/,
                        },
                        {
                                test: /\.css$/,
                                use: ["style-loader", "css-loader"],
                        },
                        // {
                        //         test: /\.(png|jpg|gif)$/,
                        //         use: [
                        //                 {
                        //                         loader: "file-loader",
                        //                         // options: {
                        //                         //         limit: 8192,
                        //                         //         fallback: require.resolve("file-loader"),
                        //                         // },
                        //                 },
                        //         ],
                        // },
                ],
        },
        plugins: [
                new HtmlWebpackPlugin({
                        inject: true,
                        template: path.resolve(appDirectory, "public/bj_screen.html"),
                }),
        ],
        mode: "development",
};
