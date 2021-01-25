// enable-pnpm-------------------------------------------------------------
const settings = require("./settings.json");
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
const secret = require("./secret.json");

var prefix = settings.prefix;
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

//============================================================================================
//IMPORTANT
//============================================================================================

//============================================================================================
//IMPORTANT
//============================================================================================

//============================================================================================
//IMPORTANT
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
  if (message.author.id === settings.owner) permlvl = 4;
  if (message.author.id === settings.owner2) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

//============================================================================================
//IMPORTANT
//============================================================================================

//============================================================================================
//IMPORTANT
//============================================================================================

//============================================================================================
//IMPORTANT
//===========================================================================================
client.on("message", msg => {
  const i = db.get(`swear_${msg.guild.id}`)
    if (i == "opened") {
      const swearing = [
        "badword1",
        "badword2"
      ];
      if (swearing.some(word => msg.content.includes(word))) {
        try {
          if (!msg.member.hasPermission("BAN_MEMBERS")) {
            msg.delete();
            return msg
              .reply("STOP SWEARING! ⚠")
              .then(msg => msg.delete(3000));
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else if (i == "closed") {
    }
    if (!i) return;
  });


client.on("message", msg => {
  const j = db.get(`ad_${msg.guild.id}`)
    if (j == "opened") {
      const adblocker = [
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
      if (adblocker.some(ad => msg.content.includes(ad))) {
        try {
          if (msg.member.hasPermission("BAN_MEMBERS")) {
            msg.delete();
            return msg
              .reply("Do not advertise! ⚠")
              .then(msg => msg.delete(3000));
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else if (j == "closed") {
    }
    if (!j) return;
  });


client.login(secret.TOKEN);
