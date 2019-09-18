/* eslint-disable no-async-promise-executor */
/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Let\'s start the queue!'
    });
  }

  async run(message) {
    const { music } = message.guild;

    if (!music.queue.length) return message.send(`You need to add a song to the queue with the \`${message.guild.settings.prefix}add\` command, then use the \`${message.guild.settings.prefix}play\` command, darling.`);
    if (!music.voiceChannel) await this.store.get('join').run(message);
    if (music.playing) return message.send('I\'m already playing something... ?');
    else if (music.paused) {
      music.resume();

      return message.send(`Now playing: ${music.queue[0].title}!`);
    }

    music.channel = message.channel;

    return this.play(music);
  }

  async play(music) {
    while (music.queue.length) {
      const [song] = music.queue;
      await music.channel.send(`🎧 Playing: **${song.title}**`);

      try {
        if (!(await new Promise(async resolve => {
            (await music.play())
              .on('end', () => {
                if (!music.loop) {
                  music.skip();
                }
                resolve(true);
              })
              .on('error', err => {
                music.channel.send('Whoops! Something went wrong.');
                music.client.emit('error', err);
                music.skip();
                resolve(true);
              })
              .once('disconnect', () => {
                resolve(false);
              });
          }))) return null;

        // Autofetch if the autoplayer is enabled
        if (!music.queue.length && (music.autoplay || music.loop)) return await this.autoPlayer(music);
      } catch (error) {
        this.client.emit('error', error);
        music.channel.send(error);
        music.leave();
        break;
      }
    }
  }

  autoPlayer(music) {
    return music.add('YouTube AutoPlay', music.next);
  }
};