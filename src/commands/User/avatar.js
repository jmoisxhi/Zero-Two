const { MessageEmbed } = require('discord.js');
const { Command } = require('klasa');
const { color } = require('../../../config.json');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'avatar',
      runIn: ['text'],
      aliases: ['av', 'pfp'],
      description: 'Get the profile picture for a particular user.',
      guarded: true,
      usage: '<user:memberName>',
      extendedHelp: 'Simply do >>avatar <user> to retrieve the user\'s profile picture.'
    });

    this.customizeResponse('user',
      'You need to give me a valid user tag, darling.'
    );
  }

  async run(message, [user]) {
    const title = `${user.user.username}#${user.user.discriminator}`;
    const avatar = user.user.avatarURL();

    let display = new MessageEmbed()
      .setAuthor(title, avatar)
      .setImage(avatar)
      .setColor(color);

    return message.send(display);
  }
};