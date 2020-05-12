'use strict'

const ParentCommand = require('../lib/parentcommand.js');

class TestCommand extends ParentCommand {

   constructor() {
      super('ptest');
      this.desc = "testing the parent command class.";
      this.author = "Holinhed";
      this.permissions = 999;
   }

}

module.exports = new TestCommand();