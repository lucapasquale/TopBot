import * as Discord from 'discord.js';

import mixerStreamOnline from './handlers/mixer-stream-online';
import lolStaticData from './handlers/lol-static-data';


const crons = [
  { fn: mixerStreamOnline, interval: 'every 30 seg' },
  { fn: lolStaticData, interval: 'every 12 hours' },
];

export default crons;
