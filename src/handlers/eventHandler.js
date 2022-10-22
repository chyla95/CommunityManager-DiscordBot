const discord = require("discord.js");

const { readdirSync } = require('fs');
const path = require('path');


module.exports = (client) => {
    // Loading events from files
    console.log('LOADING Events...')

    const eventsFileNames = readdirSync(path.join(__dirname, '..', 'events'))
        .filter((fileName) => {
            return fileName.endsWith('.js');
        });

    const discordEvents = Object.values(discord.Events);
    eventsFileNames.forEach(fileName => {
        const event = require(path.join(__dirname, '..', 'events', fileName))

        if (event.trigger && event.run &&  discordEvents.includes(event.trigger)) {
            client.on(event.trigger, event.run);
            console.log(`✅ - ${fileName}`)
        } else {
            console.log(`❌ - ${fileName}`)
        }


    });
}