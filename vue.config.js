const path = require('path')

function resolve(dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    devServer: {
        proxy: {
            '/silence': {
                target: 'http://localhost:1113',
                changeOrigin: true,
                pathRewrite: {
                    '^/silence': '/'
                }
            },
            '/one': {
                target: 'https://api.hibai.cn/api/index/index',
                changeOrigin: true,
                pathRewrite: {
                    '^/one': '/'
                }
            }
        }
    },
    chainWebpack: config => {
        // config.plugin('define').tap(args => {
        //     const argv = process.argv;
        //     const icourt = argv[argv.indexOf('--icourt-mode') + 1];
        //     args[0]['process.env'].MODE = `${icourt}`;
        //     return args;
        // });
        // // svg rule loader
        // const svgRule = config.module.rule('svg'); // 找到svg-loader
        // svgRule.uses.clear();                      //清除已有的loader, 如果不这样做会添加在此loader之后
        // svgRule.exclude.add(/node_modules/);       // 正则匹配排除node_modules目录
        // svgRule.test(/\.svg$/)
        //     .use('svg-sprite-loader')
        //     .loader('svg-sprite-loader')
        //     .options({symbolId: 'icon-[name]'});// 添加svg新的loader处理
        //
        // // 修改images loader 添加svg处理
        // const imagesRule = config.module.rule('images');
        // imagesRule.exclude.add(resolve('src/assets/svg'));
        // config.module
        //     .rule('images')
        //     .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
        //
        config.resolve.alias
            .set('@', resolve('src'));
        config.module.rules.delete("svg");
        config.module
            .rule('svg-smart')
            .test(/\.svg$/)
            .include
            .add(resolve('src/assets/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]'
            })
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "appId": "com.example.app",
                "productName": "SILENCE_VUE",//项目名，也是生成的安装文件名，即aDemo.exe
                "copyright": "Copyright © 2019",//版权信息
                "directories": {
                    "output": "./dist_electron"//输出文件路径
                },
                // win: {
                //     icon: './public/favicon.ico'
                // },
                // mac: {
                //     icon: './public/img/android-chrome-512x512.png'
                // }
            }
        }

    }
}