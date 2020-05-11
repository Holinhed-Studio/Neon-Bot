'use strict'

function getExtension(filename) {
   return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

module.exports = getExtension;