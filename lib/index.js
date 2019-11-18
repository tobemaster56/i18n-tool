const cwd = process.cwd()
const fse = require('fs-extra')
const path = require('path')
const i18nConfig = `${cwd}/i18n.config.js`
const chineseHandler = require('./chineseHandler')
const translate = require('google-translate-open-api').default
const {parseMultiple} = require('google-translate-open-api')
const _ = require('lodash')

exports.init = () => {
  fse.exists(i18nConfig, (exist) => {
    if (exist) {
      console.log('i18n.config.js has been existed, so nothing happens')
    } else {
      fse.copy(path.join(__dirname, './i18n.config.template.js'), i18nConfig, (err) => {
        if (err) {
          console.error(err)
        } else {
          console.log('i18n.config.js has been created')
        }
      })
    }
  })
}

exports.extract = () => {
  fse.exists(i18nConfig, (exist) => {
    if (exist) {
      console.log(i18nConfig)
      chineseHandler.extract()
    } else {
      console.log('i18n.config.js hasn\'t been existed, run `i18n init` to create a config file')
    }
  })
}

exports.translate = (lang) => {
  const config = require(i18nConfig)
  const zhResource = require(config.i18nZhResource)
  const zhList = Object.values(zhResource)

  translate(zhList, {
    tld: 'cn',
    to: lang
  }).then(({data}) => {
    const tmp = data[0]
    const parseData = parseMultiple(tmp)

    let enObj = {}
    parseData.forEach((data, index) => {
      let i18nZh = zhList[index]
      enObj['' + (_.invert(zhResource))[i18nZh]] = data
    })
    chineseHandler.genI18nSource(config.i18nEnResource, enObj, true, true)
  })
}
