'use strict'

function payload(api, args) {

   if (args.length > 1) return 2;

   const max_level = args[0] || 0;

   let output = "";
   
   if (max_level > 0) {
      output += "Showing list of commands with maximum permission level of " + max_level + "\n\n";
   }
   
   for (let key in api.commandMap) {
      const val = api.commandMap[key];
      output += `**${val.name}**: ${val.desc || 'No Description Provided.'}\n`;
   }

   api.message.channel.send(output);
}

module.exports = {
   name: "list",
   desc: "Displays a list of commands.",
   permissions: 100,
   author: "Holinhed",
   usage: '<?permissionLevel>',
   version: '1.0',
   payload,
}