const fs = require('fs');

const requireText = function (module, filename) {
    console.log(`Pretend import of ${filename}`)
    module.exports = filename;
};

require.extensions['.svg'] = requireText
require.extensions['.css'] = requireText;
