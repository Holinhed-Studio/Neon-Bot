'use strict'

function payload(api, args) {

   if (args.length != 1) return 2;

   let servers = api.settingsManager.get("blacklist");

   if (servers.includes(args[0])) {
      api.message.channel.send("Server is already on the blacklist.");
      return;
   }

   servers.push(args[0]);

   api.settingsManager.set("blacklist", servers);

   api.message.channel.send("Server added to blacklist.");
   api.settingsManager.save();
}

module.exports = {
   name: "add",
   desc: "Add server to blacklist.",
   usage: "<serverid>",
   author: 'Holinhed',
   payload,
};

