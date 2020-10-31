'use strict'

module.exports = {
   name: 'helloworld',
   desc: 'A hello world command',
   author: 'Holinhed',
   permissions: 100,
   payload(api, args) {
      //console.log('helloworld command was run');
     // api.message.channel.send('Hello, world!');
      api.message.channel.send("Hello, world!");
   }
}