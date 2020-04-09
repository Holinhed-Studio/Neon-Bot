function payload(api, args) {
   api.message.channel.send('This is a test command.');

   //setTimeout(function() {api.message.channel.send('message sent 5 seconds later')}, 5000);
}

const identifier = {
   name: 'test',
   desc: 'a test command.',
   usage: '',
   author: 'Holinhed',
   payload,
};

module.exports = identifier;