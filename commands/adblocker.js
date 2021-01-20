const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      "aç ya da kapat (ac da dahildir) yazmalısın!"
    );
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send("`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!");
  if (args[0] == "aç" || args[0] == "ac") {
    const j = db.set(`reklam_${message.guild.id}`, "acik")
      message.channel.send(
        "✅ Reklam Engelleme Sistemi başarıyla açıldı! Üyeleri Yasakla yetkisine sahip olanların reklamları engellenmicektir."
      );
  }
  if (args[0] == "kapat") {
    const j = db.set(`reklam_${message.guild.id}`, "kapali")
      message.channel.send(
        "✅  Reklam Engelleme Sistemi kapatıldı! Artık herkes reklam paylaşabilir yazabilir."
      );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reklamengel", "reklam-engelle"],
  permLevel: 0
};

exports.help = {
  name: "reklam-engelleme",
  description: "",
  usage: ""
};
