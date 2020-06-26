const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '.test') {
    msg.reply('Test message.');
  }
});

client.login(process.env.token);
//NzI2MDcwMjIwNTczMjQ1NDYw.XvX7xg.XVOp99U-i_K_XYFgIv6wyH5mWUA