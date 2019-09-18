const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'scorch',
      cooldown: 0,
      permissionLevel: 6,
      description: 'Delete all messages within a certain channel.',
      extendedHelp: 'Simply do >>scorch'
    });
  }

  async run(message) {
    message.send('Are you sure you want to scorch this channel, darling? (Type \'yes\' to confirm or do not reply to cancel.)');
    await message.channel.awaitMessages(reply =>
      reply.author == message.author && reply.content === 'yes',
      {
        max: 1,
        time: 30000,
        errors: ['time']
      })
      .then(() => {
        const messageCount = message.channel.messages.size;

        message.channel.clone();
        message.send('Channel scorching initiated...');
        message.channel.delete();

        message.author.send(`Scorching complete. Successfully deleted ${messageCount} message(s).`);
      })
      .catch(() => message.send('Channel scorching has been cancelled.'))

    return null;
  }
};