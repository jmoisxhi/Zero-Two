const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Resumes the current song.'
    });
  }

  async run(message) {
    if (message.guild.music.idling) throw 'The queue is empty! Give something to play first darling!';
    if (message.guild.music.playing) throw 'Is this song too silent, darling? Because there is already a song playing darling...';

    message.guild.music.resume();

    return message.send('▶ Resumed');
  }
};