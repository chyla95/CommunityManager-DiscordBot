const { Collection } = require("discord.js");

const { readdirSync } = require('fs');
const path = require('path');

const { prefix } = require('../config/config');



module.exports = (client) => {
    // Loading commands
    console.log('----------------------------')
    client.commands = new Collection();

    const commandFiles = readdirSync(path.join(__dirname, '..', 'commands')) // FIX        
        .filter((fileName) => {
            return fileName.endsWith('.js');
        });

    commandFiles.forEach(file => {
        const command = require(path.join(__dirname, '..', 'commands', file))

        if (command.name) {
            client.commands.set(command.name, command)
            console.log(`LOADED: ${file}`)
        }
        else {
            console.log(`NOT LOADED: ${file}`)
        }
    });
    console.log('----------------------------')

    // Commands
    client.on('message', msg => {

        if(!msg.guild && msg.content === 'help') msg.reply('Help.');

        if (msg.author.bot) return;
        if (!msg.content.startsWith(prefix)) return;        

        const args = msg.content.trim().slice().toLowerCase().split(" ");
        const userCommand = args.shift().substr(prefix.length);

        // Check if command exists and if can be executed outside the guild (server)
        if (!client.commands.has(userCommand)) return;
        if (!msg.guild && client.commands.get(userCommand).guildOnly) return

        const commandObject = client.commands.get(userCommand);

        // Runs specific command
        try {
            commandObject.run(msg, args);
        } catch (error) {
            console.log(error);
        }

    });   

};