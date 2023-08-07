const { readdirSync } = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const path = require("path");
const colors = require("ansi-colors");

module.exports = (client, config) => {
    const eventsPath = readdirSync(`../events`);
    let loadedEvents = 0;

    for (let file of readdirSync(eventsPath)) {
        const eventFilePath = path.join(eventsPath, file);
        try {
            require(eventFilePath);
            loadedEvents++;
            console.log(`${colors.green('[INFO]')} Client Event loaded: ${colors.yellow(file)}`);
        } catch (error) {
            console.error(`${colors.red('Error loading client event:')} ${colors.yellow(file)}`);
            console.error(error);
        }
    }

    console.log(`${colors.cyan('Total')} ${loadedEvents} ${colors.cyan('client events loaded.')}`);
}