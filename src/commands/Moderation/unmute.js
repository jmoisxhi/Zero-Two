const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'unmute',
      permissionLevel: 6,
      requiredPermissions: ['MANAGE_ROLES'],
      runIn: ['text'],
      description: 'Unmutes user(s) in your server.',
      usage: '<userToUnmute:memberName> [reason:...string]',
      usageDelim: ' ',
      extendedHelp: 'Simply do >>unmute <userToUnmute> to unmute the user. You can also do >>unmute <userToUnmute> [reason] to give a reason why you unmuted them.'
    });

    this.customizeResponse('userToUnmute',
    'You need to give me someone to unmute, darling.'
    );
  }

  async run(msg, [userToUnmute, reason]) {
    if (userToUnmute.roles.highest.position >= msg.userToUnmute.roles.highest.position) throw 'You cannot unmute this person.';
    if (!userToUnmute.roles.has(msg.guild.settings.roles.muted)) throw 'That person isn\'t muted.';

    await userToUnmute.roles.remove(msg.guild.settings.roles.muted);

    return msg.sendMessage(`${userToUnmute.user.tag} was unmuted ${reason ? `for ${reason}` : 'for reasons.'}`);
  }

};