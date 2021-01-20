const Discord = require('discord.js');
exports.run = (client, message, args) => {

  let every = message.guild.roles.find(r => r.name === '@everyone')
message.channel.overwritePermissions(every, {
  'SEND_MESSAGES': false,
 
})
 

   message.channel.send('Sohbet kanalı ``Yazılabilir`` durumundan çıkıldı.\nSohbet kanalını açmak için ``z!aç`` yazmanız gerekmektedir.');
}
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['chatkapa', 'sohbetkapa','sohbetkapat'],
  permLevel: 3
};

exports.help = {
  name: 'sohbet-kapat',
  description: '',
  usage: ''
};