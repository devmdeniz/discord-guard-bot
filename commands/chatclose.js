const Discord = require("discord.js");
const settings = require("../settings.json")
exports.run = (client, message, args) => {

  let every = message.guild.roles.find(r => r.name === '@everyone')
message.channel.overwritePermissions(every, {
  'SEND_MESSAGES': false,
 
})
 

   message.channel.send('Chat is closed. If you want the chat to open you need to use the '+ settings.token + 'openchat command');
}
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['chatclose', 'close-chat','chat-close'],
  permLevel: 3
};

exports.help = {
  name: 'closechat',
  description: '',
  usage: ''
};