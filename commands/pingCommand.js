const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Test command.',
    guildOnly: true,

    run(msg, args) {
        const embed = new MessageEmbed()
            .setTitle('Pong')
            .setColor(0xF340B9)
            .setDescription(msg.author.toString() + ', this is an example embed message.');
        msg.channel.send(embed);
    }
};