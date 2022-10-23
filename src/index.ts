import { Client, GatewayIntentBits, Partials } from "discord.js";
import { loadCommands } from "./handlers/commandHandler";
import { loadEvents } from "./handlers/eventHandler";
import { setupConsole } from "./utilities/setup-console";

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
  ],
  partials: [Partials.Channel],
});

setupConsole();

const startApp = async () => {
  if (!process.env.DISCORD_BOT_TOKEN) {
    throw new Error("DISCORD_BOT_TOKEN is not defined!");
  }

  await loadCommands(client);
  await loadEvents(client);

  client.on("warn", (info) => console.warn(info));
  client.on("error", (error) => console.error(error));
  client.on("ready", () => {
    console.info(`The Bot is running`);
  });
  client.login(process.env.DISCORD_BOT_TOKEN);
};
startApp();
