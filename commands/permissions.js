'use strict'

const ParentCommand = require('../lib/parentcommand.js');

class PermissionManagementSystem extends ParentCommand {

   constructor() {
      super('pms');
      this.setMetadata({
         desc: 'Permission Management System.',
         author: 'Holinhed',
         version: 'INDEV',
         permissions: 100,
      });
   }
}

module.exports = new PermissionManagementSystem();