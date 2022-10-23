import { Message, Events } from "discord.js";
import { EventBase } from "./event-base";

export default class SampleEvent extends EventBase {
  readonly triggerEvent = Events.MessageCreate;
  readonly description = "Sample event, used as a placeholder.";

  async execute(arg: Message) {
    if (arg.content == "sample") console.log(`Sample Event Triggered. Args: ${arg}.`);
  }
}
