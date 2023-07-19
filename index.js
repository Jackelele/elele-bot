const config = require('./config');
const fs = require("fs");
const colors = require("ansi-colors");
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.User,
        Partials.ThreadMember,
    ]
});
const moment = require("moment");

client.commands = new Collection();
client.slashCommands = new Collection();

module.exports = client;

fs.readdirSync("./handlers").forEach((handler) => {
    try {
        const handlerPath = `./handlers/${handler}`;
        console.log(`${colors.green("[INFO]")} Handler Loaded ${colors.yellow(handlerPath)}`);
        require(handlerPath)(client);
    } catch (error) {
        console.error(`${colors.red('[ERROR]')} Error loading handler: ${colors.yellow(handler)}`);
        console.error(error);
    }
});




client.login(config.token);