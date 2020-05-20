'use strict'

function byRole(role, settings) {
   const permLevels = settings.get('permissions').permLevels;

   return permLevels[role.toLowerCase()] || 0;
}

function byId(id, settings) {

}

function byMessage(message, settings) {
   
   const userid = message.author.id;

   if (settings.get('superusers').includes(userid)) {
      return -1;
   }

   return 0;
}

module.exports = {
   byRole,
   byId,
   byMessage,
}
