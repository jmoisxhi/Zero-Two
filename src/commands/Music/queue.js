const { MessageEmbed } = require('discord.js');
const { Command, RichDisplay } = require('klasa');
const { color } = require('../../../config.json');
const { showSeconds } = require('../../lib/util.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check the queue list.'
    });
  }

  async run(message) {
    const { queue } = message.guild.music;
    const footer = '© Youtube Inc.';
    const thumbnail = 'http://logok.org/wp-content/uploads/2014/08/Youtube-logo-2017-640x480.png';


    if (!queue[0]) throw message.send('The queue is empty, darling.');

    const display = new RichDisplay(new MessageEmbed()
      .setColor(color)
      .setFooter(footer)
      .setThumbnail(thumbnail));

    for (let song = 0; song < queue.length; song++) {
      display.addPage(template => template
        .setAuthor(`${queue[song].requester.tag || queue[song].requester}`, `${queue[song].requester.avatarURL()}`)
        .setTitle(`${queue[song].title.replace(/\*/g, '\\*')}`)
        .setURL(`https://youtu.be/${queue[song].url}`)
        .addField('**Duration:**', `${showSeconds(queue[song].seconds * 1000)} mins`), true);
    }

    return display.run(await message.send('Loading songs...'))
  }
};