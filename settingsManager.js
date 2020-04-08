'use strict'

const fs = require('fs');

class SettingsManager {

   constructor() {
      this.settings = JSON.parse(fs.readFileSync('settings.json'));
   }

   get() {
      return this.settings;
   }

   set(newSettings) {
      this.settings = newSettings;
   }

   getAttribute(att) {
      return this.settings[att];
   }

   setAttribute(att, value) {
      this.settings[att] = value;
   }

   writeToFile() {
      fs.writeFile('settings.json', JSON.stringify(this.settings), err => {
         if (err) console.log(err);
      });
   }

   save() {
      this.writeToFile();
   }
}

module.exports = SettingsManager;