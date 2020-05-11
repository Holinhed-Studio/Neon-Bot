'use strict'

const Discord = require('discord.js');
const fs = require('fs');
const SettingsManager = require('./settingsManager.js');
const CommandHandler = require('./commandHandler.js');
const Store = require('./store.js');

const bot = new Discord.Client();

//let KEY = JSON.parse(fs.readFileSync('key.json')).key
let KEY;

try {
   const keyfile = fs.readFileSync('key.json');
   KEY = JSON.parse(keyfile).key;
} catch (err) {
   console.log('NO KEY FILE FOUND! Creating one...');

   const genkey = {key: 'ENTER YOUR KEY HERE'};

   fs.writeFileSync('key.json', JSON.stringify(genkey));
   console.log('Key file creation successful!');
   console.log('ENTER YOUR KEY INTO THE GENERATED FILE \'key.json\'');
   process.exit(0);
}

console.log("USING KEY: " + KEY);

const settingsManager = new SettingsManager();
const store = new Store();
const commandHandler = new CommandHandler({Discord, settingsManager, bot, store});

bot.on('message', async message => {

   if (message.author.bot) {

      return;
   }

   // direct message
   if (message.channel.name === undefined) {
      
      return;
   }

   // channel
   if (message.content[0] === settingsManager.getAttribute("prefix")) {
      const parsed = commandHandler.parse(message.content.substring(1));
      commandHandler.handle(parsed, message);   
   }

});

bot.on('ready', function() {
   console.log('=== STARTUP COMPLETE ===');
});

bot.login(KEY)
   .then(() => {
      console.log('Discord login successful!');
   })
   .catch(err => console.log(err));