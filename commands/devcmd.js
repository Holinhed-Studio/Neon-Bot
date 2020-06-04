'use strict'

const ParentCommand = require('../lib/parentcommand.js');

class TestCommand extends ParentCommand {

   constructor() {
      super('dev');
      this.desc = "Collection of development commands.";
      this.author = "Holinhed";
      this.permissions = 999;
   }
}

module.exports = new TestCommand();