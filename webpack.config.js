const path = require('path');
var webpack = require('webpack');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); //壓縮css檔
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//將css檔放到指定的資料夾
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清空dist資料夾
const HtmlWebpackPlugin = require('html-webpack-plugin') //引用資源，輸入及要輸出的檔名
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const glob = require('glob');
// const alias = require('rollup-plugin-alias')
const obj = [
    {   //brands (一次性，不壓縮)
        js_main: './src/brands/js/main2.js',
        img: './src/brands/scss',
        img_publicPath: '../PRE/', //輸出的檔案or資料夾名稱(依當時時專案改名)
        img_outputPath: 'PRE', //輸出的檔案or資料夾名稱(依當時時專案改名)
        css_outputPath: 'PRE/[name].css', //輸出的檔案or資料夾名稱(依當時時專案改名)
        html_template: './src/brands/code/index.html',
        html_filename: 'code/index.html', //輸出的檔案or資料夾名稱
        minimize: false //輸出時不壓縮
    },
    {   //brita
        js_main: './src/brita/caseName/js/main.js',//輸出的檔案or資料夾名稱(依當時時專案改名)
        img: './src/brita/caseName/images',//輸出的檔案or資料夾名稱(依當時時專案改名)
        img_publicPath: '../images/',
        img_outputPath: 'images',
        css_outputPath: 'images/[name].css?v=[hash]',
        html_template: './src/brita/caseName/index.html', //輸出的檔案or資料夾名稱(依當時時專案改名)
        html_filename: 'code/index.html',
        minimize: true
    },
    {   //order
        js_main: './src/order/caseName/js/main.js',//輸出的檔案or資料夾名稱(依當時時專案改名)
        img: './src/order/caseName/images',//輸出的檔案or資料夾名稱(依當時時專案改名)
        img_publicPath: '../images/',
        img_outputPath: 'images',
        css_outputPath: 'images/[name].css?v=[hash]',
        html_template: './src/order/caseName/index.html', //輸出的檔案or資料夾名稱(依當時時專案改名)
        html_filename: 'code/index.html',
        minimize: true
    },
]
const getEntry = () => {
    const file = "/src/brands/js/"
    let fileLenght = file.length
    const entry = {};

    glob.sync(`./src/brands/js/*.js`).forEach((name) => {
        const start = name.indexOf('/src/brands/js/') + fileLenght; //前面路徑共8個位元的字串，設定的資料夾路徑不同，也要記得更改位元數喔!
        const end = name.length - 3; //減去附檔名 .js 共三個位元的字串
        const eArr = [];
        const n = name.slice(start, end); //取得每個js的名稱
        eArr.push(name); //push至陣列中
        entry[n] = eArr; //就會產生多筆入口的陣列囉！
    });
    return entry;
};
//
var config = {
    mode: 'development', //development開發；production生產(預設)
    entry: obj[1].js_main, //進入點，引入各種類的檔案，包括圖片或css  //obj[1].js_main
    output: { //輸出
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js?v=[hash]',
        // publicPath: '../dist/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist/'),
        compress: true,
        port: 1234,
        open: true,
        // publicPath : `/dist/`

    },
    resolve: {
        alias: {
            '@img': path.resolve(obj[1].img), //*** */
            '@src': path.resolve(__dirname, 'src/act02/js'),
            '@demoImg': path.resolve(__dirname, 'assets/icon'),
            '@fortawesome': '/node_modules/@fortawesome/fontawesome-free/webfonts'
        },
    },
    module: {
        rules: [

            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
                //css-loader讀取css檔；sass-loader讀取scss檔
                //postcss-loader自動加上劉覽器前綴詞。sass-loader編譯scss檔為css
                //MiniCssExtractPlugin.loader輸出css到指定的資料夾
            },
            

            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]', //經過打包後，輸出的名稱。name是原檔名。ext是副檔名
                            // publicPath: 'http://127.0.0.1:5500/dist/images/', //在輸出的css引用時的路徑，用相對位址
                            publicPath: obj[1].img_publicPath,
                            outputPath: obj[1].img_outputPath, ////輸出的資料夾名稱
                            limit: 1024, //對小於1024B大小的圖片進行base64格式的轉化處理
                            esModule: false, //配合html-withimg-loader，在html內的圖片路徑，不轉換預設路徑，而是照html上寫好的路徑。true该配置项为图片打包后的默认路径，带default对象
                            emitFile: true
                        }
                    },
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ]
    },
    optimization: {
        minimize: obj[1].minimize, //是否壓縮，會影響css和js
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                // extractComments: true,//將註釋剝離到單獨的文件中
                terserOptions: {
                    // exclude: /\/main/, //跳過的檔案
                    // parallel: true, //加速編譯
                    output: {
                        comments: obj[1].minimize, //是否壓縮
                    },
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true
                    },
                },
            }),
            new OptimizeCssAssetsWebpackPlugin(), //壓縮css檔
            
        ]
    },
    plugins: [
        // alias({
        //     '@fortawesome/fontawesome-free-solid': 'node_modules/@fortawesome/fontawesome-free-solid/shakable.es.js'
        //   }),
        new CleanWebpackPlugin(),//清空dist資料夾

        new MiniCssExtractPlugin({
            filename: obj[1].css_outputPath,//將css檔放到指定的資料夾
        }),
        new HtmlWebpackPlugin({ //引用資源，輸入及要輸出的檔名
            template: obj[1].html_template, //*** */
            filename: obj[1].html_filename,
            // minify: false,
            // chunks: ['main'],//指定需要引入的js，沒有設置默認全部引入
            inject: 'true', //打包之后的js插入的位置，true/'head'/'body'/false,
            //chunks: ['这里写entry里面你想引用哪些打包的js文件,这文件是个数组']
            minify: {
                minify: false,
                html5: true,
                includeAutoGeneratedTags: false,
                removeComments: true, // 改爲false //刪除HTML註釋
                collapseInlineTagWhitespace: false, //折疊時，請勿在元素之間留任何空間
                collapseWhitespace: false, // 改爲false//折疊有助於文檔樹中文本節點的空白
                preserveLineBreaks: true, //當標籤之間的空格包含換行符時，請務必合攏到1個換行符（永遠不要將其完全刪除）。必須與collapseWhitespace=true
                removeAttributeQuotes: false, // 改爲false//移除空白
                sortAttributes: true, //按頻率對屬性進行排序
                sortClassName: true, //按頻率對樣式類進行排序
            },
            //chunksSortMode: 'dependency'
        }),
        new webpack.ProvidePlugin({
            // $: 'jquery',
            //jQuery: 'jquery'//這邊以上是新增
            $: 'jquery/dist/jquery.slim.min.js' //輕量版，完整路徑node_modules/jquery/dist/jquery.js
        }),
        new BundleAnalyzerPlugin({
            //  可以是`server`，`static`或`disabled`。
            //  在`server`模式下，分析器將啟動HTTP伺服器來顯示軟體包報告。
            //  在“靜態”模式下，會生成帶有報告的單個HTML檔案。
            //  在`disabled`模式下，你可以使用這個外掛來將`generateStatsFile`設定為`true`來生成Webpack Stats JSON檔案。
            analyzerMode: "static",
            //  將在“伺服器”模式下使用的主機啟動HTTP伺服器。
            analyzerHost: "127.0.0.1",
            //  將在“伺服器”模式下使用的埠啟動HTTP伺服器。
            analyzerPort: 8866,
            //  路徑捆綁，將在`static`模式下生成的報告檔案。
            //  相對於捆綁輸出目錄。
            reportFilename: "report.html",
            //  模組大小預設顯示在報告中。
            //  應該是`stat`，`parsed`或者`gzip`中的一個。
            //  有關更多資訊，請參見“定義”一節。
            defaultSizes: "parsed",
            //  在預設瀏覽器中自動開啟報告
            openAnalyzer: false,
            //  如果為true，則Webpack Stats JSON檔案將在bundle輸出目錄中生成
            generateStatsFile: true,
            //  如果`generateStatsFile`為`true`，將會生成Webpack Stats JSON檔案的名字。
            //  相對於捆綁輸出目錄。
            statsFilename: "stats.json",
            //  stats.toJson（）方法的選項。
            //  例如，您可以使用`source：false`選項排除統計檔案中模組的來源。
            //  在這裡檢視更多選項：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            statsOptions: null,
            logLevel: "info"
        })

    ],

}

module.exports = config;



