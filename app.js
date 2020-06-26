const { Client } = require('discord.js');

const { token } = require('./config/config');
const commandHandler = require('./handlers/commandHandler');

const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Bot is running...`);
});

// Intialize command handler
commandHandler(client);

//client.login(process.env.token);
client.login(token);
