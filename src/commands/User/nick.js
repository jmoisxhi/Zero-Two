const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'nick',
      runIn: ['text'],
      aliases: ['nickname', 'name'],
      description: 'Change your nickname within your server.',
      guarded: true,
      usage: '<String:nick>',
      extendedHelp: 'Simply do >>avatar <user> to retrieve the user\'s profile picture.'
    });

    this.customizeResponse('nick',
      'You need to give me a valid nickname, darling.'
    );
  }

  async run(message, [nickName]) {
    message.member.setNickname(nickName)
      .then(console.log)
      .catch(console.error);

    return message.send(`Your nickname has been changed to: **${nickName}**`);
  }
};