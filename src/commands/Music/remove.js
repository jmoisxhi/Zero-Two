/* eslint-disable no-use-before-define */
const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      usage: '<number:integer>',
      description: 'Remove a song from the queue list.'
    });

    this.customizeResponse('number',
      'You need to give me the number of the song you want to remove darling.'
    );
  }

  async run(message, [number]) {
    const { music } = message.guild;

    if (number <= 0) throw 'Look, I am no expert in maths, but I kinda expected a number bigger than 0 darling...';

    number -= 1;

    if (music.queue.length < number) throw `I tried getting that song for you, but I only have ${music.queue.length} songs in my deck!`;
    const song = music.queue[number];

    if (song.requester.id !== message.author.id) if (!await message.hasAtLeastPermissionLevel(5)) throw DENIED_SONG_REMOVAL;

    music.queue.splice(number, 1);

    return message.send(`🗑 Removed the song **${song.title}** requested by **${song.requester}**.`);
  }
};

const DENIED_SONG_REMOVAL =
  [
    'I find it a bit rude to remove somebody else\'s songs from the list darling... Talk with them kindly, or',
    'shout at a DJ if there is one in this guild, if it ruins the party, then they may consider to remove it!'
  ]
    .join(' ');