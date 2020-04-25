'use strict'

const path = require('path');
const util = require('util');
const fs = require('fs');

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
   }

   files.forEach(file => {

      let command = require(dirPath + path.sep + file);

      if (commandMap[command.name]) {
         console.log(`[ERROR] FAILED TO LOAD command ${command.name} because a command by that name already exists.`);
         return;
      }

      commandMap = {...commandMap, [command.name]: command};
   });

   return commandMap;
}

module.exports = loadCommands(); 