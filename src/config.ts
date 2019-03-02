const env = process.env.NODE_ENV || 'development';
const PG_HOST = process.env.PG_HOST || 'postgres://localhost:5432';

export default {
  ENV: env,
  CMD_PREFIX: '$',

  PG_URI: `${PG_HOST}/top_bot_${env}`,

  DISCORD_KEY: process.env.DISCORD_KEY,
  TWITCH_KEY: process.env.TWITCH_KEY,

  LOL_URL: 'http://localhost:8080' || process.env.LOL_URL,
  LOL_KEY: process.env.LOL_KEY,
};
