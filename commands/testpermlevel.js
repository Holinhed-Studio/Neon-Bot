'use strict'

const permFinder = require('../lib/permFinder.js');

function payload(api, args) {

   if (args.length > 0) return 2;

   const plevel = permFinder.byMessage(api.message, api.settingsManager);
   const output = plevel == -1 ? '**Super User**' : plevel;

   api.message.reply('Your permission level is: ' + output);
}

module.exports = {
   name: 'myPermLevel',
   desc: 'Returns the permission level of the user who executed it.',
   author: 'Holinhed',
   payload,
}