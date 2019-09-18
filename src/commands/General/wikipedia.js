const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const request = require('request-promise');
const { color } = require('../../../config.json');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['wiki'],
      description: 'Finds a Wikipedia Article by title.',
      usage: '<searchTerm:string> [...]'
    });

    this.customizeResponse('searchTerm',
      'You need to give me something to search for darling.'
    );
  }

  async run(message, [...searchTerm]) {
    const query = encodeURIComponent(searchTerm).replace('-', '_');

    const author = 'Wikipedia';
    const footer = '© Wikipedia.org';
    const thumbnail = 'https://i.imgur.com/fnhlGh5.png';
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
    const link = url + query;


    const wiki = await request(link)
      .then(article => JSON.parse(article))
      .catch(err => {
        if (err.statusCode == 403) throw message.send('Wikipedia is down, try again later, darling.');
        if (err.statusCode == 404) throw message.send('I couldn\'t find that article on Wikipedia, darling.');
        else {
          throw message.send(message.language.get('COMMAND_ERROR_UPDATE', message));
        }
      });

    return message.send(new MessageEmbed()
      .setAuthor(author)
      .setColor(color)
      .setDescription(`${wiki.extract}`)
      .setFooter(footer)
      .setImage(`${wiki.thumbnail ? wiki.thumbnail.source : ''}`)
      .setThumbnail(thumbnail)
      .setTitle(`${wiki.title}`)
      .setURL(`${wiki.content_urls.desktop.page}`));
  }
};