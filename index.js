'use strict'

const Discord = require('discord.js');
const fs = require('fs');
const colors = require('./lib/consolecolors.js');
const SettingsManager = require('./lib/settingsManager.js');
const CommandHandler = require('./lib/commandHandler.js');
const PermFinder = require('./lib/permFinder.js');
const Store = require('./lib/store.js');

const bot = new Discord.Client();

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

const permFinder = {
   byMessage(message) {
      return PermFinder.byMessage(message, settingsManager);
   },

   byId(id, message) {
      return PermFinder.byId(id, message, settingsManager);
   }, 

   byRole(role) {
      return PermFinder.byRole(role, settingsManager);
   }
}

const commandHandler = new CommandHandler({Discord, settingsManager, bot, store, permFinder});

bot.on('message', async message => {

   // no robot >:(
   if (message.author.bot) return;

   // direct message
   if (message.channel.name === undefined) {
      message.reply('Command rejected: Message was a DM.');
      return;
   }

   // ignored servers
   if (settingsManager.get("blacklist").includes(message.guild.id)) {
      return;
   }

   // channel
   const prefix = settingsManager.get("prefix");
   if (message.content.includes(prefix)) {
      const parsed = commandHandler.parse(message.content.substring(prefix.length));
      commandHandler.handle(parsed, message);   
   }

});

bot.on('guildMemberAdd', async member => {
   //member.guild.channels.get('channelID').send("Welcome"); 
   
});

bot.on('ready', function() {
   console.log(colors.format(colors.bg.green, colors.fg.black), '=== STARTUP COMPLETE ===');
});

bot.login(KEY)
   .then(() => {
      console.log(colors.format(colors.fg.green), 'Discord login successful!');
   })
   .catch(err => {
      console.log(colors.format(colors.fg.red), '[CRITICAL] Discord login failed. Perhaps the key is invalid?');
      process.exit(0);
   });