'use strict'

function payload(api, args) {

   if (args.length != 1) return 2;

   let servers = api.settingsManager.get("blacklist");

   let i = 0;
   for (; i < servers.length; i++) {
      if (servers[i] == args[0]) break;
   }

   servers.splice(i, 1);

   api.settingsManager.set("blacklist", servers);
   api.settingsManager.save();

   api.message.channel.send("Server removed from blacklist.");
}

module.exports = {
   name: "remove",
   desc: "Remove server from blacklist.",
   usage: "<serverid>",
   author: 'Holinhed',
   payload,
};

