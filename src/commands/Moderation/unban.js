const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'unban',
      permissionLevel: 6,
      requiredPermissions: ['BAN_MEMBERS'],
      runIn: ['text'],
      description: 'Unbans a person from your server.',
      usage: '<userToUnban:userToUnban> [reason:...string]',
      usageDelim: ' ',
      extendedHelp: 'Simply do >>unban <userToUnban> to unban that user. You can also do >>unban <userToUnban> [reason] to give a reason why you unbanned them.'
    });

    this.customizeResponse('userToUnban',
    'You need to give me someone to unban, darling.'
    );
  }

  async run(msg, [userToUnban, reason]) {
    const bans = await msg.guild.fetchBans();
    if (bans.has(userToUnban.id)) {
      await msg.guild.members.unban(userToUnban, reason);

      return msg.sendMessage(`${userToUnban.tag} was unbanned ${reason ? `for ${reason}` : 'for reasons.'}`);
    }

    throw `${userToUnban.tag} was never banned, I can't unban them darling.`;
  }

};