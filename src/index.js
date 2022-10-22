const { Client, GatewayIntentBits  } = require('discord.js');

const config = require('./config/config');
const commandHandler = require('./handlers/commandHandler');
const eventHandler = require('./handlers/eventHandler');



const client = new Client({
  intents: [
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageReactions,

      GatewayIntentBits.MessageContent,

      GatewayIntentBits.Guilds
  ]
})


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Bot is running...`);
});

// Intialize command handler and command handler
commandHandler(client);
eventHandler(client);

//client.on('debug', (info) => console.log(info));
//client.on('warn', (info) => console.log(info));
client.on('error', (error) => console.log(error));
client.login(process.env.DISCORD_BOT_TOKEN);