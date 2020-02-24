const fs = require('fs');

const requireText = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

require.extensions['.svg'] = requireText
require.extensions['.css'] = requireText;
