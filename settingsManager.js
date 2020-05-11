'use strict'

const fs = require('fs');

const DEFAULTSETTINGS = {
   version: 'INDEV',
   prefix: '!',
   superusers: [],
   permissions: {
      permcap: 100,
      permlevels: {},
   }
};

class SettingsManager {

   constructor() {
      //this.settings = JSON.parse(fs.readFileSync('settings.json'));

      let settingsfile;

      try {
         settingsfile = fs.readFileSync('settings.json');
      } catch (ignored) {
         console.log('Settings.json file does not exist. Creating one using default settings.');
         
         fs.writeFileSync('settings.json', JSON.stringify(DEFAULTSETTINGS));

         console.log('File creation successful!');

         settingsfile = fs.readFileSync('settings.json');
      }

      this.settings = JSON.parse(settingsfile);
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