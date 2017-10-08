import * as Discord from 'discord.js';

import mixerStreamOnline from './handlers/mixer-stream-online';


const crons = [
  { fn: mixerStreamOnline, interval: 'every 30 sec' },
];

export default crons;
