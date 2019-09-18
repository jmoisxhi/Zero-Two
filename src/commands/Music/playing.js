const { MessageEmbed } = require('discord.js');
const { Command } = require('klasa');
const ytdl = require('ytdl-core');
const getInfo = require('util').promisify(ytdl.getInfo);
const { color } = require('../../../config.json');
const { splitText, showSeconds } = require('../../lib/util.js');


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Get information from the current song.'
    });
  }

  async run(message) {
    const { remaining, queue, playing } = message.guild.music;
    if (!playing) throw `Are you speaking to me? Because my deck is empty...`;

    const [song] = queue;
    const info = await getInfo(song.url);
    if (!info.author) info.author = {};

    return message.send(new MessageEmbed()
      .setAuthor(info.author.name || 'Unknown', info.author.avatar || null, info.author.channel_url || null)
      .setColor(color)
      .setDescription([
        `**Duration**: ${showSeconds(parseInt(info.length_seconds) * 1000)} [Time remaining: ${showSeconds(remaining)}]`,
        `**Description**: ${splitText(info.description, 500)}`
      ].join('\n\n'))
      .setThumbnail(info.thumbnail_url)
      .setTimestamp()
      .setTitle(info.title)
      .setURL(`https://youtu.be/${info.vid}`));
  }
};