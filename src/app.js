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


//client.on('debug', (info) => console.log(info));
//client.on('warn', (info) => console.log(info));
client.on('error', (error) => console.log(error));
client.login(token);
