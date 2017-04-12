
// insert babelrc config into package.json to enable es6 in babel-node
// also setup `npm run babel` script.

const babelrc = {
  "presets": [["env", {"targets": {"node": ["current"]}}]]
};

const fs = require('fs');
const path = require('path');

const package_json_file = path.resolve(__dirname, '../package.json');
const package_json = JSON.parse(fs.readFileSync(package_json_file));

package_json['babel'] = babelrc;
package_json['scripts']['babel'] = 'babel-node';

fs.writeFileSync(package_json_file, JSON.stringify(package_json, null, 2));
