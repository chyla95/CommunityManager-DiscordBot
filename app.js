const { Client, MessageEmbed } = require('discord.js');

const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '.test') {
    msg.reply('Test message.');
  }
});

client.on('message', msg => {
  if (msg.content === '.ingoz') {
    
    const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle('Ingoz')
      // Set the color of the embed
      .setColor(0xF340B9)
      // Set the main content of the embed
      .setDescription('Ingoz is very gay. :sademote:');
    // Send the embed to the same channel as the message
    message.channel.send(embed);



  }
});

client.login(process.env.token);
//NzI2MDcwMjIwNTczMjQ1NDYw.XvX7xg.XVOp99U-i_K_XYFgIv6wyH5mWUA