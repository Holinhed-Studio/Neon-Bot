'use strict'

module.exports = {
   name: 'list',
   payload(api, args) {
      const permLevels = api.settingsManager.get('permissions').permLevels;

      let output = '**Super User**: *\n';

      for (const [key, val] of Object.entries(permLevels)) {
         output += `**${key}:** ${val}\n`;
      }

      api.message.channel.send(output);
   }
}