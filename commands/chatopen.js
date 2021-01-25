const Discord = require('discord.js');
exports.run = (client, message, args) => {

  let every = message.guild.roles.find(r => r.name === '@everyone')
message.channel.overwritePermissions(every, {
  'SEND_MESSAGES': null,
 
})
 

   message.channel.send('Chat is opened. If you want the chat to close you need to use the '+ settings.token + 'closechat command');
}
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['chatopen', 'chat-open','open-chat'],
  permLevel: 3
};

exports.help = {
  name: 'openchat',
  description: '',
  usage: ''
};