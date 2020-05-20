'use strict'

const colors = require('./consolecolors.js');

class Store {

   constructor() {
      this.data = {};
   }

   pushKey(key, value) {
      //DEPRECATED
      console.log(colors.format(colors.fg.yellow), '[WARNING] api.store.pushKey(k,v) is deprecated! Please use api.store.set(k,v) instead.');
      this.data = {...this.data, [key]: value};
   }

   set(key, value) {
      if (!this.data[key]) {
         this.data = {...this.data, [key]: value};
         return;
      } 
      this.data[key] = value;
   }

   get(key) {
      return this.data[key];
   }

   clearKey(key) {
      delete this.data[key];
   }

   clearStore() {
      this.data = {};
   }

   exists(key) {
      return this.data[key] ? true : false;
   }

   loadState(key) {
      console.log(colors.format(colors.fg.blue), 'You just tried to load a state. This feature is not implemented yet.');
   }

   loadStates() {
      console.log(colors.format(colors.fg.blue), 'You just tried to load a state. This feature is not implemented yet.');
   }

   saveState(key) {
      console.log(colors.format(colors.fg.blue), 'You just tried to save a state. This feature is not implemented yet.');
   }

   saveStates() {
      console.log(colors.format(colors.fg.blue), 'You just tried to save states. This feature is not implemented yet.');
   }

}

module.exports = Store;