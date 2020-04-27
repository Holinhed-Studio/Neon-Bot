'use strict'

const permFinder = require('../lib/permFinder.js');

function list(api) {
   let output = 'Max Permission Level: ' + api.permissions.permCap + '\n\n';
   output += '**Super User**: *\n';

   for (const [key, val] of Object.entries(api.permissions.permLevels)) {
      output += `**${key}**: ${val}`;
      api.message.channel.send(output);
   }
}

function addSuperUser(api, args) {

}

function set(api, args) {

}



function payload(api, args) {

   if (args.length < 1) return 2;

   const permissions = api.settingsManager.getAttribute('permissions');

   if (args[0].toLowerCase().trim() == 'list') {
      list({...api, permissions});
      return;
   }

   if (args[0].toLowerCase().trim() == 'set') {

      return;
   }

   

}

module.exports = {
   name: "permissions",
   desc: "Permission Management System.",
   permissions: 100,
   usuage: "<cmd> <args...>",
   author: 'Holinhed',
   payload,
};

