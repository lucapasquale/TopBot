const env = process.env.NODE_ENV || 'development';
const PG_HOST = process.env.PG_HOST || 'postgres://localhost:5432';

export default {
  ENV: env,

  PG_URI: `${PG_HOST}/top_bot_${env}`,
  DISCORD_KEY: process.env.DISCORD_KEY,
  TWITCH_KEY: process.env.TWITCH_KEY,

  CMD_PREFIX: '$',
};
