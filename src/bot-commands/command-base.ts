import { Message } from "discord.js";

export abstract class CommandBase {
  abstract readonly triggerKeyWord: string;
  abstract readonly description: string;
  abstract readonly isOnlyAllowedGuild: boolean;
  abstract readonly allowedRoleIds: string[] | undefined;

  abstract execute(message: Message, args: string[] | undefined): Promise<void>;
}
