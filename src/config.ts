const PG_HOST = process.env.PG_HOST || 'postgres://localhost:5432';
const env = process.env.NODE_ENV || 'development';

export default {
  ENV: env,

  PG_URI: `${PG_HOST}/discord_bot_${env}`,
  DISCORD_KEY: process.env.DISCORD_KEY,
  TWITCH_KEY: process.env.TWITCH_KEY,

  CMD_PREFIX: '$',
};
