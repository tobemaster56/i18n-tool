let scanPath = __dirname + "/src";

module.exports = {
    scanPath,
    exclude: {  // 需要排除的规则
        dir: [
            "bower_components",
            "assets",
            "dashboard",
            "NBReport",
        ],
        file: []
    },

    folderPath: __dirname + '/i18n/inResource',
    fileTypes: ["js", "html"],

    i18nSourcePath: __dirname + "/i18n/resource",
    i18nZhResource: __dirname + "/i18n/resource/zh.js",
    i18nEnResource: __dirname + "/i18n/resource/en.js",

    i18nBuildPath: __dirname + "/i18n/build",

    zhRegex: /[\u4e00-\u9fa5][\u4e00-\u9fa5！。，\d\-]*/g,

    replaceFormatter: "$i182222n[\"{key}\"]"   // {key} 是占位符
};


