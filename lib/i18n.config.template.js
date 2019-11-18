const cwd = process.cwd()

module.exports = {
  // the code path to be scanned
  scanPath: cwd + '/src',
  // the exclude rules, contains directory and file
  exclude: {
    // 需要排除的规则
    dir: ['bower_components', 'assets', 'dashboard', 'NBReport'],
    file: []
  },
  // the accessible file types of code
  fileTypes: ['js', 'html'],
  // the source path of i18n resource
  i18nSourcePath: cwd + '/i18n/resource',
  i18nZhResource: cwd + '/i18n/resource/zh.js',
  i18nEnResource: cwd + '/i18n/resource/en.js',

  i18nBuildPath: cwd + '/i18n/build',

  zhRegex: /[\u4e00-\u9fa5][\u4e00-\u9fa5！。，\d-]*/g,

  replaceFormatter: '$i182222n["{key}"]' // {key} 是占位符
}
