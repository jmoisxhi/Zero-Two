const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Loops the song that is currently playing.'
    });
  }

  async run(message) {
    const { music } = message.guild;

    if (!music.playing) throw `Are you speaking to me? Because my deck is empty...`;
    music.loop = !music.loop;

    const response = music.loop ? 'On' : 'Off';

    return message.send(`🕰 Loop status changed...\n*Looping* : ${response}`);
  }
};