import mixerOnline from './mixer-online';
import twitchOnline from './twitch-online';

import { Cron } from '../../types';


export default [
  { handler: mixerOnline, interval: 'every 30 seconds' },
  { handler: twitchOnline, interval: 'every 5 minutes' },
] as Cron[];
