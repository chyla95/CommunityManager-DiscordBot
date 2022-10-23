import { Client } from "discord.js";
import { EventBase } from "../bot-events/event-base";
import { createPath } from "../utilities/create-path";
import { getDirectoryFileNames, importFileContent } from "../utilities/dynamic-imports";

export const loadEvents = async (client: Client) => {
  let logMessage = "Loaded Commands:";

  const eventsDirectoryPath = createPath([__dirname, "..", "bot-events"]);
  let eventFileNames = await getDirectoryFileNames(eventsDirectoryPath);

  for await (const eventFileName of eventFileNames) {
    const eventFilePath = createPath([eventsDirectoryPath, eventFileName]);
    let eventFileExportedMembers = await importFileContent(eventFilePath);

    if (!eventFileExportedMembers.default) continue;
    const event: EventBase = new eventFileExportedMembers.default();

    client.on(event.triggerEvent.toString(), event.execute);
    logMessage += `\n      -> ${eventFileName}`;
  }
  console.info(logMessage);
};
