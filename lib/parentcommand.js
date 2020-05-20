'use strict'

const path = require('path');
const fs = require('fs');
const colors = require('./consolecolors.js');
const getExtension = require('./extensionGetter.js');
const permFinder = require('./permFinder.js');

class ParentCommand {

   constructor(name, title) {
      if (this.constructor == ParentCommand) {
         throw new Error('Class ParentCommand is abstract, and cannot be instantiated.');
      }

      this.name = name;
      this.title = title || name;
      this.commandMap = {};
      this.usage = '<cmd> <subcmd>';
      this.parents = [];
   }

   setMetadata(dat) {
      this.desc = dat.desc || undefined;
      this.author = dat.author || undefined;
      this.version = dat.version || undefined;
      this.permissions = dat.permissions || undefined;
   }

   load() {
      let fpath = path.join(__dirname, '..' + path.sep + this.name);

      if (this.pathoverride) fpath = path.join(this.pathoverride, (path.sep + this.name));

      let files;

      try {
         files = fs.readdirSync(fpath);
      } catch (err) {
         console.log(colors.format(colors.bg.red, colors.fg.white),`[CRITICAL] Could not load commands. (Error below)`);
         console.log(err);
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
               command.parents.push(this.title);
               command.load();
            }

            if (!command.parents) {
               command.parents = [...this.parents, this.title];
            }

         } catch(err) {
            console.log(colors.format(colors.bg.red, colors.fg.white), `[CRITICAL] Cannot load commands.`);
            console.log(err);
            return;
         }

         if (this.commandMap[command.name]) {
            console.log(colors.format(colors.fg.red), `[ERROR] Failed to load command '${command.name}' because a command by that name already exists.`);
            return;
         }

         if (!command.name) {
            console.log(colors.format(colors.fg.red),`[ERROR] Failed to load command '${file}' because a command name wasn't provided.`);
            return;
         }

         this.commandMap = {...this.commandMap, [command.name]: command};

      });

      console.log(`Command Directory '${this.name}' loaded successfully!`);
   }

   prepayload(api, args) { }

   payload(api, args) {
      if (args.length < 1) return 2;

      this.prepayload(api, args);

      const cmd = args[0];
      const pargs = args.splice(1);

      try {
         if (!this.commandMap[cmd]) {
            api.message.channel.send(`Command "${cmd}" not found.`);
            return;
         }

         const permLevel = permFinder.byMessage(api.message, api.settingsManager);

         if (permLevel < this.commandMap[cmd].permissions && permLevel != -1) {
            api.message.reply(`You do not have permission to run that command. [${permLevel}/${this.commandMap[cmd].permissions}]`);
            return;
         }

         const result = this.commandMap[cmd].payload({...api, [this.name]: this}, pargs);

         if (result === 2) {
            const prefix = api.settingsManager.get('prefix');
            const cparents = this.commandMap[cmd].parents;
            const hist = cparents.join(' ');
            api.message.channel.send(`Usage: ${prefix}${hist}${hist == '' ? '' : ' '}${cmd} ${this.commandMap[cmd].usage || ''}`);
            return;
         }
         
         if (typeof result === 'object' && result !== null) {
            api.message.channel.send(result.message);
         }

      } catch (err) {
         api.message.channel.send('[CRITICAL] There was a problem running that command.');
         console.log(colors.format(colors.bg.red, colors.fg.white), '[CRITICAL] There was a problem running that command!');
         console.log(err);
      }

   }

}

module.exports = ParentCommand;