const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Pauses the current song.'
    });
  }

  async run(message) {
    const { music } = message.guild;

    if (!music.playing) throw 'I am not playing anything...';
    music.pause();

    return message.send('⏸ Paused');
  }
};