function payload(api, args) {
   if (args.length != 1) {
      return 2;
   }

   api.settingsManager.setAttribute('prefix', args[0]);
   api.settingsManager.save();

   api.message.channel.send(`Prefix has been changed to: ${args[0]}`);
}

const setPrefix = {
   name: 'setPrefix',
   desc: 'Changes the command prefix.',
   usuage: '<prefix>',
   author: 'Holinhed',
   permissions: 100,
   payload,
}

module.exports = setPrefix;