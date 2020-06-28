const discord = require("discord.js");
const discordEvents = discord.Constants.Events;

module.exports = {
    name: discordEvents.MESSAGE_REACTION_ADD,

    async run(reaction, user) {

        if (user.bot) return;
        const allowedChannel = '726584350774263868';
        if (reaction.message.channel.id != allowedChannel) return
        if (reaction._emoji.name != "🔒") return reaction.remove();

        // Fetching the full msg data
        if (reaction.message.partial) await reaction.message.fetch();
        //if (reaction.partial) await reaction.fetch();
        const msg = reaction.message;

        const embed = new discord.MessageEmbed(msg.embeds[0])

        const status = embed.fields.find(e => { return e.name === 'Status' }).value;
        if(status !== 'Open') return reaction.remove(); //msg.reactions.resolve('🔒').users.remove(user);
        embed.setColor(0xff0000);
        embed.fields.map(e => { if (e.name === 'Status') { e.value = `Taken by ${user.toString()}` } })
        msg.edit(embed)
            .then(() => {
                //msg.reactions.resolve('🔒').users.remove(user);
                reaction.remove();
            })
            .catch(console.error);

    }
}