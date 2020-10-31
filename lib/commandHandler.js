'use strict'

const ParentCommand = require('./parentcommand.js');

class CommandHandler extends ParentCommand {

   constructor(api) {
      super('commands');
      this.title = '';
      this.api = api;
      this.load(api);
   }

   parse(cmdString) {
      let commandStream = cmdString.split(' ');

      const command = commandStream[0].trim();

      commandStream.shift();

      return {cmd: command, args: commandStream};
   }

   handle(parsed, message) {

      // no command
      if (parsed.cmd.trim() == '') return;

      // handle
      this.payload({...this.api, message, commandMap: this.commandMap}, [parsed.cmd, ...parsed.args]);
   }
}

module.exports = CommandHandler;