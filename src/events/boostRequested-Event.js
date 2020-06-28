const discord = require("discord.js");
const discordEvents = discord.Constants.Events;

let cooldowns = [];
const cooldown = 1000*60*2;

module.exports = {
    name: discordEvents.MESSAGE_REACTION_ADD,

    async run(reaction, user) {

        if (user.bot) return;
        const allowedMsgId = user.client.boostRequestEmbeds;
        const msg = reaction.message;
        if (!allowedMsgId.includes(msg.id)) return;
        if (reaction._emoji.name != "📩") return reaction.remove();
        if(cooldowns.includes(user.id)){
            user.send(`Sorry ${user.toString()}, you can't use the boost-requesting function, please wait ${cooldown/(1000*60)} min before using it again.`);
            return msg.reactions.resolve("📩").users.remove(user);
        }

        // Fetching the full msg data
        if (reaction.message.partial) await reaction.message.fetch();
        //if (reaction.partial) await reaction.fetch();     

        user.client.channels.fetch('726584350774263868')
            .then(channel => {
                const embed = new discord.MessageEmbed()
                    .setTitle('Boost request')
                    .setDescription(`${user.toString()} requested a boost. \n React with 🔒 to lock the request.`)
                    .addField('Status ', 'Open')
                    .setColor(0x00fc17);
                return channel.send(embed);
            })
            .then((botMsg) => {                
                return botMsg.react('🔒');
            })
            .then(() => {
                return user.send(`Hey ${user.toString()}, your request has been registered. \nWe will contact you soon :)`);
            })
            .then(() => {
                cooldowns.push(user.id);
                setTimeout(() => {
                    cooldowns = cooldowns.filter(cd => cd !== user.id);
                    console.log(cooldowns);
                }, cooldown)

                return msg.reactions.resolve("📩").users.remove(user);
            })
            .catch(console.error);
    }
}