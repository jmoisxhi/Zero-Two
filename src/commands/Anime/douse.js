const { MessageEmbed } = require('discord.js');
const { Command } = require('klasa');
const { color } = require('../../../config.json');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'douse',
      cooldown: 60,
      guarded: true,
      permissionLevel: 0,
      description: 'Douse Zero Two!',
      extendedHelp: 'Simply do >>douse'
    });
  }

  async run(message) {
    const description = 'And I oop-';
    const image = 'https://i.pinimg.com/originals/6a/c8/26/6ac826e3d0cbd64eb4f42c12a73fcdb8.gif';

    return message.send(new MessageEmbed()
      .setColor(color)
      .setDescription(description)
      .setImage(image));
  }
};