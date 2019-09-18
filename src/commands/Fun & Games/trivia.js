/* eslint-disable no-await-in-loop */
/* eslint-disable no-negated-condition */
const { MessageEmbed } = require('discord.js');
const { Command } = require('klasa');
const request = require('request-promise');
const { color } = require('../../../config.json');
const { decodeHTMLEntities } = require('../../lib/util.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'trivia',
      runIn: ['text'],
      aliases: ['quiz'],
      guarded: true,
      description: 'Get Zero Two to start a quiz.',
      usage: '[noOfQuestions:int{1,100}]',
      usageDelim: ' ',
      extendedHelp: 'Simply do >>trivia in order to start a quiz. The standard number of questions is 10 and the time for answering multiple choice questions is 60 seconds and 10 seconds for true or false questions. You can also choose a the number of questions you would like to have in the quiz by doing >>trivia <noOfQuestions>.'
    });
  }

  async run(message, [noOfQuestions]) {
    const timeChoice = 60000;
    const timeBoolean = 10000;
    const parameters = [];

    parameters.push(
      noOfQuestions ? `amount=${noOfQuestions}` : 'amount=10'
    );

    const query = parameters.join('&');

    const author = 'OpenTDB';
    const thumbnail = 'https://opentdb.com/images/logo-banner.png';
    const url = 'https://opentdb.com/api.php?';
    const footer = '© OpenTDB.com';
    const display = new MessageEmbed()
      .setAuthor(author)
      .setColor(color)
      .setThumbnail(thumbnail)
      .setFooter(footer);

    const stats = [];
    const leaderboard = [];

    await request(url + query)
      .then(questions => JSON.parse(questions).results)
      .then(async quiz => {
        for (let question = 0; question < quiz.length; question++) {
          let questionTime = 30000;
          let title = `**${quiz[question].category}**`;
          let questionToAsk = decodeHTMLEntities(quiz[question].question.toString());
          let type = `**${quiz[question].type
            .replace('boolean', 'True or False?')
            .replace('multiple', 'Multiple Choice:')}**`;

          if (quiz[question].type == 'boolean') questionTime = timeBoolean;
          if (quiz[question].type == 'multiple') questionTime = timeChoice;

          display
            .setTitle(title)
            .setDescription([
              type,
              questionToAsk
            ]);

          message.channel.send(display);

          await message.channel.awaitMessages(reply =>
            decodeHTMLEntities(quiz[question].correct_answer.toLowerCase())
              .includes(reply.content.toLowerCase()) && !reply.author.bot,
            {
              max: 1,
              time: questionTime,
              errors: ['time']
            })
            .then(winnerFound => {
              let winner = winnerFound.first();
              let position = stats.findIndex((player => player.name == winner.author));

              if (position != -1) stats[position].score += 1;
              else {
                let playerStats = {
                  name: winner.author,
                  score: 1
                }

                stats.push(playerStats);
              }

              message.channel.send(`✅${winner.author} got the right answer with '${winner.content}'✅.`);
            })
            .catch(() => message.channel.send('❌Nobody answered correctly❌.'));
        }
      })
      .catch(error => {
        if (error.statusCode === 403) throw message.channel.send('OpenTDB is down, try again later, darling.');

        throw message.send(message.language.get('COMMAND_ERROR_UPDATE', message));
      });

    stats.sort((a, b) => a.score - b.score);

    for (let player = 0; player < stats.length; player++) {
      leaderboard.push(
        `**${player + 1}.** **${stats[player].name.username}** (${stats[player].score}/${noOfQuestions ? noOfQuestions : 10} questions correct)\n`
      );
    }

    if (leaderboard.length < 1) {
      leaderboard.push('No-one answered any questions correctly.');
    }

    message.send('The quiz is over, here are the results.');

    return message.send(new MessageEmbed()
      .setTitle('Results:')
      .setThumbnail(thumbnail)
      .setColor(color)
      .setDescription(leaderboard));
  }
}