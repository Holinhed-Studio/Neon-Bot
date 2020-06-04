'use strict'

function payload(api, args) {

   if (args.length > 1) {
      return 2;
   }

   let output;

   if (args.length == 0) {
      output = api.store.data;
   } else {
      output = api.store.get(args[0]);
   }

   api.message.channel.send(`\`\`\`json
${JSON.stringify(output)}\`\`\``);
}

module.exports = {
   name: "showStore",
   desc: "Shows the current store.",
   permissions: 100,
   usage: "<key>",
   author: 'Holinhed',
   payload,
};

