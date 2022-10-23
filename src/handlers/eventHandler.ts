import { promises as fs } from "fs";
import path from "path";
import { Client } from "discord.js";
import { EventBase } from "../events/event-base";

export const loadEvents = async (client: Client) => {
  // Loading events from files
  console.info("Loading Events...");

  // Load Dir
  let eventsDirectory: any;
  try {
    eventsDirectory = await fs.readdir(path.join(__dirname, "..", "events"));
  } catch (error) {
    throw new Error(`Could Not Load Commands Directory!`);
  }

  // Load Files
  const eventFiles = eventsDirectory.filter((fileName: string) => {
    return fileName.endsWith(".ts");
  });

  for await (const eventFile of eventFiles) {
    let eventClass: any;
    try {
      eventClass = await import(path.join(__dirname, "..", "events", eventFile));
    } catch (error) {
      throw new Error(`Could Not Load Event File: ${eventFile}!` + error);
    }

    if (!eventClass.default) continue;
    const event: EventBase = new eventClass.default();

    // Populate commands array
    client.on(event.triggerEvent.toString(), event.execute);
    console.log(` ⤷ ${eventFile}`);
  }
};
