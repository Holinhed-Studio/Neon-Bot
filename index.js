'use strict'

const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();

const KEY = JSON.parse(fs.readFileSync('key.json')).key;

console.log("USING KEY: " + KEY);

bot.on('message', async message => {

   // direct message
   if (message.channel.name === undefined && !message.author.bot) {

   }

   // channel



});

bot.on('ready', function() {
   //bot.user.setStatus('online', 'INDEV v1'); 
   console.log('BOT ACTIVE!');
});

bot.login(KEY)
   .catch(err => console.log(err));