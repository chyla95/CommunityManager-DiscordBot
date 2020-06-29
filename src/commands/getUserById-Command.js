const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'getUseById',
    description: 'Prints user\'s discord tag based on his user ID.',
    parameters: '<user ID>',
    guildOnly: false,
    allowedUserRoles: null, // Require atleast one

    run(msg, args) {

        const userId = args[0];
        if (!userId || isNaN(userId)) return msg.reply(`invalid user ID. \n \`.getUseById <user ID>\` (without parenthesis)`);

        msg.guild.members.fetch(userId)
            .then((ress) => {
                msg.channel.send(ress.toString());
            })
    }
};