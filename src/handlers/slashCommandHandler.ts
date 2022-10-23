import { createPath } from "../utilities/create-path";
import { Client, Events, GuildMemberRoleManager, REST, Routes } from "discord.js";
import { getDirectoryFileNames, importFileContent } from "../utilities/dynamic-imports";
import { SlashCommandBase } from "../bot-slash-commands/slash-command-base";

const commands: SlashCommandBase[] = [];

export const loadSlashCommands = async (client: Client) => {
  let logMessage = "Loaded Slash Commands:";

  const commandsDirectoryPath = createPath([__dirname, "..", "bot-slash-commands"]);
  let commandFileNames = await getDirectoryFileNames(commandsDirectoryPath);

  for await (const commandFileName of commandFileNames) {
    const commandFilePath = createPath([commandsDirectoryPath, commandFileName]);
    let commandFileExportedMembers = await importFileContent(commandFilePath);

    if (!commandFileExportedMembers.default) continue;
    const command: SlashCommandBase = new commandFileExportedMembers.default();

    commands.push(command);
    logMessage += `\n      -> ${commandFileName}`;
  }
  console.info(logMessage);

  await registerCommands(commands);
  await handleInteractions(client, commands);
};

const handleInteractions = async (client: Client, commands: SlashCommandBase[]) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // Check if command exists
    const command = commands.find((command) => command.data.name == interaction.commandName);
    if (!command) {
      await interaction.reply({ content: `Invalid Command!`, ephemeral: true });
      return;
    }

    // Check if command can be executed outside the guild (server)
    if (!interaction.guild && command.isOnlyAllowedGuild) {
      await interaction.reply({ content: `Command Can Only Be Used Inside a Guild!`, ephemeral: true });
      return;
    }

    // Check for sufficient user permissions
    if (command.allowedRoleIds) {
      if (!interaction.member || !interaction.guild) {
        await interaction.reply({ content: `Command Can Only Be Used Inside a Guild (Cannot Verify User Roles)!`, ephemeral: true });
        return;
      }

      for (const roleId of command.allowedRoleIds) {
        let roles = (interaction.member.roles as GuildMemberRoleManager).cache;
        const hasRole = roles.some((x) => x.id == roleId);
        if (!hasRole) {
          interaction.reply({ content: `You Do Not Have Sufficient Permissions (Roles) To Execute This Command!`, ephemeral: true });
          return;
        }
      }
    }

    // Execute the command
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
      return;
    }
  });
};

const registerCommands = async (commands: SlashCommandBase[]) => {
  const commandsDataJson = commands.map((command) => {
    return command.data.toJSON();
  });

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN!);
  try {
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), {
      body: commandsDataJson,
    });
    console.info("Slash Commands Updated");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
