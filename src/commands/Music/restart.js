const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
        permissionLevel: 6,
        description: 'Clears the music handler.'
      });
  }

  async run(message) {
    message.guild.music.clear();
    if (message.guild.me.voice.channel) await message.guild.me.voice.channel.leave();

    return message.send('Successfully restarted the music module.');
  }
};