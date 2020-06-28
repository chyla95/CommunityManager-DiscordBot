const discord = require("discord.js");
const discordEvents = discord.Constants.Events;

//
const path = require('path');
const fsUtils = require('../utils/fsUtils');
//

module.exports = {
    name: discordEvents.MESSAGE_DELETE,

    run(msg) {
        if (!msg.client.boostRequestEmbeds.includes(msg.id)) return;

        fsUtils.readFromFile(path.join(__dirname, '..', 'config', "boostRequestEmbeds.json"))
            .then((data) => {
                let jsonData = JSON.parse(data);                
                if (!jsonData.msgIds) jsonData = { msgIds: [] };
                
                msgIdsFiltered = jsonData.msgIds.filter(e => e !== msg.id);
                jsonData.msgIds = msgIdsFiltered                
                msg.client.boostRequestEmbeds = jsonData.msgIds;

                fsUtils.saveToFile(path.join(__dirname, '..', 'config', "boostRequestEmbeds.json"), JSON.stringify(jsonData))
                    .then(() => {
                        console.log(jsonData)
                    })
            })

    }
};