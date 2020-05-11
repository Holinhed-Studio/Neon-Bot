'use strict'

const path = require('path');
const fs = require('fs');
const getExtension = require('./extensionGetter.js');
const permFinder = require('./permFinder.js');

class ParentCommand {

   constructor(name) {
      if (this.constructor == ParentCommand) {
         throw new Error('Class ParentCommand is abstract, and cannot be instantiated.');
      }

      this.name = name;
      this.commandMap = {};
      this.usuage = '<cmd> <subcmd>';

      //this.load();
   }

   load() {
      
      let fpath = path.join(__dirname, '..' + path.sep + 'commands' + path.sep + this.name);

      if (this.pathoverride) fpath = path.join(this.pathoverride, (path.sep + this.name));

      let files;

      try {
         files = fs.readdirSync(fpath);
      } catch (err) {
         console.log(`[CRITICAL] Cannot load commands.\n${err}`);
         return;
      }

      files.forEach(file => {

         const ext = getExtension(file);

         if (ext != 'js') return;

         let command;

         try {
            command = require(fpath + path.sep + file);

            if (command instanceof ParentCommand) {
               command.pathoverride = fpath;
               command.load();
            }

         } catch(err) {
            console.log(`[CRITICAL] Cannot load commands.\n${err}`);
            return;
         }

         if (this.commandMap[command.name]) {
            console.log(`[ERROR] Failed to load command '${command.name}' because a command by that name already exists.`);
            return;
         }

         if (!command.name) {
            console.log(`[ERROR] Failed to load command '${file}' because a command name wasn't provided.`);
            return;
         }

         this.commandMap = {...this.commandMap, [command.name]: command};

      });

      console.log(`Parent command '${this.name}' loaded successfully!`);
   }

   prepayload(api, args) { }

   payload(api, args) {

      this.prepayload(api, args);
      //api.message.channel.send(JSON.stringify(this.commandMap));
      if (args.length < 1) return 2;

       const cmd = args[0];
       const pargs = args.splice(1);

      try {
         if (!this.commandMap[cmd]) {
            api.message.channel.send(`Command "${cmd}" not found.`);
            return;
         }

         const permLevel = permFinder.byMessage(api.message, api.settingsManager);

         if (permLevel < this.commandMap[cmd].permissions && permLevel != -1) {
            api.message.reply('You don not have permission to run that command.');
            return;
         }

         const result = this.commandMap[cmd].payload({...api, [this.name]: this}, pargs);

         if (result === 2) {
            api.message.channel.send(`Usuage: ${cmd} ${this.commandMap[cmd].usuage || ''}`)
         }
         
         if (typeof result === 'object' && result !== null) {
            api.message.channel.send(`There was a problem running that command.\n[Message] ${result.message}`);
            console.log(result.message);
         }

      } catch (err) {
         api.message.channel.send('[CRITICAL] There was a problem running that command.');
         console.log(err);
      }

   }

}

module.exports = ParentCommand;