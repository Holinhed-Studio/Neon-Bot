'use strict'

const ParentCommand = require('../lib/parentcommand.js');

class PermissionManagementSystem extends ParentCommand {

   constructor() {
      super('pms');
      this.setMetadata({
         desc: 'Permission Management System.',
         author: 'Holinhed',
         version: '1.0.0',
         permissions: 50,
      });
   }
}

module.exports = new PermissionManagementSystem();