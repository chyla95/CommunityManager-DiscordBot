const discord = require("discord.js");

const config = require('../config/config');


const discordEvents = discord.Constants.Events;

module.exports = {
    name: discordEvents.MESSAGE_REACTION_ADD,

    async run(reaction, user) {
        const msg = reaction.message;

        if (user.bot) return;
        // Fetching the full msg data
        if (msg.partial) await msg.fetch(); //if (reaction.partial) await reaction.fetch();         

        const fetchedEmbed = msg.embeds.find(embed => { return embed.title === config.boostRequest_LockEmbedTitle })
        if (!fetchedEmbed) return;
        if (msg.channel.id != config.boostRequest_RequestNotificationChannelId) return;
        if (reaction._emoji.name != config.boostRequest_LockEmoji) return reaction.remove();

        const status = fetchedEmbed.fields.find(e => { return e.name === 'Status' }).value;
        if(status !== 'Open') return reaction.remove(); //msg.reactions.resolve(config.boostRequest_LockEmoji).users.remove(user);
        fetchedEmbed.fields.map(e => { if (e.name === 'Status') { e.value = `Taken by ${user.toString()}` } })
        fetchedEmbed.setColor(0xff0000);
        msg.edit(fetchedEmbed)
            .then(() => {                
                reaction.remove(); //msg.reactions.resolve(config.boostRequest_LockEmoji).users.remove(user);
            })
            .catch(console.error);
    }
}