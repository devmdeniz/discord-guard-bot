const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const settings = require('../settings.json');
var version = settings.version
var prefix = settings.prefix;

module.exports = client => {
client.user.setActivity(""+prefix+"help", {
  type: "STREAMING",
  url: "https://www.twitch.tv/eastromtv"
});
  
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Commands Active!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Logged In ${client.user.username} !`);
  client.user.setStatus("LISTENING");
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Game Activity setted!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Now have ` + client.channels.size + ` Channels, ` + client.guilds.size + ` Guilds and ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` Users!`);

};
