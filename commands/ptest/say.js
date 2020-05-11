'use strict'

const ParentCommand = require('../../lib/parentcommand.js');

class Say extends ParentCommand {

   constructor() {
      super('say');
      this.desc = 'Posts message in bold or normalhj';
      this.author = 'Holinhed';
      this.usuage = '<bold/normal> <message>';
      this.permissions = 100;
   }

}

module.exports = new Say();