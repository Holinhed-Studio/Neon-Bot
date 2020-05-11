'use strict'

const Discord = require('discord.js');
const fs = require('fs');
const SettingsManager = require('./settingsManager.js');
const CommandHandler = require('./commandHandler.js');
const Store = require('./store.js');

const bot = new Discord.Client();

const KEY = JSON.parse(fs.readFileSync('key.json')).key;

console.log("USING KEY: " + KEY);

const settingsManager = new SettingsManager();
const store = new Store();
const commandHandler = new CommandHandler({Discord, settingsManager, bot, store});

bot.on('message', async message => {

   // direct message
   if (message.channel.name === undefined && !message.author.bot) {
      
   }

   // channel
   if (message.content[0] === settingsManager.getAttribute("prefix") && !message.author.bot) {
      const parsed = commandHandler.parse(message.content.substring(1));
      //message.reply("COMMAND STRING: " + message.content.substring(1));
      //message.reply("PARSED: " + JSON.stringify(parsed));
      commandHandler.handle(parsed, message);   
   }

});

bot.on('ready', function() {
   //bot.user.setStatus('online', 'INDEV v1'); 
   console.log('Discord login successful');
});

bot.login(KEY)
   .catch(err => console.log(err));