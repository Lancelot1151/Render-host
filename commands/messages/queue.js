const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Queue",
  aliases: ['q'],
  description: "Shows the server current queue",

  async execute(client, message, args, cmd) {

    const memberVoiceChannel = message.member.voice.channel;
    if (!memberVoiceChannel) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('You are not connected to any Voice Channel.');

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    const botVoiceChannel = message.guild.members.me.voice.channel;
    if (!botVoiceChannel) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('I\'m not connected to any Voice Chnanel.');

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    if (memberVoiceChannel.id !== botVoiceChannel.id) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('You are not connected to my Voice Channel.');

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    const queue = client.distube.getQueue(message.guild)
    if (!queue) {

      const noQueueEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('There is nothing in the queue right now.');

      return message.reply({ embeds: [noQueueEmbed] });

    };

    const queueEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setTitle('Server Queue')
      .setDescription(queue.songs.map((song, i) => `${i === 0 ? '**Playing:**' : `**${i}.**`} ${song.name} (${song.formattedDuration})`).join('\n'));

    return message.reply({ embeds: [queueEmbed] });

  },

};