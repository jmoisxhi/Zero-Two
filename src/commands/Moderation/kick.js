const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'kick',
      permissionLevel: 6,
      requiredPermissions: ['KICK_MEMBERS'],
      runIn: ['text'],
      aliases: ['boot'],
      description: 'Kick user(s) from your server.',
      usage: '<userToKick:memberName> [reason:...string]',
      usageDelim: ' ',
      extendedHelp: 'Simply do >>kick <userToKick> to kick user(s) from your server. If you would like to give a reason, do >>kick <userToKick> [reason]'
    });

    this.customizeResponse('userToKick',
      'You need to give me people to kick, darling.'
    );
  }

  async run(msg, [userToKick, reason]) {
    if (userToKick.id === msg.author.id) throw 'Why do you want to kick yourself darling?';
    if (userToKick.id === this.client.user.id) throw 'Have I been a bad bot, darling?';

    if (userToKick.roles.highest.position >= msg.userToKick.roles.highest.position) throw 'You can\'t kick that person darling.';
    if (!userToKick.kickable) throw 'I can\'t kick that person darling.';

    await userToKick.kick(reason);

    return msg.sendMessage(`${userToKick.user.tag} got kicked ${reason ? `for ${reason}` : 'for reasons ;).'}`);
  }
};