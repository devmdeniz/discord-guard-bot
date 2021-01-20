// enable-pnpm-------------------------------------------------------------
const ayarlar = require("./settings.json");
const chalk = require("chalk");
const Discord = require("discord.js");
const discord = require("discord.js");
const db = require("quick.db");
const client = new discord.Client({
  disableEveryone: true,
  disabledEvents: ["TYPING_START"]
});
const fs = require("fs");
const { stripIndents, oneLine } = require("common-tags");
const moment = require("moment");
const snekfetch = require("snekfetch");
require("./util/eventLoader")(client);
const { join } = require("path");
const { readdirSync } = require("fs");
const ms = require("ms");
const { PREFIX } = require("./settings.json");

var prefix = ayarlar.prefix;
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

//============================================================================================
//Altyapı
//============================================================================================

//============================================================================================
//Altyapı
//============================================================================================

//============================================================================================
//Altyapı
//============================================================================================

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} commands to be installed.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`command: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  if (message.author.id === ayarlar.sahip2) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

//============================================================================================
//Altyapı
//============================================================================================

//============================================================================================
//Altyapı
//============================================================================================

//============================================================================================
//Altyapı
//===========================================================================================
client.on("message", msg => {
  const i = db.get(`kufur_${msg.guild.id}`)
    if (i == "acik") {
      const kufur = [
        "oç",
        "amk",
        "ananı sikiyim",
        "ananısikm",
        "piç",
        "amk",
        "amisk",
        "sikim",
        "sikiyim",
        "orospu çocuğu",
        "piç kurusu",
        "kahpe",
        "orospu",
        "mal",
        "sik",
        "yarrak",
        "orospunun evladı",
        "amcık",
        "amck",
        "yarram",
        "sikimi ye",
        "ananısKm",
        "amnskm",
        "amknskm",
        "siktir",
        "amsnkm"
      ];
      if (kufur.some(word => msg.content.includes(word))) {
        try {
          if (!msg.member.hasPermission("BAN_MEMBERS")) {
            msg.delete();
            return msg
              .reply("Küfür etmemelisin! ⚠")
              .then(msg => msg.delete(3000));
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else if (i == "kapali") {
    }
    if (!i) return;
  });


client.on("message", msg => {
  const j = db.get(`reklam_${msg.guild.id}`)
    if (j == "acik") {
      const reklam = [
        "https://discord.gg",
        "discord.gg",
        "discordgg",
        "discord.com",
        "discord gg",
        "discord com",
        "d i s c o r d g g",
        "d i s c o r d",
        "di s co r d",
        "d iscord"
              
      
      ];
      if (reklam.some(ad => msg.content.includes(ad))) {
        try {
          if (msg.member.hasPermission("BAN_MEMBERS")) {
            msg.delete();
            return msg
              .reply("Reklam YAPMA! ⚠")
              .then(msg => msg.delete(3000));
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else if (j == "kapali") {
    }
    if (!j) return;
  });


client.login(process.env.TOKEN);
