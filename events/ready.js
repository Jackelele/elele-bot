
const Discord = require('discord.js');
const { ActivityType } = require('discord.js');
const fs = require('fs');
const colors = require('ansi-colors');
const client = require('../index');
const packageFile = require('../package.json');
const config = require("../config.json");

client.on("ready", async () => {
    client.user.setActivity({
        name: `Elele.Team`,
        type: ActivityType.Watching,
      });

    client.guilds.cache.forEach(guild => {
        if (!config.slash.guild.includes(guild.id)) {
            guild.leave();
            console.log('\x1b[31m%s\x1b[0m', `[INFO] Someone tried to invite the bot to another server! I automatically left it (${guild.name})`)
        }
    })
    console.log("―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――");
    console.log("                                                                          ");
    console.log(`• ${colors.green(colors.bold(`${client.user.tag} is now Online!`))}`);
    console.log("                                                                          ");
    console.log("――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――");
    let logMsg = `\n\n[${new Date().toLocaleString()}] [READY] Bot is now ready!`;
})