const Discord = require('discord.js');
exports.run = (client, message, args) => {

  let every = message.guild.roles.find(r => r.name === '@everyone')
message.channel.overwritePermissions(every, {
  'SEND_MESSAGES': null,
 
})
 

   message.channel.send('Sohbet kanalı ``Yazılabilir`` durumuna getirildi.\nSohbet kanalını kapatmak için ``z!kapat`` yazmanız gerekmektedir.');
}
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['chatac', 'sohbetac','sohbetaç'],
  permLevel: 3
};

exports.help = {
  name: 'sohbet-aç',
  description: '',
  usage: 'aç'
};