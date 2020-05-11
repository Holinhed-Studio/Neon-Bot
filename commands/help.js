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
   const usuage = cmdObj.usuage || '';
   const authorout = cmdObj.author ? `**Author:** ${cmdObj.author}` : ''
   const toSend = `**Name:** ${command}\n**Description:** ${cmdObj.desc}\n**Usuage:** ${prefix}${command} ${usuage}\n**Perm Level:** ${cmdObj.permissions || 0}\n${authorout}`;

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