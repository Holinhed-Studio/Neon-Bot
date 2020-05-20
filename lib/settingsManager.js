'use strict'

const fs = require('fs');
const colors = require('./consolecolors.js');

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
      let settingsfile;

      try {
         settingsfile = fs.readFileSync('settings.json');
      } catch (ignored) {
         console.log(colors.format(colors.fg.yellow), 'Settings.json file does not exist. Creating one using default settings.');
         
         fs.writeFileSync('settings.json', JSON.stringify(DEFAULTSETTINGS));

         console.log(colors.format(colors.fg.green), 'File creation successful!');

         settingsfile = fs.readFileSync('settings.json');
      }

      this.settings = JSON.parse(settingsfile);
   }

   getGlobal() {
      return this.settings;
   }

   setGlobal(newSettings) {
      this.settings = newSettings;
   }

   get(key) {
      return this.settings[key];
   }

   set(key, value) {
      this.settings[key] = value;
   }

   getAttribute(att) {
      //DEPRECATED
      console.log(colors.format(colors.fg.yellow), '[WARNING] api.settingsManager.getAttribute(a) is deperecated! Please use api.setttingsManager.get(k).');
      return this.get(att);
   }

   setAttribute(att, value) {
      //DEPRECATED
      console.log(colors.format(colors.fg.yellow), '[WARNING] api.settingsManager.setAttribute(a,v) is deperecated! Please use api.setttingsManager.set(k,v).');
      this.set(att, value);
   }

   writeToFile() {
      fs.writeFile('settings.json', JSON.stringify(this.settings), err => {
         if (err) {
            console.log(colors.format(colors.fg.red), '[CRITICAL] There was a problem saving settings to file');
         }
      });
   }

   save() {
      this.writeToFile();
   }
}

module.exports = SettingsManager;