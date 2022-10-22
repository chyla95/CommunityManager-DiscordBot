import { promises as fs } from "fs";
import path from "path";
import { Client, Message, Role } from "discord.js";
import { CommandBase } from "../commands/command-base";
import { baseConfiguration } from "../configuration/base-configuration";

const commands: CommandBase[] = [];

export const loadCommands = async (client: Client) => {
  // Loading commands from files
  console.info("Loading Commands...");

  const commandsDirectory = await fs.readdir(path.join(__dirname, "..", "commands"));
  const commandsFiles = commandsDirectory.filter((fileName: string) => {
    return fileName.endsWith(".ts");
  });

  await commandsFiles.forEach(async (fileName: string) => {
    try {
      const commandRaw = await import(path.join(__dirname, "..", "commands", fileName));
      if (!commandRaw.default) return;
      const command: CommandBase = new commandRaw.default();

      commands.push(command);
      console.log(` ⤷ ${fileName}`);
    } catch (error) {
      throw new Error(`Could Not Load: ${fileName}!`);
    }
  });

  // Executing/handling commands
  client.on("messageCreate", async (message: Message) => {
    // Check if prefix match and if user is not a bot
    if (!message.content.startsWith(baseConfiguration.prefix)) return;
    if (message.author.bot) return;

    // Prepare commandName and parameters to be used
    const commandArgs = message.content.trim().slice().toLowerCase().split(" ");
    const commandKeyWord = commandArgs.shift()!.substring(baseConfiguration.prefix.length);

    // Check if command exists
    const command = commands.find((command) => command.keyWord == commandKeyWord);
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

    // Run specific command
    try {
      command.run(message, commandArgs);
    } catch (error) {
      console.error(error);
    }
  });
};
