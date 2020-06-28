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

    const discordEvents = Object.values(discord.Constants.Events);
    eventsFileNames.forEach(fileName => {
        const event = require(path.join(__dirname, '..', 'events', fileName))

        if (event.name && event.run && typeof event.run == 'function' && discordEvents.includes(event.name)) {
            client.on(event.name, event.run);
            console.log(`✅ - ${fileName}`)
        } else {
            console.log(`❌ - ${fileName}`)
        }


    });
}