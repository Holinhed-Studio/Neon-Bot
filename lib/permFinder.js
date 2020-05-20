'use strict'

function byRole(role, settings) {
   const permLevels = settings.get('permissions').permLevels;

   return permLevels[role.toLowerCase()] || 0;
}

function byId(id, message, settings) {

   if (id.startsWith('<@!')) id = id.substring(3, id.length - 1);

   if (settings.get('superusers').includes(id)) return -1;

   const permLevels = settings.get('permissions').permLevels;

   const usr = message.member.guild.members.cache.find(u => u.id == id);

   if (!usr) return 0;

   let permLevel = 0;

   for (let val in permLevels) {
      if (usr.roles.cache.some(r => r.name.toLowerCase() === val)) {
         const foundLevel = permLevels[val];
         if (foundLevel > permLevel) {
            permLevel = foundLevel;
         }
      }
   }

   return permLevel;
}

function byMessage(message, settings) {
   
   const userid = message.author.id;

   if (settings.get('superusers').includes(userid)) {
      return -1;
   }

   const permLevels = settings.get('permissions').permLevels;
   let permLevel = 0;

   for (let val in permLevels) {
         if (message.member.roles.cache.some(r => r.name.toLowerCase() === val)) {
            const foundLevel = permLevels[val];
            if (foundLevel > permLevel) {
               permLevel = foundLevel;
            }
      }
   }

   return permLevel;
}

module.exports = {
   byRole,
   byId,
   byMessage,
}
