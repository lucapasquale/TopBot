import * as Discord from 'discord.js';

import mixerOnline from './handlers/mixer-online';
import twitchOnline from './handlers/twitch-online';


const crons = [
  { fn: mixerOnline, interval: 'every 30 sec' },
  { fn: twitchOnline, interval: 'every 5 mins' },
];

export default crons;
