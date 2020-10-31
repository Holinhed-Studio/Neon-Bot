'use strict'

module.exports = {
   name: 'help',
   desc: 'lists all commands for ptest',
   author: 'Holinhed',
   payload(api, args) {

      let out = "";

      for (const [key, val] of Object.entries(api.parentcmd.commandMap)) {
         out += `**${key}**: ${val.desc}\n`;
      }

      api.message.channel.send(out);

   }
}