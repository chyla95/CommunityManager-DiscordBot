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
        if (msg.author.bot) return;
        if (!msg.guild) return;
        if (!msg.content.startsWith(prefix)) return;

        const args = msg.content.trim().slice().toLowerCase().split(" ");
        const userCommand = args.shift()

        // Check if command exists
        if (!client.commands.has(userCommand)) return;

        // Runs specific command
        try {
            client.commands.get(userCommand).run(msg, args);
        } catch (error) {
            console.log(error);
        }

    });

};