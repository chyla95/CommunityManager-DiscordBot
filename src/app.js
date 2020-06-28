const { Client } = require('discord.js');

const config = require('./config/config');
const commandHandler = require('./handlers/commandHandler');
const eventHandler = require('./handlers/eventHandler');
const path = require('path');

const fsUtils = require('./utils/fsUtils');


const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Bot is running...`);
  // Temp
  fsUtils.readFromFile(path.join(__dirname, '.', 'config', "boostRequestEmbeds.json"))
    .then((data) => {
      client.boostRequestEmbeds = JSON.parse(data).msgIds;
    })
});

// Intialize command handler and command handler
commandHandler(client);
eventHandler(client);

//client.on('debug', (info) => console.log(info));
//client.on('warn', (info) => console.log(info));
client.on('error', (error) => console.log(error));
client.login(config.token);