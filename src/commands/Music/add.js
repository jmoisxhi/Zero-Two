/* eslint-disable no-useless-escape */
const cheerio = require('cheerio');
const { Command } = require('klasa');
const request = require('request-promise');

const YOUTUBE_REGEXP = new RegExp('/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/\S*(?:(?:\/e(?:mbed)?)?\/|watch\/?\?(?:\S*?&?v=))|youtu\.be\/)([\w-]{11})(?:[^\w-]|$)/');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Adds a song the to the queue.',
      usage: '<url:string>'
    });

    this.customizeResponse('url',
      'You need to give me a song to add darling.'
    );
  }

  async run(message, [url]) {
    const youtubeURL = await this.getURL(url);
    if (!youtubeURL) throw 'Not found.';

    const { music } = message.guild;
    const song = await music.add(message.author, youtubeURL);

    return message.send(`🎵 Added **${song.title}** to the queue 🎶`);
  }

  async getURL(searchEntry) {
    const id = YOUTUBE_REGEXP.exec(searchEntry);
    if (id) return `https://youtu.be/${id[1]}`;

    const query = encodeURIComponent(searchEntry);
    const url = 'https://www.youtube.com/results?search_query=';
    const link = url + query;

    const video = await request(link)
      .then(response => {
        const $ = cheerio.load(response);
        const result = $('#video-title').first().attr('href');

        return result.replace('/watch?v=', '');
      })
      .catch(error => {
        throw error;
      });

    return video ? `https://youtu.be/${video}` : null;
  }
};
