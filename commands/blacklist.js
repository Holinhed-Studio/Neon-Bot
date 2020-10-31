'use strict'

const ParentCommand = require('../lib/parentcommand.js');

class Blacklist extends ParentCommand {

   constructor() {
      super('blacklist');
      this.desc = "Prevents execution of commands in blacklist.";
      this.author = "Holinhed";
      this.permissions = 100;
   }
}

module.exports = new Blacklist();