import * as Discord from 'discord.js'
import streamOnline from './stream-online';


const crons = [
  { fn: streamOnline, interval: 'every 30 sec' },
];

export default crons;
