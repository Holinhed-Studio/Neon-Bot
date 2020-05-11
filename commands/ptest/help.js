'use strict'

module.exports = {
   name: 'help',
   desc: 'lists all commands for ptest',
   author: 'Holinhed',
   payload(api, args) {

      let out = "";

      //api.ptest.commandMap.forEach(item => {
      //   out += item.name + "    " + item.desc + "\n";
      //});

      for (const [key, val] of Object.entries(api.ptest.commandMap)) {
         out += `**${val.name}**: ${val.desc}\n`;
      }

      //console.log(api.ptest.commandMap)

      api.message.channel.send(out);

   }
}