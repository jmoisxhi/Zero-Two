const { Command, Duration } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'mute',
      permissionLevel: 6,
      requiredPermissions: ['MANAGE_ROLES'],
      runIn: ['text'],
      description: 'Mutes user in your server.',
      usage: '[duration:time] <userToMute:memberName> [reason:...string]',
      usageDelim: ' ',
      extendedHelp: 'Simply do >>mute <usersToMute> to mute user(s) in your server'
    });

    this.customizeResponse('userToMute',
      'You need to give someone to mute, darling.'
    );
  }

  async run(msg, [duration, userToMute, reason]) {
    if (userToMute.id === msg.author.id) throw 'Why do you want to mute yourself darling?';
    if (userToMute.id === this.client.user.id) throw 'Have I been a bad bot, darling?';
    if (userToMute.roles.highest.position >= msg.userToMute.roles.highest.position) throw 'You can\'t mute that person darling.';

    if (userToMute.roles.has(msg.guild.settings.roles.muted)) throw 'That person is already muted, darling.';
    await userToMute.roles.add(msg.guild.settings.roles.muted);

    if (duration) {
      await this.client.schedule.create('unmute', duration, {
        data: {
          guild: msg.guild.id,
          user: userToMute.id
        }
      });

      return msg.sendMessage(`${userToMute.user.tag} got temporarily muted for ${Duration.toNow(duration)} ${reason ? `for ${reason}.` : 'for reasons ;).'}`);
    }

    return msg.sendMessage(`${userToMute.user.tag} got muted ${reason ? `for ${reason}.` : 'for reasons ;).'}`);
  }
};