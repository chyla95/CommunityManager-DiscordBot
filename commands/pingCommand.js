const { MessageEmbed } = require('discord.js');

module.exports = {
    name: '.ping',
    description: '',

    run(msg, args) {
        const embed = new MessageEmbed()
            .setTitle('Pong')
            .setColor(0xF340B9)
            .setDescription('...');
        msg.channel.send(embed);
    }
};