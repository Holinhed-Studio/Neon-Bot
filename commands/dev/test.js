module.exports = {
   name: 'test',
   desc: 'a test command',
   payload(api, args) {
      return {
         message: 'this is a test message!',
      };
      api.message.channel.send('test');
   }
}