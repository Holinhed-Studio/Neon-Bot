'use strict'

function payload(api, args) {
   api.message.channel.send('This feature is not yet implemented.');
}

const clearChannel = {
   name: 'clearChannel',
   desc: 'Clears all messages in the channel it\'s executed in',
   author: 'Holinhed',
   payload,
}

module.exports = clearChannel;