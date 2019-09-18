const { Permissions: { FLAGS } } = require('discord.js');
const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['connect'],
      description: 'Joins the message author\'s voice channel.'
    });
  }

  async run(message) {
    if (!message.member) await message.guild.members.fetch(message.author.id).catch(() => {
      throw 'I am sorry, but Discord did not tell me the information I need, so I do not know what voice channel are you connected to...';
    });

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) throw 'You are not connected in a voice channel.';
    if (message.guild.music.playing) {
      const granCrevasseVoiceChannel = message.guild.music.voice.channel;

      if (voiceChannel.id === granCrevasseVoiceChannel.id) throw 'Turn on your volume! I am playing music there!';
      throw 'I am sorry, but I am playing music in another channel, perhaps try later or ask nicely to the people who came first to join them!';
    }

    this.resolvePermissions(message, voiceChannel);
    await message.guild.music.join(voiceChannel);

    return message.send(`Successfully joined the voice channel ${voiceChannel}`);
  }

  resolvePermissions(message, voiceChannel) {
    const permissions = voiceChannel.permissionsFor(message.guild.me);

    if (voiceChannel.full) throw 'I cannot join your voice channel, it\'s full... kick somebody with the boot or make room for me!';
    if (!permissions.has(FLAGS.CONNECT)) throw 'I do not have enough permissions to connect to your voice channel. I am missing the CONNECT permission.';
    if (!permissions.has(FLAGS.SPEAK)) throw 'I can connect... but not speak. Please turn on this permission so I can play some music, darling.';
  }
};