/**
 *  create by miaoyu  2017/11/06
 * 
 *  开发过程中 处理新增的中文 
 */

var dealIncrement = require('./dealIncrement');

var chineseHandler = require('./chineseHandler');

var paths = require('./i18n.config');

var scanPath = paths.scanPath;

var sourcePath = paths.sourcePath;

var folderPath = paths.folderPath;

chineseHandler.extract(scanPath, sourcePath, function() {
    // 新生成的资源
    var newRe = require('./i18n/zh/resource');
    // 老资源
    var oldRe = require('./i18n/oldResource');
    dealIncrement(oldRe, newRe, folderPath);
});



