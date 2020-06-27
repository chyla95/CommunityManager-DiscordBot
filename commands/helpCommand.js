module.exports = {
    name: 'help',
    description: 'List of available commands.',
    guildOnly: false,

    run(msg, args) {
        msg.channel.send( msg.author.toString() + ', this is a test message. ' + args[0]);
    }
};