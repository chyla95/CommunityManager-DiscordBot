import { Message } from "discord.js";
import { Roles } from "../utilities/Roles";
import { CommandBase } from "./command-base";

export default class SampleCommand extends CommandBase {
  readonly keyWord = "sample";
  readonly description = "Sample command, used as a placeholder.";
  readonly isOnlyAllowedGuild = false;
  readonly allowedRoleIds = [Roles.Administrator];

  async run(message: Message, args: string[] | undefined) {
    console.log(`Sample Command Triggered By ${message.member?.user.username}, With The Following Args: ${args}.`);
  }
}
