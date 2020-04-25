'use strict'

function payload(api, args) {

   if (!api.store.exists('cmd_resetstore')) {
      api.store.pushKey('cmd_resetstore', 0);
   }

   if (api.store.get('cmd_resetstore') == 0) {
      api.message.channel.send('Please type CONFIRM as an argument to confirm. CANCEL to cancel.');
      api.store.set('cmd_resetstore', 1);
      return;
   }

   if (api.store.get('cmd_resetstore') == 1) {
      if (args[0].toUpperCase() == 'CONFIRM') {
         api.store.clearStore();
         api.message.channel.send('Store has been reset.');
      } else if (args[0].toUpperCase() == 'CANCEL') {
         api.store.clearKey('cmd_resetstore');
         api.message.channel.send('Action canceled.');
      } else {
         api.message.channel.send('Interpreting vague answer as \'no\'');
         api.store.clearKey('cmd_resetstore');
      }
   }
}

module.exports = {
   name: "resetStore",
   desc: "Resets the store.",
   permissions: 100,
   author: 'Holinhed',
   payload,
};

