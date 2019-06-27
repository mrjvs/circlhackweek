const questUtils = require('../questUtils.js');
const utils = require('../utils.js');
const constants = require('../constants.js');
const db = require('../db.js')

module.exports = {
    name: "help",
    aliases: [],
    description: "Displays all commands with their usage.",
    usage: "[command]",
    showInHelp: false,
    dmOnly: true,
    signedUpOnly: false,
    needsAdmin: false,
    needsConnection: false,
    execute: async (message, args, commands) => {
        if (args.length === 0) {
            let out = "**HELP DISPLAY** \n";
            for (let i = 0; i < commands.length; i++) {
                if (commands[i].showInHelp) out += " - `" + commands[i].name + "` - " + commands[i].description + "\n";
            }
            message.channel.send(utils.sendInfo(out));
        } else if (args.length === 1) {
            let commandsFound = commands.filter((cmd => cmd.name === args[0] && cmd.showInHelp) || cmd.name === "help");
            if (commandsFound.length === 1) {
                const command = commandsFound[0];
                let aliases = command.aliases.map(alias => `\`${alias}\``).join(", ");
                if (aliases === "") aliases = "No aliases!";
                let usage = buildUsage(command);
                return message.channel.send({
                    embed: {
                        color: constants.embed_colors.info,
                        title: `$${command.name}`,
                        fields: [
                            {
                                name: "Usage",
                                value: usage
                            },
                            {
                                name: "Aliases",
                                value: aliases
                            }
                        ]
                    }
                })
            } else {
                return message.channel.send(utils.sendError(`Cannot find command \`${args[0]}\``));
            }
        }

    }
}

function buildUsage(command) {
  let usage = "";
  if (typeof command.usage === "object") {
    for (usageItem in command.usage) {
      usage += `\`${command.name} ${usageItem}\`\n`;
    }
  } else {
    usage = `\`$${command.name} ${command.usage ? command.usage : ""}\``;
  }
  return usage;
}
