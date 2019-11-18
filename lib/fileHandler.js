const fs = require('fs')
const fse = require('fs-extra')
const copyDir = fse.copy
const scanDirSync = require('deep-scan-dir/lib/deepScanDirSync')
const fileHandler = {}

// 复制文件
fileHandler.copyDir = copyDir

// 生成文件
fileHandler.mkdir = (path, cb) => {
  fs.exists(path, function (exists) {

    if (!exists) {
      fs.mkdir(path, function () {
        if (typeof cb === 'function') {
          cb()
        }
      })
    } else {
      if (typeof cb === 'function') {
        cb()
      }
    }
  })

}

fileHandler.scanDirSync = (from, exclude) => {
  const {files} = scanDirSync({
    from,
    exclude
  })
  return files
}

// 写文件
fileHandler.writeFile = (file, data, cb) => {
  fs.writeFile(file, data, function (err, data) {
    if (err) {
      console.log(file + '写文件操作失败:', err)
    } else {
      console.log('写入成功' + file)
      if (cb) {
        cb()
      }
    }
  })
}

fileHandler.readFileCount = 0

// 读文件
fileHandler.readFile = (file, cb) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      console.log('读文件失败 ' + err + file)
    } else {
      cb(data)
      console.log('读文件成功 ' + (++fileHandler.readFileCount) + ' : ' + file)
    }
  })
}

module.exports = fileHandler
