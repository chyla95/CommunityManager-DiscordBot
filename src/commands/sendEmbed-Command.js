const { MessageEmbed } = require('discord.js');

const config = require('../config/config');


module.exports = {
    name: 'sendEmbed',
    description: 'Send an embed message to the selected channel.',
    parameters: '[title]* [message]* [HEX color]',
    guildOnly: true,
    allowedUserRoles: null, // Require atleast one

    async run(msg, args) {

        msg.delete();

        let embedTitle;
        let embedColor = '#0096fa';
        const author = msg.author;

        if (!args[0]) return msg.reply(`please enter embed title.`);
        embedTitle = args[0];
        let embedMsg = msg.content.substr(config.prefix.length + this.name.length + 1 + embedTitle.length + 1);
        // if (!args[1]) return msg.reply(`please enter embed message.`);
        // embedMsg = args[1];
        if (author.partial) await author.fetch();

        const embed = new MessageEmbed()
            .setTitle(embedTitle)
            .setColor(embedColor)
            .setDescription(embedMsg)
            .setFooter(author.username, author.avatarURL());

        msg.channel.send(embed);
    }
};