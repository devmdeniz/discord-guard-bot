const db = require("quick.db");
const Discord = require("discord.js");
const settings = require("../settings.json")
exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      "you can just open or close for ex: " + settings.prefix + "open/close"
    );
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send("You must have `MANAGE GUILD` permission!");
  if (args[0] == "open") {
    const i = db.set(`swear_${message.guild.id}`, "opened")
      message.channel.send(
        "✅ Swearing Block System is ACTIVE now"
      );
  }
  if (args[0] == "close") {
    const i = db.set(`swear_${message.guild.id}`, "closed")
      message.channel.send(
        "❌ Swearing Block System is DEACTIVE now"
      );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["swearingblocker"],
  permLevel: 0
};

exports.help = {
  name: "swearblock",
  description: "",
  usage: ""
};
