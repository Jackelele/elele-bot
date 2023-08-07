const client = require("../../index.js");
const { readdirSync } = require("fs");
const colors = require("ansi-colors")


module.exports = async (client) => {
    const commands = [];
    readdirSync("./commands/normal").forEach(async (file) => {
        const command = await require(`./commands/normal/${file}`);
        if (command) {
            client.commands.set(command.name, command);
            commands.push(command.name, command);
            console.log(`${colors.green('[INFO]')} Application command loaded: ${colors.yellow(file)}`);
            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach((alias) => {
                    client.commandaliases.set(alias, command.name);
                });
            } else {
                console.log(colors.yellow('[WARN] Received empty property \'command_data\' or invalid type (Object) in ' + file));
            }
        }
    });
}