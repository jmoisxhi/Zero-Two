/* eslint-disable init-declarations */
const { Argument } = require('klasa');
const { URL } = require('url');

module.exports = class extends Argument {
  async run(arg, _, message) {
    if (!arg) throw message.language.get('MUSICMANAGER_FETCH_NO_ARGUMENTS');
    if (!message.guild) return null;
    arg = arg.replace(/<(.+)>/g, '$1');
    const parsedURL = this.parseURL(arg);
    let returnAll;
    let tracks;
    let soundcloud = true;
    if (parsedURL) {
      tracks = await message.guild.music.fetch(arg).catch(() => []);
      returnAll = parsedURL.playlist;
    } else if (('sc' in message.flags) || ('soundcloud' in message.flags)) {
      tracks = await message.guild.music.fetch(`scsearch: ${arg}`).catch(() => []);
      returnAll = false;
      soundcloud = false;
    } else {
      tracks = await message.guild.music.fetch(`ytsearch: ${arg}`).catch(() => []);
      returnAll = false;
    }
    if (!tracks.length) {
      if (soundcloud) tracks.push(...await message.guild.music.fetch(`scsearch: ${arg}`).catch(() => []));
      if (!tracks.length) throw message.language.get('MUSICMANAGER_FETCH_NO_MATCHES');
    }

    return returnAll ? tracks : tracks[0];
  }

  parseURL(url) {
    try {
      const parsed = new URL(url);

      return parsed.protocol && parsed.hostname && (parsed.protocol === 'https:' || parsed.protocol === 'http:')
        ? {
          url: parsed.href,
          playlist: parsed.searchParams.has('list')
        }
        : null;
    } catch (error) {
      return null;
    }
  }
}