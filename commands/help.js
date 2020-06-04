'use strict'

function payload(api, args) {
   if (args.length == 0) {
      api.message.reply('Here you go! http://fantasy.works/');
      return;
   }

   if (args.length > 1) {
      return 2;
   }

   const command = args[0];

   if (!api.commandMap[command]) {
      return { message: `Command '${command}' does not exist.` };
   }

   const cmdObj = api.commandMap[command];

   const prefix = api.settingsManager.get('prefix');

   const nameOut = `**Name:** ${command}\n`; 
   const descOut = `**Desc:** ${cmdObj.desc || 'No description provided.'}\n`;
   const usageOut = `**Usage:** ${prefix}${command} ${cmdObj.usage || ''}\n`;
   const versionOut = cmdObj.version ? `**Version:** ${cmdObj.version}\n` : '';
   const authorOut = cmdObj.author ? `**Author:** ${cmdObj.author}\n` : '';

   api.message.channel.send(nameOut + descOut + usageOut + versionOut + authorOut);
}

const system_help = {
   name: "help",
   desc: "Shows documentation about a command.",
   permissions: 1,
   usage: "<command>",
   payload: payload,
   author: "Holinhed",
   version: '1.1.1',
}

module.exports = system_help;