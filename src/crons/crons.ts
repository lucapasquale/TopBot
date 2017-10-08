import * as Discord from 'discord.js';

import streamOnline from './handlers/stream-online';


const crons = [
  { fn: streamOnline, interval: 'every 15 sec' },
];

export default crons;
