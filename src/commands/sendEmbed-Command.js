const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'sendEmbed',
    description: 'Send an embed message to the selected channel.',
    parameters: '[title]* [message]* [HEX color]',
    guildOnly: true,
    allowedUserRoles: null, // Require atleast one

    async run(msg, args) {

        msg.delete();

        let embedTitle;
        let embedMsg;
        let embedColor = args[2] || '#0096fa';
        const author = msg.author;

        if (!args[0]) return msg.reply(`please enter embed title.`);
        embedTitle = args[0];
        if (!args[1]) return msg.reply(`please enter embed message.`);
        embedMsg = args[1];
        if (author.partial) await author.fetch();   

        const embed = new MessageEmbed()
            .setTitle(embedTitle)
            .setColor(embedColor)
            .setDescription(embedMsg)
            .setFooter(author.username, author.avatarURL());

        msg.channel.send(embed);
    }
};