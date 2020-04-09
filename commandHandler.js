'use strict'

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
      //message.channel.send("Hello There");

      //console.log(parsed);

      if (parsed.cmd == 'displayCommandMap') {
         message.channel.send(JSON.stringify(commandMap));
         return;
      }

      //no command 
      if (parsed.cmd.trim() == '') return;

      try {
         const result = commandMap[parsed.cmd].payload({...this.api, message}, parsed.args);
      } catch (err) {
         console.log(err);
         message.channel.send(`Command "${parsed.cmd}" not found.`);
      }

   }

}

module.exports = CommandHandler;