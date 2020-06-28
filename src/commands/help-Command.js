const { prefix } = require('../config/config');

module.exports = { 
    name: 'help',
    description: 'List of available commands.',
    parameters: '[command name]',
    guildOnly: false, // IF guildOnly == false => allowedUserRoles has to be null
    allowedUserRoles: null, // or null

    run(msg, args) {
        const { commands } = msg.client;

        let messageContent = '';

        // No arguments
        if (args.length === 0) {

            messageContent += '**Command list:** \n';
            commands.forEach(commandObject => {
                if (!commandObject.parameters) commandObject.parameters = '';
                messageContent += `\`${prefix}${commandObject.name} ${commandObject.parameters}\` - *${commandObject.description}* \n`;
            });

            return msg.author.send(messageContent, { split: true })
                .then(() => {
                    if (msg.channel.type === 'dm') return;
                    msg.reply("I've sent you a DM with all my commands!");
                })
                .catch((err) => {
                    console.log(err);
                    msg.reply('something went wrong while sending a message.');
                });
        }

        if (args.length > 0) {

            const commandObject = commands.get(args[0]);
            if (!commandObject) return msg.reply(`command \`.${args[0]}\` doesn't exist!`);

            if (commandObject.name != null) messageContent += `**Name:** ${commandObject.name} \n`;
            if (commandObject.parameters != null) messageContent += `**Parameters:** ${commandObject.parameters}\n`;
            if (commandObject.guildOnly != null) messageContent += `**Guild Only:** ${commandObject.guildOnly}\n`;
            if (commandObject.description != null) messageContent += `**Description:** ${commandObject.description}\n`;
            if (commandObject.allowedUserRoles != null) messageContent += `**Allowed Roles:** ${commandObject.allowedUserRoles}\n`;
            if (commandObject.allowedUserRoles === null) messageContent += `**Allowed Roles:** Everyone\n`;

            return msg.channel.send(messageContent);
        }

    }
};