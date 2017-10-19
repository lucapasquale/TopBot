import * as Discord from 'discord.js';

import streamOnline from './handlers/stream-online';
import lolStaticData from './handlers/lol-static-data';


const crons = [
  { fn: streamOnline, interval: 'every 1 min' },
  { fn: lolStaticData, interval: 'every 12 hours' },
];

export default crons;
