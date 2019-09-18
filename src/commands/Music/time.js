const { Command } = require('klasa');
const { showSeconds } = require('../../lib/util.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check how much time is left for the song to end.'
    });
  }

  async run(message) {
    const { playing, remaining } = message.guild.music;
    if (!playing) throw `Are you speaking to me? Because my deck is empty...`;

    return message.send(`🕰 Time remaining: ${showSeconds(remaining)}`);
  }
};