const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const { color } = require('../../../config.json');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'deprecated',
      hidden: true,
      aliases: ['ud', 'urbandictionary', 'urban', 'topic'],
      description: 'This is just here to send a message whenever someone uses an old command'
    });
  }

  async run(message) {
    const url = 'https://github.com/jmoisxhi/Zero-Two';

    return message.send(new MessageEmbed()
    .setAuthor(message.client.owner.tag, message.client.owner.avatarURL(), url)
    .setColor(color)
    .setDescription(message.language.get('DEPRECATED_COMMAND_MESSAGE'))
    .setFooter(message.language.get('SIGNATURE')));
  }
};