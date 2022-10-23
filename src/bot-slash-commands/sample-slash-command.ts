import { CacheType, ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder } from "discord.js";
import { SlashCommandBase } from "./slash-command-base";
import { Roles } from "../utilities/roles";

export default class SampleSlashCommand extends SlashCommandBase {
  readonly allowedRoleIds = [Roles.Administrator];
  readonly data = new SlashCommandBuilder()
    .setName("sample")
    .setDescription("Sample command, used as a placeholder.")
    .addStringOption((option) => option.setName("name").setDescription("Your name").setRequired(false));

  async execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<InteractionResponse<boolean>> {
    const name = interaction.options.getString("name");
    return interaction.reply({ content: `Hello ${name}!`, ephemeral: true });
  }
}
