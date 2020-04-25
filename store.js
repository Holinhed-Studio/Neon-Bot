'use strict'

class Store {

   constructor() {
      this.data = {};
   }

   pushKey(key, value) {
      this.data = {...this.data, [key]: value};
   }

   set(key, value) {
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
      return this.get(key) ? true : false;
   }

   saveState(state) {
      console.log('You just tried to save a state. This feature is not implemented yet.');
   }

   saveStates() {
      console.log('You just tried to save states. This featuer is not implemented yet.');
   }

}

module.exports = Store;