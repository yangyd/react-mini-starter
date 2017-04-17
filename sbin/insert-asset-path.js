
// insert assets path from information generated from assets-webpack-plugin
// https://github.com/kossnocorp/assets-webpack-plugin

const fs = require('fs');
const path = require('path');

const base_path = path.resolve(__dirname, '../target');
const template_file = path.join(base_path, 'index.html.template');
const output_file = path.join(base_path, 'index.html');

const assets = JSON.parse(fs.readFileSync(path.join(base_path, '__assets.json')));

console.log();
console.log(`Generating ${output_file} ...`);
console.log(`  #COMMONS_BUNDLE# ==> ${assets.commons.js}`);
console.log(`  #MAIN_BUNDLE#    ==> ${assets.main.js}`);
console.log();

const index_html = fs.readFileSync(template_file, { encoding: 'utf8' })
  .replace('#COMMONS_BUNDLE#', assets.commons.js)
  .replace('#MAIN_BUNDLE#', assets.main.js);

fs.writeFileSync(output_file, index_html);
