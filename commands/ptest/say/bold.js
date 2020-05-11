'use strict'

module.exports = {
   name: 'bold',
   usuage: '<message>',
   payload(api, args) {

      if (args.length < 1) return 2;

      let m = "";

      args.forEach(v => {
         m += " " + v;
      });

      api.message.channel.send('**' + m + '**');
   }
}