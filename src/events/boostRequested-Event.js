const discord = require("discord.js");

const config = require('../config/config');


const discordEvents = discord.Constants.Events;
let cooldowns = [];
const cooldownTime = 1000 * 60 * 10;

module.exports = {
    name: discordEvents.MESSAGE_REACTION_ADD,

    async run(reaction, user) {
        const msg = reaction.message;
        const client = user.client;

        if (user.bot) return;
        // Fetching the full msg data
        if (msg.partial) await msg.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.partial) await user.fetch();

        if (!msg.embeds.find(embed => { return embed.title === config.boostRequest_RequestEmbedTitle })) return;
        if (reaction._emoji.name != config.boostRequest_RequestEmoji) return reaction.remove();
        if (cooldowns.includes(user.id)) {
            user.send(`Sorry, you can't use the **boost-requesting** function, please wait ${cooldownTime / (1000 * 60)} minute(s) before using it again.`);
            return msg.reactions.resolve(config.boostRequest_RequestEmoji).users.remove(user);
        }

        client.channels.fetch(config.boostRequest_RequestNotificationChannelId)
            .then(channel => {
                return channel.send('@here');
            })
            .then((msg) => {
                const embed = new discord.MessageEmbed()
                    .setTitle(config.boostRequest_LockEmbedTitle)
                    .setThumbnail(user.avatarURL())
                    .setDescription(`A boost request was placed by ${user.toString()}. \n React with ${config.boostRequest_LockEmoji} to lock the request.`)
                    .addField('Status ', 'Open')
                    //.setTimestamp()
                    .setColor(0x00fc17);
                return msg.channel.send(embed);
            })
            .then((botMsg) => {
                return botMsg.react(config.boostRequest_LockEmoji);
            })
            .then(() => {
                return user.send(`Hey ${user.toString()}, your request has been registered. \nWe will contact you soon :)`);
            })
            .then(() => {
                cooldowns.push(user.id);
                setTimeout(() => {
                    cooldowns = cooldowns.filter(cd => cd !== user.id);
                }, cooldownTime)

                // TESTING TESTING TESTING
                const boostRequestNotificationChannel = client.channels.cache.get(config.boostRequest_RequestNotificationChannelId);
                msg.guild.members.fetch(user.id)
                    .then((guildMember) => {
                        boostRequestNotificationChannel.send(`**Buyer's tag:** ${guildMember.toString()} *(This field is for testing purposes only and will be removed in the future)*`);
                    })
                //

                return msg.reactions.resolve(config.boostRequest_RequestEmoji).users.remove(user);
            })
            .catch(console.error);
    }
}

// msg.embeds.forEach(embed => {
//     if (embed.title !== config.boostRequest_RequestEmbedTitle) return;
// });