'use strict'

require('@babel/register')({});

console.log("=== STARTUP BEGIN ===");
console.log("BABEL LOADED!");

module.exports = require('./index.js');