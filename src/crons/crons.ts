import * as Discord from 'discord.js';

import mixerOnline from './handlers/mixer-online';
import twitchOnline from './handlers/twitch-online';
import lolStaticData from './handlers/lol-static-data';


const crons = [
  { fn: mixerOnline, interval: 'every 1 min' },
  { fn: twitchOnline, interval: 'every 5 mins' },
  { fn: lolStaticData, interval: 'every 12 hours' },
];

export default crons;
