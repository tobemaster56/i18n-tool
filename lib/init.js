const cwd = process.cwd()
console.log(cwd);

const fse = require("fs-extra")
const i18nConfig = `${cwd}/i18n.config.js`

fse.ensureFile(i18nConfig, err=>{
  if(err) console.error(err)
  
})