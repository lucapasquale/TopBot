export default {
  CMD_PREFIX: '$',

  PG_URI: process.env.PG_URI || 'postgres://localhost:5432/top_bot',
  DISCORD_KEY: process.env.DISCORD_KEY,
  TWITCH_KEY: process.env.TWITCH_KEY,

  LOL_URL: 'http://localhost:8080' || process.env.LOL_URL,
  LOL_KEY: process.env.LOL_KEY,
};
