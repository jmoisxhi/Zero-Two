const { Structures } = require('discord.js');
const MusicManager = require('../structures/MusicManager.js');

module.exports = Structures.extend('Guild', Guild => {

  /**
   * Plantation 13's Extended Guild
   * @extends {Guild}
   */

  class Cerasus extends Guild {
    constructor(...args) {
      super(...args);

      /**
       * The MusicManager instance for this client
       * @since 1.0.0
       * @type {MusicManager}
       */
      this.music = new MusicManager(this);
    }
  }

  return Cerasus;
});