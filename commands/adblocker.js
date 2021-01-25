const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      "You must write 'open' or 'close' "
    );
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send("You must have `MANAGE_GUILD` Permission !");
  if (args[0] == "open") {
    const j = db.set(`ad_${message.guild.id}`, "opened")
      message.channel.send(
        "✅ AdBlock is ACTIVE now"
      );
  }
  if (args[0] == "close") {
    const j = db.set(`ad_${message.guild.id}`, "closed")
      message.channel.send(
        "❌  Adblock is DEACTIVE now :(."
      );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ad-block"],
  permLevel: 0
};

exports.help = {
  name: "adblock",
  description: "",
  usage: ""
};
