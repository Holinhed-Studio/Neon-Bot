'use strict'

function payload(api, args) {

   let servers = api.settingsManager.get("blacklist");

   let content = "**-- Blacklisted servers --**\n";
   for (let name of servers) {
      content += `${name}\n`;
   }
   
   api.message.channel.send(content);
}

module.exports = {
   name: "list",
   desc: "shows the blacklist",
   author: 'Holinhed',
   payload,
};

