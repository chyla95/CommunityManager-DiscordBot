import { Message, Events } from "discord.js";

export abstract class EventBase {
  abstract readonly triggerEvent: Events;
  abstract readonly description: string;

  abstract execute(arg: any): Promise<void>;
}
