const db = require("quick.db");
const Discord = require("discord.js");
exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      "aç yada kapat yazmalısın! Örnek: küfür-engel aç"
    );
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send("`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!");
  if (args[0] == "aç" || args[0] == "ac") {
    const i = db.set(`kufur_${message.guild.id}`, "acik")
      message.channel.send(
        "✅ Küfür Engelleme Sistemi başarıyla açıldı! Üyeleri Yasakla yetkisine sahip olanların küfürü engellenmicektir."
      );
  }
  if (args[0] == "kapat") {
    const i = db.set(`kufur_${message.guild.id}`, "kapali")
      message.channel.send(
        "✅ Küfür Engelleme Sistemi başarıyla kapatıldı! Artık herkes küfür yazabilir."
      );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfürengel", "kufur-engelleme", "kufurengel"],
  permLevel: 0
};

exports.help = {
  name: "küfür-engelleme",
  description: "",
  usage: ""
};
