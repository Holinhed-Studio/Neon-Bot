'use strict'

const path = require('path');
const util = require('util');
const fs = require('fs');
const getExtension = require('./lib/extensionGetter');

const readdir = util.promisify(fs.readdir);

const dirPath = path.join(__dirname, 'commands');

async function loadCommands() {

   let commandMap = {};

   let files;

   try {
      files = await readdir(dirPath);
   } catch (err) {
      console.log("[CRITICAL] FAILED TO LOAD COMMANDS!");
      console.log(err);
      return;
   }

   files.forEach(file => {

      const ext = getExtension(file);

      if (ext != 'js') return;

      let command = require(dirPath + path.sep + file);

      if (command instanceof require('./lib/parentcommand')) {
         command.load();
      }

      if (commandMap[command.name]) {
         console.log(`[ERROR] FAILED TO LOAD command ${command.name} because a command by that name already exists.`);
         return;
      }

      if (command.permissions < 0) {
         console.log(`[ERROR] FAILED TO LOAD command ${command.name} because it has a negetive permission level.`);
         return;
      }

      commandMap = {...commandMap, [command.name]: command};
   });

   console.log("COMMANDS LOADED, READY!")
   return commandMap;
}

module.exports = loadCommands(); 