/**
 *  create by miaoyu  2017/11/06
 *
 *  当变慢完成，需要打包发布的时候，先进行中文替换成变量
 */

const fse = require("fs-extra");
const chineseHandler = require('./chineseHandler');
const config = require("./i18n.config")

const zhResource = require(config.i18nZhResource);

// 将源路径复制到一个新的路径，以免污染源码

fse.emptyDirSync(config.i18nBuildPath)

fse.copy(config.scanPath, config.i18nBuildPath, err => {
    if (err) {
        console.error(err)
    } else {
        console.log("start replace zh");

        // 根据新生成的路径，将中文替换成 i18n Key

        chineseHandler.replace(zhResource)
    }
});    