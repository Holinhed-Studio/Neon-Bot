'use strict'

function payload(api, args) {

   if (args.length != 0) return 2;

   const version = api.settingsManager.get('version');

   api.message.channel.send("Version: " + version);
}

module.exports = {
   name: "version",
   desc: "Shows version of the bot.",
   version: "1.0.0",
   permissions: 25,
   author: "Holinhed",
   payload,
};