const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (message.channel.type !== "text") return;
  const limit = args[0] ? args[0] : 0;
  if (!limit) {
    var embed = new Discord.RichEmbed()
      .setDescription(`Doğru kullanım: \`yavaş-mod [0/10]\``)
      .setColor("RANDOM")
      .setTimestamp();
    message.channel.send({ embed });
    return;
  }
  if (limit > 10) {
    return message.channel.sendEmbed(
      new Discord.RichEmbed()
        .setDescription("Süre limiti maksimum **10** saniye olabilir.")
        .setColor("RANDOM")
    );
  }
  if(limit == 0) {
  
    message.channel.sendEmbed(
    new Discord.RichEmbed()
      .setDescription(
        `Yazma süre limiti kaldırılmıştır.`
      )
      .setColor("RANDOM")
  );

    
  } else{
  message.channel.sendEmbed(
    new Discord.RichEmbed()
      .setDescription(
        `Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`
      )
      .setColor("RANDOM")
  )};

  var request = require("request");
  request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
      rate_limit_per_user: limit
    },
    headers: {
      Authorization: `Bot ${client.token}`
    }
  });

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mode", "slowmode", "yavas-mod", "yavasmod", "yavaşmod"],
  permLevel: 3
};

exports.help = {
  name: "yavaş-mod",
  description: "Sohbete yazma sınır (süre) ekler.",
  usage: "yavaş-mod [1/10]"
};
