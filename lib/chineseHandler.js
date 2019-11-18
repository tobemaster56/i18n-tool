/**
 *  create by miaoyu  2017/11/3
 *
 *  提取全部中文, 生成资源文件
 *
 *  -zh
 *    -resource.js
 *  -en
 *    -resource.js
 */

const fse = require("fs-extra");
const fileHandler = require('./fileHandler');
const config = require("./i18n.config")
const _ = require("lodash")

const scanDirSync = fileHandler.scanDirSync;
const readFile = fileHandler.readFile;
const writeFile = fileHandler.writeFile;

// 加载编码转换模块  
const iconv = require('iconv-lite');

const chineseHandler = {};

/**
 * 扫描代码，提取中文
 * @param scanPath 扫描代码路径
 * @param exclude 排除规则
 * @param resourcePath
 * @param cb
 */
chineseHandler.extract = (cb) => {
    const {scanPath, exclude} = config
    // 提取出的中文 对应的key value
    const obj = {};

    const files = scanDirSync(scanPath, exclude);

    Promise.all(
        files.map(function (file) {
            // 只读取后缀为.js .html的文件
            if (matchFileType(file, ["js", "html"])) {
                return new Promise((resolve, reject) => {
                    readFile(file, (content) => {
                        getChineseToArray(content, file, obj)
                        resolve()
                    });
                })
            }
        })
    ).then(function () {
        // 中文去重
        let o = _.invert(_.invert(obj));

        fse.ensureDirSync(config.i18nSourcePath);

        genI18nSource(config.i18nSourcePath + '/zh.js', o, true);
        genI18nSource(config.i18nSourcePath + '/en.js', o);
    })
}

// 扫描代码 替换中文, 为 key
chineseHandler.replace = (zhResource) => {

    const {i18nBuildPath, exclude, fileTypes} = config;
    const files = scanDirSync(i18nBuildPath, exclude);

    files.map((file) => {
        if (matchFileType(file, fileTypes)) {
            readFile(file, (content) => {
                const str = iconv.decode(content, 'utf-8');

                // 把文件中代码按行分割出来
                const arr = str.split('\n');

                arr.forEach(function (e, i) {
                    // 这行如果有中文
                    if (includeChinese(e)) {

                        const a = e.match(/[\u4e00-\u9fa5][\u4e00-\u9fa5！。，\d\-]*/g);

                        // 抽取中文
                        a.forEach(function (m) {
                            let key = getKeyByValue(zhResource, m);
                            let keyFormatter = config.replaceFormatter.replace('{key}', key);
                            e = e.replace(m, keyFormatter);
                            arr[i] = e;
                        })
                    }
                }, this);

                writeFile(file, arr.join('\n'))
            });

        }
    })
}




// 根据value, 得到key
function getKeyByValue(obj, val) {
    for (const key in obj) {
        if (obj[key] == val) {
            return key
        }
    }
    return false
}

// 将提取到的中文放入数组
function getChineseToArray(content, file, obj) {

    const str = iconv.decode(content, 'utf-8');

    // 把文件中代码按行分割出来
    const arr = str.split('\n');

    arr.forEach(function (e, i) {
        if (includeChinese(e)) {
            // 将中文抽成数组
            const a = e.match(config.zhRegex);

            // 抽取中文
            a.forEach(function (m, index) {
                // 中文变量的 key 名称
                let key = file.replace(config.scanPath, "from").replace(/\//g, '_');
                key = key.slice(0, key.indexOf('.'))
                obj['"' + key + "_" + i + index + '"'] = m;
            })
        }

    }, this);
}


// 判断字符串中是否包含汉字,  排除注释的情况
function includeChinese(val) {
    const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    return reg.test(val)
        && val.indexOf('//') == -1
        && val.indexOf('*') == -1
        && val.indexOf('console.log') == -1
        && val.indexOf('@param') == -1
        && val.indexOf('@brief') == -1;
}

// 判断文件后缀
function matchFileType(filename, types) {
    let pattern = '\.(';
    for (let i = 0; i < types.length; i++) {
        if (0 != i) {
            pattern += '|';
        }
        pattern += types[i].trim();
    }
    pattern += ')$';
    return new RegExp(pattern, 'i').test(filename);
};

function genI18nSource(fileName, o, fill, fillQuote) {
    let strHead = 'module.exports = {',
        strEnd = '}',
        all = [];

    all.push(strHead);

    for (let key in o) {
        let output = `    ${fillQuote ? '"' +key + '"' : key}:"${fill ? o[key] : ''}",`;
        all.push(output)
    }

    all.push(strEnd);

    writeFile(fileName, all.join('\n'), function () {
        console.log(fileName + "is generated");
    })
}

chineseHandler.genI18nSource = genI18nSource;
module.exports = chineseHandler;


