import * as dotenv from 'dotenv';

dotenv.config();

export default {
  DISCORD_KEY: process.env.DISCORD_KEY || '',
  LOL_KEY: process.env.LOL_KEY || '',
};
