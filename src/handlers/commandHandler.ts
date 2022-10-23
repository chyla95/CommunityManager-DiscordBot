import { createPath } from "../utilities/create-path";
import { Client, Message, Role } from "discord.js";
import { CommandBase } from "../bot-commands/command-base";
import { configuration } from "../configuration/configuration";
import { getDirectoryFileNames, importFileContent } from "../utilities/dynamic-imports";

const commands: CommandBase[] = [];

export const loadCommands = async (client: Client) => {
  let logMessage = "Loaded Commands:";

  const commandsDirectoryPath = createPath([__dirname, "..", "bot-commands"]);
  let commandFileNames = await getDirectoryFileNames(commandsDirectoryPath);

  for await (const commandFileName of commandFileNames) {
    const commandFilePath = createPath([commandsDirectoryPath, commandFileName]);
    let commandFileExportedMembers = await importFileContent(commandFilePath);

    if (!commandFileExportedMembers.default) continue;
    const command: CommandBase = new commandFileExportedMembers.default();

    commands.push(command);
    logMessage += `\n      -> ${commandFileName}`;
  }
  console.info(logMessage);

  // Handling Commands
  client.on("messageCreate", async (message: Message) => {
    // Check if prefix match and if user is not a bot
    if (!message.content.startsWith(configuration.prefix)) return;
    if (message.author.bot) return;

    // Prepare commandName and parameters to be used
    const commandArgs = message.content.trim().slice().toLowerCase().split(" ");
    const commandKeyWord = commandArgs.shift()!.substring(configuration.prefix.length);

    // Check if command exists
    const command = commands.find((command) => command.triggerKeyWord == commandKeyWord);
    if (!command) {
      await message.reply(`Invalid Command!`);
      return;
    }

    // Check if command can be executed outside the guild (server)
    if (!message.guild && command.isOnlyAllowedGuild) {
      await message.reply(`Command Can Only Be Used Inside a Guild!`);
      return;
    }

    // Check for sufficient user permissions
    if (command.allowedRoleIds) {
      if (!message.member || !message.guild) {
        message.reply(`Command Can Only Be Used Inside a Guild (Cannot Verify User Roles)!`);
        return;
      }
      command.allowedRoleIds.forEach((roleId) => {
        if (!message.member!.roles.cache.find((role: Role) => role.id == roleId)) {
          message.reply(`You Do Not Have Sufficient Permissions (Roles) To Execute This Command!`);
          return;
        }
      });
    }

    // Run the command
    try {
      command.execute(message, commandArgs);
    } catch (error) {
      console.error(error);
      message.reply(`There Was an Error While Executing The Command!`);
    }
  });
};
