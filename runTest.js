'use strict'

require('@babel/register')({});

console.log("BABEL LOADED!");

let args = process.argv.slice(2);

module.exports = require('./' + args[0]);