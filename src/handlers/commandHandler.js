const { Collection } = require("discord.js");

const { readdirSync } = require('fs');
const path = require('path');

const { prefix } = require('../config/config');



module.exports = (client) => {
    // Loading commands from files
    console.log('----------------------------')
    client.commands = new Collection();

    const commandFileNames = readdirSync(path.join(__dirname, '..', 'commands'))       
        .filter((fileName) => {
            return fileName.endsWith('.js');
        });

    commandFileNames.forEach(fileName => {
        const command = require(path.join(__dirname, '..', 'commands', fileName))

        if (command.name) {
            client.commands.set(command.name, command)
            console.log(`LOADED: ${fileName}`)
        }
        else {
            console.log(`NOT LOADED: ${fileName}`)
        }
    });
    console.log('----------------------------')

    // Executing commands
    client.on('message', msg => {

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