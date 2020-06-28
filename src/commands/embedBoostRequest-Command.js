const discord = require('discord.js');

const config = require('../config/config');

module.exports = {
    name: 'postbr',
    description: 'Posts boost request embed message into selected channel.',
    parameters: null,
    guildOnly: true,
    allowedUserRoles: ["Staff"],

    run(msg, args) {
        msg.delete();
        const embed = new discord.MessageEmbed()
            .setTitle(config.boostRequest_RequestEmbedTitle)
            .setDescription(`To request a boost, react with ${config.boostRequest_RequestEmoji}\nWe will contact you shortly after.`)
            .setFooter('Hunter\'s Den', config.communityIconUrl)
            .setColor(0x0096fa);

        msg.channel.send(embed)
            .then((botMsg) => {
                return botMsg.react(config.boostRequest_RequestEmoji);
            })
            .catch(console.error);
    }
};