'use strict'

const ParentCommand = require('../lib/parentcommand.js');

class TestCommand extends ParentCommand {

   constructor() {
      super('ptest');
      this.desc = "testing the parent command class.";
      this.author = "Holinhed";
      this.usage = "<test>";
      this.permissions = 999;
   }

}

const x = new TestCommand();

module.exports = x;