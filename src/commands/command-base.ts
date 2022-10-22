import { Message } from "discord.js";

export abstract class CommandBase {
  abstract readonly keyWord: string;
  abstract readonly description: string;
  abstract readonly isOnlyAllowedGuild: boolean;
  abstract readonly allowedRoleIds: string[] | undefined;

  abstract run(message: Message, args: string[] | undefined): Promise<void>;
}
