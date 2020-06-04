'use strict'

module.exports = {
   name: 'testPermFor',
   usage: '<id/user>',
   permissions: 100,
   payload(api, args) {

      if (args.length != 1) return 2;

      const plevel = api.permFinder.byId(args[0], api.message);

      api.message.channel.send(`User's permission level: ${plevel}.`);
   }
}