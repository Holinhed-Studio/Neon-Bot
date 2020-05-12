'use strict'

function payload(api, args) {

   if (args.length != 1) {
      return 2;
   }

   const amount = parseInt(args[0]) + 1;

   if (amount > 100 || amount < 1) {
      api.message.channel.send('[bulkdelete] Amount has to be between 1-100.');
      return;
   }

   api.message.channel.bulkDelete(amount);
}

const bulkDelete = {
   name: 'bulkDelete',
   desc: 'Clears specificed amount of messages in channel it\'s executed in',
   usage: '<amount>',
   author: 'Holinhed',
   version: '1.0',
   payload,
}

module.exports = bulkDelete;