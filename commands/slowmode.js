const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (message.channel.type !== "text") return;
  const limit = args[0] ? args[0] : 0;
  if (!limit) {
    var embed = new Discord.RichEmbed()
      .setDescription("please try" + settings.prefix + "slowmode [0-10]")
      .setColor("RANDOM")
      .setTimestamp();
    message.channel.send({ embed });
    return;
  }
  if (limit > 60) {
    return message.channel.sendEmbed(
      new Discord.RichEmbed()
        .setDescription("You can enter maximum 60")
        .setColor("RANDOM")
    );
  }
  if(limit == 0) {
  
    message.channel.sendEmbed(
    new Discord.RichEmbed()
      .setDescription(
        `Slowmode Removed`
      )
      .setColor("RANDOM")
  );

    
  } else{
  message.channel.sendEmbed(
    new Discord.RichEmbed()
      .setDescription(
        `Slowmode set to  **${limit}** seconds.`
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
  aliases: ["slow-mode"],
  permLevel: 3
};

exports.help = {
  name: "slowmode",
  description: "",
  usage: ""
};
