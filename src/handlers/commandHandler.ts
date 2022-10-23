import { promises as fs } from "fs";
import path from "path";
import { Client, Message, Role } from "discord.js";
import { CommandBase } from "../commands/command-base";
import { baseConfiguration } from "../configuration/configuration";

const commands: CommandBase[] = [];

export const loadCommands = async (client: Client) => {
  // Loading commands from files
  console.info("Loading Commands...");

  // Load Dir
  let commandsDirectory: any;
  try {
    commandsDirectory = await fs.readdir(path.join(__dirname, "..", "commands"));
  } catch (error) {
    throw new Error(`Could Not Load Commands Directory!`);
  }

  // Load Files
  const commandFiles = commandsDirectory.filter((fileName: string) => {
    return fileName.endsWith(".ts");
  });

  for await (const commandFile of commandFiles) {
    let commandRaw: any;
    try {
      commandRaw = await import(path.join(__dirname, "..", "commands", commandFile));
    } catch (error) {
      throw new Error(`Could Not Load Command File: ${commandFile}!`);
    }

    if (!commandRaw.default) continue;
    const command: CommandBase = new commandRaw.default();

    // Populate commands array
    commands.push(command);
    console.log(` ⤷ ${commandFile}`);
  }

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
      command.execute(message, commandArgs);
    } catch (error) {
      console.error(error);
    }
  });
};
