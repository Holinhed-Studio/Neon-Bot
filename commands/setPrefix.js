function payload(api, args) {
   if (args.length != 1) {
      return 2;
   }

   //temp fix
   if (args[0].length != 1) {
      api.message.channel.send('The new prefix must be a single character.');
      return;
   }

   api.settingsManager.set('prefix', args[0]);
   api.settingsManager.save();

   api.message.channel.send(`Prefix has been changed to: ${args[0]}`);
}

const setPrefix = {
   name: 'setPrefix',
   desc: 'Changes the command prefix.',
   usage: '<prefix>',
   author: 'Holinhed',
   permissions: 100,
   payload,
}

module.exports = setPrefix;