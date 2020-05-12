'use strict'

function commandPayload(api, args) {
   
   if (args.length != 1) {
      return 2;
   }

   if (!api.store.get('test')) {
      api.store.pushKey('test', '');
   }
   
   if (args[0].trim().length != 1) {
      api.message.channel.send('Please only enter 1 character.');
      return;
   }

   const current = api.store.get('test');
   api.store.set('test', current + args[0].trim());

   api.message.channel.send('Current value: ' + api.store.get('test'));
}

const system_help = {
   name: "modifystate",
   desc: "Test for state management.",
   permissions: 100,
   usage: "<value>",
   payload: commandPayload,
   author: "Holinhed",
}

module.exports = system_help;