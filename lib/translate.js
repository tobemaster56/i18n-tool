const translate = require('google-translate-open-api').default;
const  { parseMultiple } = require("google-translate-open-api");
// const config = require('./i18n.config');
const zhResource = require(config.i18nZhResource);
const _ = require("lodash");
const chineseHandler = require("./chineseHandler")

const zhList = Object.values(zhResource);

translate(zhList, {
    tld: "cn",
    to: "en",
}).then(({data})=>{
    const tmp = data[0];
    const parseData = parseMultiple(tmp);

    let enObj = {}
    parseData.forEach((data, index)=>{
        let i18nZh = zhList[index];
        enObj["" + (_.invert(zhResource))[i18nZh]] = data;
    });
    chineseHandler.genI18nSource(config.i18nEnResource, enObj, true, true);
});

exports.translate = translate
