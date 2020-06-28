const discord = require('discord.js');
//
const path = require('path');
const fsUtils = require('../utils/fsUtils');
//

module.exports = {
    name: 'ebr',
    description: 'Post boost request embed message into channel.',
    parameters: null,
    guildOnly: true,
    allowedUserRoles: ["Staff"],

    run(msg, args) {
        msg.delete();
        const embed = new discord.MessageEmbed()
            .setTitle('Request a boost')
            .setDescription(`To request a boost, react with 📩\nWe will contact you shortly after.`)
            .setFooter('Hunter\'s Den', 'https://lh6.googleusercontent.com/1D-cFfU1vcrtgqoe7pevejikxtg3yK37bF6MuJN-t5XX_leOAOwVL5YGhQ3me47EKocXbCpq-gi0IUc6EGhP=w1119-h947')
            .setColor(0x0096fa);
        msg.channel.send(embed)
            .then((botMsg) => {
                //   
                fsUtils.readFromFile(path.join(__dirname, '..', 'config', "boostRequestEmbeds.json"))
                    .then((data) => {
                        let jsonData = JSON.parse(data);
                        if (!jsonData.msgIds) jsonData = { msgIds: [] };
                        jsonData.msgIds.push(botMsg.id);
                        msg.client.boostRequestEmbeds = jsonData.msgIds;

                        fsUtils.saveToFile(path.join(__dirname, '..', 'config', "boostRequestEmbeds.json"), JSON.stringify(jsonData))
                            .then(() => {
                                console.log(jsonData)
                            })
                    })
                //

                return botMsg.react('📩');
            })
            .catch(console.error);

    }
};