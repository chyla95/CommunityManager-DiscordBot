import { Client, GatewayIntentBits, Partials } from "discord.js";
import { loadCommands } from "./handlers/commandHandler";
import { configureConsole } from "./utilities/configure-console";

const eventHandler = require("./handlers/eventHandler");

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

const startApp = async () => {
  configureConsole();
  await loadCommands(client);
  await eventHandler(client);

  client.on("warn", (info) => console.warn(info));
  client.on("error", (error) => console.error(error));
  client.on("ready", () => {
    console.info(`The Bot is running`);
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
};
startApp();
