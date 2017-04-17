
// generate a npm install command from package.json
const fs = require('fs');
const path = require('path');

const package_json_file = process.argv[2] || path.resolve(__dirname, '../package.json');
const package_json = JSON.parse(fs.readFileSync(package_json_file));

const deps = Object.keys(package_json['dependencies']).join(' ');
const dev_deps = Object.keys(package_json['devDependencies']).join(' ');

const arg_save = !!deps.trim().length ? ` --save ${deps}` : '';
const arg_save_dev = !!dev_deps.trim().length ? ` --save-dev ${dev_deps}` : '';

console.log(`npm install${arg_save_dev}${arg_save}`);

