const fs = require("fs");
const { REST } = require("discord.js");
const path = require("path");
const { Collection } = require("discord.js");
const colors = require("ansi-colors");

const config = require("../config.json");

module.exports = async (client) => {
    const {
        Slash: {
            global, guild
        }
    } = client.config;

    let commands = [];
    let commandCount = 0;

    const commandsPath = path.resolve(__dirname, "../commands");
    client.commands = new Collection();

    fs.readdirSync(commandsPath).forEach((dir) => {
        const dirPath = `${commandsPath}/${dir}`;
        const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".js"));

        for (let file of files) {
            const filePath = `${commandsPath}/${dir}/${file}`;
            let pulled = require(filePath);

            if (pulled.command_data && typeof pulled.command_data === 'object') {
                console.log(`${colors.green('[INFO]')} Application command loaded: ${colors.yellow(file)}`);
                commands.push(pulled.command_data);

                client.commands.set(pulled.command_data.name, pulled);
                commandCount++;
            } else {
                console.log(colors.yellow('[WARN] Received empty property \'command_data\' or invalid type (Object) in ' + file));
            }
        }
    });
    const rest = new REST({ version: '10' }).setToken(config.token);

    try {
        console.log(colors.cyan('Started refreshing application (/) commands.'));

        await rest.put(`/applications/880807106268241950/guilds/${config.slash.guild}/commands`, { body: commands });

        console.log(`${colors.cyan('Total')} ${commandCount} ${colors.cyan('application (/) commands loaded')}`);
    } catch (error) {
        console.error(colors.red('Failed to reload application (/) commands:'), error);
    }
}