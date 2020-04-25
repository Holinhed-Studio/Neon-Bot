'use strict'

function commandPayload(api, args) {
   
   if (args.length == 0) {
      api.message.reply("Here you go: http://fantasy.works/");
      return;
   }

   if (args.length > 1) {
      return 2;
   }

   const command = args[0];
   const cmdObj = api.commandMap[command];

   if (cmdObj == undefined) {
      api.message.channel.send(`Command '${command}' does not exist.`);
      return;
   }

   const prefix = api.settingsManager.getAttribute('prefix');
   const usage = cmdObj.usage || '';
   const toSend = `**Name:** ${command}\n**Description:** ${cmdObj.desc}\n**Usuage:** ${prefix}${command} ${usage}\n**Permissions:** ${cmdObj.permissions}\n**Author:** ${cmdObj.author}`;

   api.message.channel.send(toSend);
}

const system_help = {
   name: "help",
   desc: "Gets documentation about a command.",
   permissions: 1,
   usuage: "<command>",
   payload: commandPayload,
   author: "Holinhed",
}

module.exports = system_help;