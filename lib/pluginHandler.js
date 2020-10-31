'use strict'

class PluginHandler {

   constructor(dir) {
      this.plugins = { };
   }

   handle(name, args) {

   }

   getType(key) {
      return this.plugins[key];
   }

   find(name) {
      
   }

   get() {
      return this.plugins;
   }

}