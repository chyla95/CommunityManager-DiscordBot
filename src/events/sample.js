const discord = require("discord.js");

module.exports = {
    trigger: discord.Events.MessageCreate,

    async run(message) {
        if(message.content == "sample") console.log("Sample Event Triggered!")
        
    }
}