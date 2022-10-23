import { CacheType, ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder } from "discord.js";

export abstract class SlashCommandBase {
  abstract readonly allowedRoleIds: string[] | undefined;
  abstract readonly isOnlyAllowedGuild: boolean;
  abstract readonly data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

  abstract execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<InteractionResponse<boolean>>;
}
