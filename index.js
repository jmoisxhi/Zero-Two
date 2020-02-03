/* eslint-disable no-undef */
/* eslint-disable no-process-env */
const { KlasaClient } = require('klasa');
const CONFIG = require('./config.json');

require('./src/lib/extensions/Cerasus');

KlasaClient.defaultGuildSchema.add('roles', schema => {
  schema.add('muted', 'role')
});

KlasaClient.defaultPermissionLevels
  .add(5, message => message.member && message.guild.settings.dj && message.member.roles.has(message.guild.settings.dj), { fetch: true })

new KlasaClient({
  commandLogging: true,
  noPrefixDM: true,
  prefix: CONFIG.prefix,
  production: true,
  presence: {
    activity: {
      name: "Darling in the FranXX",
      type: "WATCHING",
      shardID: CONFIG.shardCount
    }
  },
  readyMessage: "I missed you, Darling",
  shardCount: CONFIG.shardCount,
  totalShardCount: CONFIG.shardCount,
  typing: true
}).login(process.env.TOKEN);