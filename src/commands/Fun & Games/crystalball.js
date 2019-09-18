const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
        name: 'predict',
        aliases: ['8ball', 'mirror', 'crystalball'],
        guarded: true,
        description: 'Ask Zero Two a question and she will predict the future.',
        usage: '<question:string>',
        extendedHelp: `Simply do predict >>predict <question> to get a prediction.`
      });

    this.customizeResponse('question',
      'You need to give me something to predict, darling.'
    );
  }

  async run(message, [question]) {
    const answers =
      [
        'Maybe, darling.',
        'Certainly not, darling.',
        'I hope so, darling.',
        'Not in our wildest dreams, darling.',
        'There is a good chance, darling.',
        'Quite likely, darling.',
        'I think so, darling.',
        'I hope not, darling.',
        'I hope so, darling.',
        'Never!',
        'Ahaha! Really?!? XD',
        'Hell, yes.',
        'Hell to the no.',
        'The future is bleak, darling',
        'The future is uncertain, darling',
        'I would rather not say, darling',
        'Who cares?',
        'Possibly, darling',
        'Never, ever, ever... ever.',
        'There is a small chance, darling.',
        'Yes, darling!'
      ];

    return message.reply(question.endsWith('?')
      ? `${answers[Math.floor(Math.random() * answers.length)]}`
      : 'That doesn\'t look like a question, try adding a question mark (?) and asking again, darling.');
  }
};