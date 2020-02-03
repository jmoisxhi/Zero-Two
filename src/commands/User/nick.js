const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'nick',
      runIn: ['text'],
      aliases: ['nickname', 'name'],
      description: 'Change your nickname within your server.',
      guarded: true,
      usage: '<nickname:string>',
      extendedHelp: 'Simply do >>nick <nickName> to add your nickname.'
    });

    this.customizeResponse('nickname',
      'You need to give me a valid nickname, darling.'
    );
  }

  async run(message, [nickname]) {
    message.member.setNickname(nickName)
      .then(console.log)
      .catch(console.error);

    return message.send(`Your nickname has been changed to: **${nickName}**`);
  }
};
