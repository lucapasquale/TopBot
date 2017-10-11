import * as Discord from 'discord.js';

import mixerStreamOnline from './handlers/mixer-stream-online';
import quitAudioChannel from './handlers/quit-audio-channel';


const crons = [
  { fn: mixerStreamOnline, interval: 'every 30 seg' },
  { fn: quitAudioChannel, interval: 'every 1 min' },
];

export default crons;
