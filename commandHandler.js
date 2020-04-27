'use strict'

const permFinder = require('./lib/permFinder.js');

let commandMap;

require('./commandLoader.js')
.then(value => {
   commandMap = value;
});

class CommandHandler {

   constructor(api) {
      this.api = api;
   }

   parse(cmdString) {
      let commandStream = cmdString.split(' ');

      const command = commandStream[0].trim();

      commandStream.shift();

      return {cmd: command, args: commandStream};
   }

   handle(parsed, message) {
      //no command 
      if (parsed.cmd.trim() == '') return;

      try {
         const permLevel = permFinder.byMessage(message, this.api.settingsManager);
         if (commandMap[parsed.cmd] && permLevel < commandMap[parsed.cmd].permissions && permLevel != -1) {
            message.reply(`You don't have permission to run that command. Required: ${commandMap[parsed.cmd].permissions}, Yours: ${permLevel} `);
            return;
         }

         const result = commandMap[parsed.cmd].payload({...this.api, message, commandMap}, parsed.args);
         if (result === 2) {
            const prefix = this.api.settingsManager.getAttribute('prefix');
            message.channel.send(`Usuage: ${prefix}${parsed.cmd} ${commandMap[parsed.cmd].usuage || ''}`);
         }
         if (result === 1) {
            message.channel.send(`There was a problem running that command.`);
         } 
      } catch (err) {
         console.log(err);
         message.channel.send(`Command "${parsed.cmd}" not found.`);
      }

   }

}

module.exports = CommandHandler;