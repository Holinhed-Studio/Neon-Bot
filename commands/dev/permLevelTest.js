'use strict'

const PermFinder = require('../../lib/permFinder.js');

module.exports = {
   name: 'testPermLevel',
   usage: '<role>',
   permissions: 100,
   payload(api, args) {
      if (args.length != 1) return 2;

      api.message.channel.send('Role Permission Level: ' + PermFinder.byRole(args[0], api.settingsManager));
   } 
}