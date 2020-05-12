'use strict'

function payload(api, args) {

   const version = api.settingsManager.get('version');

   api.message.channel.send("Version: " + version);
}

module.exports = {
   name: "version",
   desc: "Shows version of the bot.",
   permissions: 100,
   author: "Holinhed",
   payload,
};