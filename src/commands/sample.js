const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'sample',
    description: 'Sample Command.',
    parameters: '<user ID>',
    guildOnly: false,
    allowedUserRoles: null, // Require atleast one

    run(msg, args) {
        console.log("Sample Command Triggered, With The Following Args: " + args + ".")
    }
};