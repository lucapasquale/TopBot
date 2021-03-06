const env = process.env.NODE_ENV || 'development';

export default {
  ENV: env,

  PG_URI: process.env.PG_URI || 'postgres://localhost:5432//top_bot_test',
  DISCORD_KEY: process.env.DISCORD_KEY,
  TWITCH_KEY: process.env.TWITCH_KEY,

  CMD_PREFIX: '$',
};
