const { readdirSync } = require("fs");
const client = require("../../index.js")
const colors = require("ansi-colors")
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

module.exports = async (client) => {
    const GuildID = "889162404913635358";
    const slashCommands = [];
    readdirSync("./src/commands/slash").forEach(async (file) => {
        const command = await require(`../commands/slash/${file}`);
        if (command) {
            slashCommands.push(command.data.toJSON());
            client.slashcommands.set(command.data.name, command);
            console.log(`${colors.green('[INFO]')} Application command loaded: ${colors.yellow(file)}`);
            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach((alias) => {
                    client.commandaliases.set(alias, command.name);
                });
            } else {
                console.log(colors.yellow('[WARN] Received empty property \'command_data\' or invalid type (Object) in ' + file));
            }
        }
    })
    client.on("ready", async () => {
        try {
            await REST.put(Routes.applicationCommand(client.user.id), {
                body: slashCommands,
            });
        } catch (error) {
            console.error(error);
        }
    })
}