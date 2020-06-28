const { Collection } = require("discord.js");

const { readdirSync } = require('fs');
const path = require('path');

const { prefix } = require('../config/config');


module.exports = (client) => {


    // Loading commands from files
    console.log('LOADING COMMANDS...')
    client.commands = new Collection();
    
    const commandsFileNames = readdirSync(path.join(__dirname, '..', 'commands'))
        .filter((fileName) => {
            return fileName.endsWith('.js');
        });

    commandsFileNames.forEach(fileName => {
        const command = require(path.join(__dirname, '..', 'commands', fileName))

        if (command.name && command.run && typeof command.run == 'function') {
            client.commands.set(command.name, command)
            console.log(`✅ - ${fileName}`)
        }
        else {
            console.log(`❌ - ${fileName}`)
        }
    });


    // Executing/handling commands
    client.on('message', msg => {

        // Check if prefix match and if user is not a bot
        if (!msg.content.startsWith(prefix)) return;
        if (msg.author.bot) return;

        // Prepare commandName and parameters to be used
        const userCommandArgs = msg.content.trim().slice().toLowerCase().split(" ");
        const userCommandName = userCommandArgs.shift().substr(prefix.length);

        // Check if command exists and if can be executed outside the guild (server)
        if (!client.commands.has(userCommandName)) return msg.reply(`command \`.${userCommandName}\` doesn't exist!`);
        if (!msg.guild && client.commands.get(userCommandName).guildOnly) return msg.reply(`command \`.${userCommandName}\` can be used inside a discord server only!`);
        const commandObject = client.commands.get(userCommandName);

        // Check if user has sufficient permissions (ranks) to execute command
        let userHasPermissions = false;
        if (commandObject.allowedUserRoles === null) {
            userHasPermissions = true
        } else {
            commandObject.allowedUserRoles.forEach(allowedUserRole => {
                if (msg.member.roles.cache.find((role) => role.name.toLowerCase() === allowedUserRole.toLowerCase())) userHasPermissions = true;
            });
            if (!userHasPermissions){
                const errorMessage = `you don't have permission to execure this command. \n**Allowed roles: **${commandObject.allowedUserRoles}`;
                return msg.reply(errorMessage);
            }
        }

        // Runs specific command
        try {
            commandObject.run(msg, userCommandArgs);
        } catch (error) {
            console.log(error);
        }

    });

};